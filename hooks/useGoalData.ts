import {useTaskOperations} from './useTaskOperations';
import {useGoalOperations} from './useGoalOperations';

export {TaskItem} from '@/types/goal';

export function useGoalData(goalId: string) {
  const taskOps = useTaskOperations();
  const goalOps = useGoalOperations();

  return {
    actions: {
      todo: {
        toggle: (taskId: string) => taskOps.toggleTask(taskId, 'todos', goalId),
        add: (text: string) => taskOps.addTask(text, 'todos', goalId),
        remove: (taskId: string) => taskOps.removeTask(taskId, 'todos'),
        edit: (taskId: string, newText: string) =>
          taskOps.editTask(taskId, newText, 'todos'),
      },
      achieved: {
        toggle: (taskId: string) =>
          taskOps.toggleTask(taskId, 'achieved', goalId),
        add: (text: string) => taskOps.addTask(text, 'achieved', goalId),
        remove: (taskId: string) => taskOps.removeTask(taskId, 'achieved'),
        edit: (taskId: string, newText: string) =>
          taskOps.editTask(taskId, newText, 'achieved'),
      },
      goal: goalOps,
    },
  };
}
