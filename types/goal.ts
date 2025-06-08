export type TaskItem = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export type GoalData = {
  id: string;
  title: string;
  icon: string;
  createdDate: string;
  dDay: {
    date: string;
    remainingDays: number;
  };
  achieved: TaskItem[];
  todos: TaskItem[];
  isCompleted: boolean;
};
