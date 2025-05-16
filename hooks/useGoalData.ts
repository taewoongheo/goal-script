import {useState, useRef} from 'react';
import {
  marathonPreparation,
  GoalData,
  websiteProject,
  academicPaper,
} from '@/constants/SampleData';
import {generateUUID} from '@/utils/uuid';
import {ANIMATION_DURATION} from '@/constants/Animation';

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

export function useGoalData() {
  const [goalData, setGoalData] = useState<GoalData>(websiteProject);

  const pendingMoves = useRef<Record<string, PendingMoveTask>>({});

  const toggleTaskCompletion = (
    taskId: string,
    source: 'achieved' | 'todos',
  ) => {
    // 이미 지연 처리 중인 작업이 있으면 취소
    if (pendingMoves.current[taskId]) {
      clearTimeout(pendingMoves.current[taskId].timeoutId);

      if (pendingMoves.current[taskId].sourceList === source) {
        setGoalData(prev => {
          const sourceList = [...prev[source]];
          const taskIndex = sourceList.findIndex(task => task.id === taskId);

          if (taskIndex === -1) return prev;

          const originalCompleted = source === 'achieved';
          const updatedTask = {
            ...sourceList[taskIndex],
            completed: originalCompleted,
          };
          sourceList[taskIndex] = updatedTask;

          return {
            ...prev,
            [source]: sourceList,
          };
        });

        delete pendingMoves.current[taskId];
        return;
      }

      delete pendingMoves.current[taskId];
    }

    // 즉시 UI 업데이트 (completed 상태만 변경)
    setGoalData(prev => {
      const sourceList = [...prev[source]];
      const taskIndex = sourceList.findIndex(task => task.id === taskId);

      if (taskIndex === -1) return prev;

      const newCompleted = source === 'todos';
      const updatedTask = {...sourceList[taskIndex], completed: newCompleted};
      const updatedSourceList = [...sourceList];
      updatedSourceList[taskIndex] = updatedTask;

      return {
        ...prev,
        [source]: updatedSourceList,
      };
    });

    // 지연된 이동 처리 설정
    const timeoutId = setTimeout(() => {
      delete pendingMoves.current[taskId];

      setGoalData(prev => {
        const sourceList = [...prev[source]];
        const taskIndex = sourceList.findIndex(task => task.id === taskId);

        if (taskIndex === -1) return prev;

        const taskToMove = sourceList[taskIndex];

        const targetListName = source === 'achieved' ? 'todos' : 'achieved';

        const updatedSourceList = sourceList.filter((_, i) => i !== taskIndex);
        const updatedTargetList = [...prev[targetListName], taskToMove];

        return {
          ...prev,
          [source]: updatedSourceList,
          [targetListName]: updatedTargetList,
        };
      });
    }, ANIMATION_DURATION.TASK_STATUS.TASK_MOVE_DELAY);

    // 보류 중인 작업 추적
    pendingMoves.current[taskId] = {
      id: taskId,
      timeoutId,
      sourceList: source,
    };
  };

  const toggleAchievedTask = (taskId: string) => {
    toggleTaskCompletion(taskId, 'achieved');
  };

  const toggleTodoTask = (taskId: string) => {
    toggleTaskCompletion(taskId, 'todos');
  };

  const addTodoTask = (text: string) => {
    const newTask: TaskItem = {
      id: generateUUID(),
      text,
      completed: false,
    };

    setGoalData(prev => ({
      ...prev,
      todos: [...prev.todos, newTask],
    }));
  };

  const addAchievedTask = (text: string) => {
    const newTask: TaskItem = {
      id: generateUUID(),
      text,
      completed: true,
    };

    setGoalData(prev => ({
      ...prev,
      achieved: [...prev.achieved, newTask],
    }));
  };

  const removeTask = (taskId: string, source: 'achieved' | 'todos') => {
    if (pendingMoves.current[taskId]) {
      clearTimeout(pendingMoves.current[taskId].timeoutId);
      delete pendingMoves.current[taskId];
    }

    setGoalData(prev => ({
      ...prev,
      [source]: prev[source].filter(task => task.id !== taskId),
    }));
  };

  const removeAchievedTask = (taskId: string) => {
    removeTask(taskId, 'achieved');
  };

  const removeTodoTask = (taskId: string) => {
    removeTask(taskId, 'todos');
  };

  const editTaskText = (
    taskId: string,
    newText: string,
    source: 'achieved' | 'todos',
  ) => {
    if (!newText.trim()) return; // 빈 텍스트는 무시

    setGoalData(prev => {
      const sourceList = [...prev[source]];
      const taskIndex = sourceList.findIndex(task => task.id === taskId);

      if (taskIndex === -1) return prev;

      const updatedTask = {...sourceList[taskIndex], text: newText};
      sourceList[taskIndex] = updatedTask;

      return {
        ...prev,
        [source]: sourceList,
      };
    });
  };

  const editAchievedTask = (taskId: string, newText: string) => {
    editTaskText(taskId, newText, 'achieved');
  };

  const editTodoTask = (taskId: string, newText: string) => {
    editTaskText(taskId, newText, 'todos');
  };

  return {
    title: goalData.title,
    icon: goalData.icon,
    dDay: goalData.dDay.remainingDays,
    rDay: goalData.dDay.date,
    achieved: goalData.achieved,
    todos: goalData.todos,
    toggleAchievedTask,
    toggleTodoTask,
    addTodoTask,
    addAchievedTask,
    removeAchievedTask,
    removeTodoTask,
    editAchievedTask,
    editTodoTask,
  };
}
