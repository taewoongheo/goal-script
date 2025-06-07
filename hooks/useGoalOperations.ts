import {differenceInCalendarDays} from 'date-fns';
import {useGoalStore} from '@/stores/goalStore';
import {
  prepareUpdateTitleGoal,
  prepareUpdateDateGoal,
  prepareDeleteGoal,
  prepareCompleteGoal,
  prepareInsertGoal,
} from '@/models/goal.queries';
import {dateUtils} from '@/utils/dateUtils';
import {GoalData} from '@/types/goal';

export function useGoalOperations(goalId: string) {
  const {updateGoalData, deleteGoalData} = useGoalStore();

  const updateTitle = async (newTitle: string) => {
    if (!newTitle.trim()) return;

    // UI update
    updateGoalData(draft => {
      if (draft.id !== goalId) return;
      draft.title = newTitle;
    });

    // DB update
    try {
      if (!goalId) {
        console.error('No goal ID provided');
        return;
      }

      const updateQuery = await prepareUpdateTitleGoal();
      await updateQuery.executeAsync({
        $id: goalId,
        $title: newTitle,
      });
    } catch (e) {
      console.error('DB updateGoal error:', e);
    }
  };

  const updateDate = async (newDate: string) => {
    if (!goalId) {
      console.error('No goal ID provided');
      return;
    }

    updateGoalData(draft => {
      if (draft.id !== goalId) return;
      draft.dDay.date = newDate;
      draft.dDay.remainingDays = differenceInCalendarDays(
        dateUtils.parseDate(newDate),
        new Date(),
      );
    });

    try {
      const updateQuery = await prepareUpdateDateGoal();
      await updateQuery.executeAsync({
        $id: goalId,
        $dDay_date: newDate,
      });
    } catch (e) {
      console.error('DB updateGoalDate error:', e);
    }
  };

  const completeGoal = async () => {
    if (!goalId) {
      console.error('No goal ID provided');
      return;
    }

    // UI update
    updateGoalData(draft => {
      if (draft.id !== goalId) return;
      draft.isCompleted = true;
    });

    // DB update
    try {
      const completeQuery = await prepareCompleteGoal();
      await completeQuery.executeAsync({$id: goalId});
    } catch (e) {
      console.error('DB completeGoal error:', e);
    }
  };

  const deleteGoal = async () => {
    if (!goalId) {
      console.error('No goal ID provided');
      return;
    }

    deleteGoalData(goalId);

    try {
      const deleteQuery = await prepareDeleteGoal();
      await deleteQuery.executeAsync({$id: goalId});
    } catch (e) {
      console.error('DB deleteGoal error:', e);
    }
  };

  const addGoal = async (goal: GoalData) => {
    try {
      const addQuery = await prepareInsertGoal();
      await addQuery.executeAsync({
        $id: goal.id,
        $title: goal.title,
        $icon: goal.icon,
        $dDay_date: goal.dDay.date,
        $isCompleted: goal.isCompleted,
      });
    } catch (e) {
      console.error('DB addGoal error:', e);
    }
  };

  return {
    updateTitle,
    updateDate,
    completeGoal,
    deleteGoal,
    addGoal,
  };
}
