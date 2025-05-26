export type TaskItem = {
  id: string;
  text: string;
  completed: boolean;
};

export type GoalData = {
  id: string;
  title: string;
  icon: string;
  dDay: {
    date: string;
    remainingDays: number;
  };
  achieved: TaskItem[];
  todos: TaskItem[];
};
