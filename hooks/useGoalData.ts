import {useRef} from 'react';
import {differenceInCalendarDays} from 'date-fns';
import {useGoalStore} from '@/stores/goalStore';
import {generateUUID} from '@/utils/uuid';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {
  prepareDeleteTaskItem,
  prepareInsertTaskItem,
  prepareUpdateTaskCompletion,
  prepareUpdateTaskItem,
} from '@/models/taskitem.queries';
import {
  prepareUpdateTitleGoal,
  prepareUpdateDateGoal,
} from '@/models/goal.queries';
import {dateUtils} from '@/utils/dateUtils';

export type TaskItem = {
  id: string;
  text: string;
  completed: boolean;
};

type PendingMoveTask = {
  id: string;
  timeoutId: ReturnType<typeof setTimeout>;
  sourceList: 'achieved' | 'todos';
};

type TaskSource = 'achieved' | 'todos';

export function useGoalData() {
  const updateGoalData = useGoalStore(state => state.updateGoalData);
  const goalData = useGoalStore(state => state.goalData);

  const pendingMoves = useRef<Record<string, PendingMoveTask>>({});

  const clearPendingMove = (taskId: string) => {
    if (pendingMoves.current[taskId]) {
      clearTimeout(pendingMoves.current[taskId].timeoutId);
      delete pendingMoves.current[taskId];
    }
  };

  const handlePendingMove = (taskId: string, source: TaskSource): boolean => {
    if (!pendingMoves.current[taskId]) return false;

    clearTimeout(pendingMoves.current[taskId].timeoutId);

    if (pendingMoves.current[taskId].sourceList === source) {
      updateGoalData(draft => {
        const taskIndex = draft[source].findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          const originalCompleted = source === 'achieved';
          draft[source][taskIndex].completed = originalCompleted;
        }
      });

      delete pendingMoves.current[taskId];
      return true;
    }

    delete pendingMoves.current[taskId];
    return false;
  };

  const updateTaskCompletion = (taskId: string, source: TaskSource) => {
    updateGoalData(draft => {
      const taskIndex = draft[source].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const newCompleted = source === 'todos';
        draft[source][taskIndex].completed = newCompleted;
      }
    });
  };

  const scheduleTaskMove = (taskId: string, source: TaskSource) => {
    const timeoutId = setTimeout(async () => {
      delete pendingMoves.current[taskId];

      updateGoalData(draft => {
        const sourceList = draft[source];
        const taskIndex = sourceList.findIndex(task => task.id === taskId);

        if (taskIndex === -1) return;

        const taskToMove = {...sourceList[taskIndex]};
        const targetListName = source === 'achieved' ? 'todos' : 'achieved';

        const updatedSourceList = sourceList.filter((_, i) => i !== taskIndex);
        draft[source] = updatedSourceList;

        draft[targetListName] = [...draft[targetListName], taskToMove];
      });

      try {
        const updateQuery = await prepareUpdateTaskCompletion();
        await updateQuery.executeAsync({
          $id: taskId,
          $completed: source !== 'todos' ? 1 : 0,
        });
      } catch (e) {
        console.error('DB updateTaskCompletion error:', e);
      }
    }, ANIMATION_DURATION.TASK_STATUS.TASK_MOVE_DELAY);

    pendingMoves.current[taskId] = {
      id: taskId,
      timeoutId,
      sourceList: source,
    };
  };

  const toggleTaskCompletion = (taskId: string, source: TaskSource) => {
    if (handlePendingMove(taskId, source)) return;
    updateTaskCompletion(taskId, source);
    scheduleTaskMove(taskId, source);
  };

  const toggleAchievedTask = (taskId: string) => {
    toggleTaskCompletion(taskId, 'achieved');
  };

  const toggleTodoTask = (taskId: string) => {
    toggleTaskCompletion(taskId, 'todos');
  };

  // Generalized add task function
  const addTask = async (text: string, source: TaskSource) => {
    const completed = source === 'achieved';
    const newTask: TaskItem = {
      id: generateUUID(),
      text,
      completed,
    };

    // UI update
    updateGoalData(draft => {
      draft[source] = [...draft[source], newTask];
    });

    // DB update
    try {
      if (!goalData?.id) {
        console.error('No goal ID found in goalData');
        return;
      }

      const insertQuery = await prepareInsertTaskItem();
      await insertQuery.executeAsync({
        $id: newTask.id,
        $goal_id: goalData.id,
        $text: newTask.text,
        $completed: newTask.completed ? 1 : 0,
      });
    } catch (e) {
      console.error('DB insertTaskToDB error:', e);
    }
  };

  const addTodoTask = (text: string) => addTask(text, 'todos');
  const addAchievedTask = (text: string) => addTask(text, 'achieved');

  // Generalized remove task function
  const removeTask = async (taskId: string, source: TaskSource) => {
    console.log('removeTask called with taskId:', taskId, 'source:', source);
    clearPendingMove(taskId);

    // UI update
    updateGoalData(draft => {
      draft[source] = draft[source].filter(task => task.id !== taskId);
    });

    // DB update
    try {
      const deleteQuery = await prepareDeleteTaskItem();
      await deleteQuery.executeAsync({$id: taskId});
      console.log('DB deleteTaskFromDB success:', taskId);
    } catch (e) {
      console.error('DB deleteTaskFromDB error:', e);
    }
  };

  const removeAchievedTask = (taskId: string) => removeTask(taskId, 'achieved');
  const removeTodoTask = (taskId: string) => removeTask(taskId, 'todos');

  // Generalized edit task function
  const editTaskText = async (
    taskId: string,
    newText: string,
    source: TaskSource,
  ) => {
    if (!newText.trim()) return;

    // UI update
    updateGoalData(draft => {
      const taskIndex = draft[source].findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const updatedTasks = [...draft[source]];
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          text: newText,
        };
        draft[source] = updatedTasks;
      }
    });

    // DB update
    try {
      const updateQuery = await prepareUpdateTaskItem();
      await updateQuery.executeAsync({$id: taskId, $text: newText});
    } catch (e) {
      console.error('DB updateTaskTextInDB error:', e);
    }
  };

  const editAchievedTask = (taskId: string, newText: string) =>
    editTaskText(taskId, newText, 'achieved');
  const editTodoTask = (taskId: string, newText: string) =>
    editTaskText(taskId, newText, 'todos');

  // Goal management functions
  const updateGoalTitle = async (newTitle: string) => {
    if (!newTitle.trim()) return;

    // UI update
    updateGoalData(draft => {
      draft.title = newTitle;
    });

    // DB update
    try {
      if (!goalData?.id) {
        console.error('No goal ID found in goalData');
        return;
      }

      const updateQuery = await prepareUpdateTitleGoal();
      await updateQuery.executeAsync({
        $id: goalData.id,
        $title: newTitle,
      });
    } catch (e) {
      console.error('DB updateGoal error:', e);
    }
  };

  const updateGoalDate = async (newDate: string) => {
    if (!goalData?.id) {
      console.error('No goal ID found in goalData');
      return;
    }

    updateGoalData(draft => {
      draft.dDay.date = newDate;
      draft.dDay.remainingDays = differenceInCalendarDays(
        dateUtils.parseDate(newDate),
        new Date(),
      );
    });

    try {
      const updateQuery = await prepareUpdateDateGoal();
      await updateQuery.executeAsync({
        $id: goalData.id,
        $dDay_date: newDate,
      });
    } catch (e) {
      console.error('DB updateGoalDate error:', e);
    }
  };

  return {
    actions: {
      todo: {
        toggle: toggleTodoTask,
        add: addTodoTask,
        remove: removeTodoTask,
        edit: editTodoTask,
      },
      achieved: {
        toggle: toggleAchievedTask,
        add: addAchievedTask,
        remove: removeAchievedTask,
        edit: editAchievedTask,
      },
      goal: {
        updateTitle: updateGoalTitle,
        updateDate: updateGoalDate,
      },
    },
  };
}
