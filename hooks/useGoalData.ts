import {useState} from 'react';
import {marathonPreparation, GoalData} from '@/constants/SampleData';
import {generateUUID} from '@/utils/uuid';

export type TaskItem = {
  id: string;
  text: string;
  completed: boolean;
};

export function useGoalData() {
  const [goalData, setGoalData] = useState<GoalData>(marathonPreparation);

  const toggleTaskStatus = (taskId: string) => {
    setGoalData(prev => {
      const newTasks = prev.tasks.map(task =>
        task.id === taskId ? {...task, completed: !task.completed} : task,
      );
      return {...prev, tasks: newTasks};
    });
  };

  const addTask = (text: string, completed: boolean = false) => {
    const newTask: TaskItem = {
      id: generateUUID(),
      text,
      completed,
    };

    setGoalData(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
  };

  const removeTask = (taskId: string) => {
    setGoalData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId),
    }));
  };

  const achievedTasks = goalData.tasks.filter(task => task.completed);
  const todoTasks = goalData.tasks.filter(task => !task.completed);

  return {
    goalData,
    title: goalData.title,
    dDay: goalData.dDay.remainingDays,
    rDay: goalData.dDay.date,
    achieved: achievedTasks,
    todos: todoTasks,
    toggleTaskStatus,
    addTask,
    removeTask,
  };
}
