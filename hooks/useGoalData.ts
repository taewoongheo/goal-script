import {useTaskOperations} from './useTaskOperations';
import {useGoalOperations} from './useGoalOperations';

export {TaskItem} from '@/types/goal';

export function useGoalData() {
  const taskOps = useTaskOperations();
  const goalOps = useGoalOperations();

  return {
    actions: {
      todo: {
        toggle: (taskId: string) => taskOps.toggleTask(taskId, 'todos'),
        add: (text: string) => taskOps.addTask(text, 'todos'),
        remove: (taskId: string) => taskOps.removeTask(taskId, 'todos'),
        edit: (taskId: string, newText: string) =>
          taskOps.editTask(taskId, newText, 'todos'),
      },
      achieved: {
        toggle: (taskId: string) => taskOps.toggleTask(taskId, 'achieved'),
        add: (text: string) => taskOps.addTask(text, 'achieved'),
        remove: (taskId: string) => taskOps.removeTask(taskId, 'achieved'),
        edit: (taskId: string, newText: string) =>
          taskOps.editTask(taskId, newText, 'achieved'),
      },
      goal: {
        updateTitle: (newTitle: string) => goalOps.updateTitle(newTitle),
        updateDate: (newDate: string) => goalOps.updateDate(newDate),
        deleteGoal: () => goalOps.deleteGoal(),
        insertGoal: (newGoal: {
          id: string;
          title: string;
          icon: string;
          dDay_date: string;
        }) => goalOps.insertGoal(newGoal),
        getAllGoals: () => goalOps.getAllGoals(),
      },
    },
  };
}
