import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {
  marathonPreparation,
  GoalData,
  websiteProject,
  academicPaper,
} from '@/constants/SampleData';

type GoalStore = {
  goalData: GoalData;
  setGoalData: (goalData: GoalData) => void;
  updateGoalData: (updater: (goalData: GoalData) => void) => void;
};

export const useGoalStore = create<GoalStore>()(
  immer(set => ({
    goalData: marathonPreparation,

    setGoalData: goalData => set({goalData}),

    updateGoalData: updater =>
      set(state => {
        updater(state.goalData);
      }),
  })),
);
