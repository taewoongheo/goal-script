import {useState} from 'react';
import {marathonPreparation, GoalData} from '@/constants/SampleData';

export function useGoalData() {
  const [goalData, setGoalData] = useState<GoalData>(marathonPreparation);

  const updateAchievedItem = (index: number, completed: boolean) => {
    setGoalData(prev => {
      const newAchieved = [...prev.achieved];
      newAchieved[index] = {...newAchieved[index], completed};
      return {...prev, achieved: newAchieved};
    });
  };

  const updateTodoItem = (index: number, completed: boolean) => {
    setGoalData(prev => {
      const newTodos = [...prev.todos];
      newTodos[index] = {...newTodos[index], completed};
      return {...prev, todos: newTodos};
    });
  };

  const addAchievedItem = (text: string) => {
    setGoalData(prev => {
      const newAchieved = [...prev.achieved, {text, completed: true}];
      return {...prev, achieved: newAchieved};
    });
  };

  const addTodoItem = (text: string) => {
    setGoalData(prev => {
      const newTodos = [...prev.todos, {text, completed: false}];
      return {...prev, todos: newTodos};
    });
  };

  const removeAchievedItem = (index: number) => {
    setGoalData(prev => {
      const newAchieved = prev.achieved.filter((_, i) => i !== index);
      return {...prev, achieved: newAchieved};
    });
  };

  const removeTodoItem = (index: number) => {
    setGoalData(prev => {
      const newTodos = prev.todos.filter((_, i) => i !== index);
      return {...prev, todos: newTodos};
    });
  };

  return {
    goalData,
    title: goalData.title,
    dDay: goalData.dDay.remainingDays,
    rDay: goalData.dDay.date,
    achieved: goalData.achieved,
    todos: goalData.todos,
    updateAchievedItem,
    updateTodoItem,
    addAchievedItem,
    addTodoItem,
    removeAchievedItem,
    removeTodoItem,
  };
}
