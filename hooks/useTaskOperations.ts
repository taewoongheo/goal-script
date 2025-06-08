import {useRef} from 'react';
import {useGoalStore} from '@/stores/goalStore';
import {generateUUID} from '@/utils/uuid';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {
  prepareDeleteTaskItem,
  prepareInsertTaskItem,
  prepareUpdateTaskCompletion,
  prepareUpdateTaskItem,
} from '@/models/taskitem.queries';
import {TaskItem} from '@/types/goal';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

type PendingMoveTask = {
  id: string;
  timeoutId: ReturnType<typeof setTimeout>;
  sourceList: 'achieved' | 'todos';
};

export type TaskSource = 'achieved' | 'todos';

export function useTaskOperations(goalId: string) {
  const updateGoalData = useGoalStore(state => state.updateGoalData);
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
          const originalIsCompleted = source === 'achieved';
          draft[source][taskIndex].isCompleted = originalIsCompleted;
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
        const newIsCompleted = source === 'todos';
        draft[source][taskIndex].isCompleted = newIsCompleted;
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
          $isCompleted: source !== 'todos' ? 0 : 1,
        });
      } catch (e) {
        console.error('DB updateTaskCompletion error:', e);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: '태스크 상태 변경 실패',
          textBody: '다시 시도해주세요',
        });
      }
    }, ANIMATION_DURATION.TASK_STATUS.TASK_MOVE_DELAY);

    pendingMoves.current[taskId] = {
      id: taskId,
      timeoutId,
      sourceList: source,
    };
  };

  const toggleTask = (taskId: string, source: TaskSource) => {
    if (handlePendingMove(taskId, source)) return;
    updateTaskCompletion(taskId, source);
    scheduleTaskMove(taskId, source);
  };

  const addTask = async (text: string, source: TaskSource) => {
    const {goalData, selectedGoalId} = useGoalStore.getState();
    const currentGoal = goalData.find(g => g.id === selectedGoalId);
    if (currentGoal) {
      const totalTasks = currentGoal.achieved.length + currentGoal.todos.length;
      if (totalTasks >= 50) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: '태스크 개수 제한',
          textBody: '목표당 최대 50개까지 태스크를 만들 수 있어요',
        });
        return;
      }
    }

    const isCompleted = source === 'achieved';
    const newTask: TaskItem = {
      id: generateUUID(),
      text,
      isCompleted,
    };

    // UI update
    updateGoalData(draft => {
      draft[source] = [...draft[source], newTask];
    });

    // DB update
    try {
      if (!goalId) {
        console.error('No goal ID provided');
        return;
      }

      const insertQuery = await prepareInsertTaskItem();
      await insertQuery.executeAsync({
        $id: newTask.id,
        $goal_id: goalId,
        $text: newTask.text,
        $isCompleted: newTask.isCompleted ? 1 : 0,
      });
    } catch (e) {
      console.error('DB insertTaskToDB error:', e);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '태스크 저장 실패',
        textBody: '다시 시도해주세요',
      });
    }
  };

  const removeTask = async (taskId: string, source: TaskSource) => {
    clearPendingMove(taskId);

    // UI update
    updateGoalData(draft => {
      draft[source] = draft[source].filter(task => task.id !== taskId);
    });

    // DB update
    try {
      const deleteQuery = await prepareDeleteTaskItem();
      await deleteQuery.executeAsync({$id: taskId});
    } catch (e) {
      console.error('DB deleteTaskFromDB error:', e);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '태스크 삭제 실패',
        textBody: '다시 시도해주세요',
      });
    }
  };

  const editTask = async (
    taskId: string,
    newText: string,
    source: TaskSource,
  ) => {
    if (!newText.trim()) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '태스크를 입력해주세요',
        textBody: '한 글자 이상 입력해주세요',
      });
      return;
    }

    if (newText.length > 50) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '글자 수 제한',
        textBody: '50자 이하로 입력해주세요',
      });
      return;
    }

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
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '태스크 수정 실패',
        textBody: '다시 시도해주세요',
      });
    }
  };

  return {
    addTask,
    removeTask,
    editTask,
    toggleTask,
  };
}
