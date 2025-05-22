import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {
  marathonPreparation,
  GoalData,
  websiteProject,
  academicPaper,
} from '@/constants/SampleData';
import {prepareSelectAllGoals} from '@/models/goal.queries';
import {prepareSelectTaskItemsByGoal} from '@/models/taskitem.queries';

async function loadGoalDataFromDB(): Promise<GoalData | null> {
  const selectGoalsStmt = await prepareSelectAllGoals();

  try {
    const goalsResult = await selectGoalsStmt.executeAsync();
    const goals = (await goalsResult.getAllAsync()) as any[];
    if (!goals.length) return null;
    const goal = goals[0] as any; // 현재는 단일 목표만 지원한다고 가정

    const selectTasksStmt = await prepareSelectTaskItemsByGoal();
    try {
      const tasksResult = await selectTasksStmt.executeAsync({
        goal_id: goal.id,
      });
      const tasks = (await tasksResult.getAllAsync()) as any[];

      const achieved = tasks
        .filter((t: any) => t.type === 'achieved')
        .map((t: any) => ({id: t.id, text: t.text, completed: !!t.completed}));
      const todos = tasks
        .filter((t: any) => t.type === 'todo')
        .map((t: any) => ({id: t.id, text: t.text, completed: !!t.completed}));

      return {
        title: goal.title,
        icon: goal.icon,
        dDay: {
          date: goal.dDay_date,
          remainingDays: goal.dDay_remainingDays,
        },
        achieved,
        todos,
      };
    } finally {
      await selectTasksStmt.finalizeAsync();
    }
  } finally {
    await selectGoalsStmt.finalizeAsync();
  }
}

type GoalStore = {
  goalData: GoalData;
  setGoalData: (goalData: GoalData) => void;
  updateGoalData: (updater: (goalData: GoalData) => void) => void;
  loadGoalDataFromDB: () => Promise<void>;
};

export const useGoalStore = create<GoalStore>()(
  immer(set => ({
    goalData: marathonPreparation,

    setGoalData: goalData => set({goalData}),

    updateGoalData: updater =>
      set(state => {
        updater(state.goalData);
      }),

    loadGoalDataFromDB: async () => {
      const data = await loadGoalDataFromDB();
      if (data) set({goalData: data});
    },
  })),
);
