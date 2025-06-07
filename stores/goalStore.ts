import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {GoalData} from '@/types/goal';
import {prepareSelectAllGoals} from '@/models/goal.queries';
import {prepareSelectTaskItemsByGoal} from '@/models/taskitem.queries';
import {dateUtils} from '@/utils/dateUtils';
import {differenceInCalendarDays} from 'date-fns';
import {intToBool} from '@/models/goal';

async function loadAllGoalIdsFromDB(): Promise<string[]> {
  const selectGoalsStmt = await prepareSelectAllGoals();
  const goalsResult = await selectGoalsStmt.executeAsync();
  const goals = (await goalsResult.getAllAsync()) as any[];
  await selectGoalsStmt.finalizeAsync();
  return goals.map((goal: any) => goal.id);
}

async function fetchGoalDataById(goalId: string): Promise<GoalData | null> {
  // goal 정보 쿼리
  const selectGoalsStmt = await prepareSelectAllGoals();
  const goalsResult = await selectGoalsStmt.executeAsync();
  const goals = (await goalsResult.getAllAsync()) as any[];
  await selectGoalsStmt.finalizeAsync();
  const goal = goals.find((g: any) => g.id === goalId);
  if (!goal) return null;

  const selectTasksStmt = await prepareSelectTaskItemsByGoal();
  try {
    const tasksResult = await selectTasksStmt.executeAsync({$goal_id: goalId});
    const tasks = (await tasksResult.getAllAsync()) as any[];
    const achieved = tasks
      .filter((t: any) => intToBool(t.isCompleted))
      .map((t: any) => ({id: t.id, text: t.text, isCompleted: true}));
    const todos = tasks
      .filter((t: any) => !intToBool(t.isCompleted))
      .map((t: any) => ({id: t.id, text: t.text, isCompleted: false}));
    const today = new Date();
    const dDayDate = dateUtils.parseDate(goal.dDay_date);
    const remainingDays = differenceInCalendarDays(dDayDate, today);
    return {
      id: goal.id,
      title: goal.title,
      icon: goal.icon,
      dDay: {
        date: goal.dDay_date,
        remainingDays,
      },
      achieved,
      todos,
      isCompleted: intToBool(goal.isCompleted),
    };
  } finally {
    await selectTasksStmt.finalizeAsync();
  }
}

export async function initializeGoals() {
  const {initializeGoalDatas} = useGoalStore.getState();

  const goalIds = await loadAllGoalIdsFromDB();
  const goalDataArr = await Promise.all(
    goalIds.map(id => fetchGoalDataById(id)),
  );
  const validGoalData = goalDataArr.filter(
    (goal): goal is GoalData => goal !== null,
  );

  initializeGoalDatas(
    validGoalData,
    validGoalData.length > 0 ? validGoalData[0].id : null,
  );
}

type GoalStore = {
  goalData: GoalData[];
  selectedGoalId: string | null;
  initializeGoalDatas: (
    goalData: GoalData[],
    selectedGoalId: string | null,
  ) => Promise<void>;
  updateGoalData: (updater: (goalData: GoalData) => void) => void;
  setSelectedGoalId: (goalId: string | null) => void;
  deleteGoalData: (goalId: string) => void;
  addGoalData: (goal: GoalData) => void;
};

export const useGoalStore = create<GoalStore>()(
  immer(set => ({
    goalData: [],
    selectedGoalId: null,

    initializeGoalDatas: async (
      goalData: GoalData[],
      selectedGoalId: string | null,
    ) => {
      set({goalData, selectedGoalId});
    },

    addGoalData: (goal: GoalData) =>
      set(state => {
        state.goalData.push(goal);
      }),

    setSelectedGoalId: (goalId: string | null) => set({selectedGoalId: goalId}),

    updateGoalData: updater =>
      set(state => {
        const goalIndex = state.goalData.findIndex(
          g => g.id === state.selectedGoalId,
        );
        if (goalIndex !== -1) {
          updater(state.goalData[goalIndex]);
        }
      }),

    deleteGoalData: (goalId: string) =>
      set(state => {
        state.goalData = state.goalData.filter(g => g.id !== goalId);
      }),
  })),
);
