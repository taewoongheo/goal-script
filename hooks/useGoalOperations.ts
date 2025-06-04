import {differenceInCalendarDays} from 'date-fns';
import {useGoalStore} from '@/stores/goalStore';
import {
  prepareUpdateTitleGoal,
  prepareUpdateDateGoal,
  prepareDeleteGoal,
} from '@/models/goal.queries';
import {dateUtils} from '@/utils/dateUtils';

export function useGoalOperations(goalId: string) {
  const {updateGoalData} = useGoalStore();

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

  const deleteGoal = async () => {
    if (!goalId) {
      console.error('No goal ID provided');
      return;
    }

    try {
      const deleteQuery = await prepareDeleteGoal();
      await deleteQuery.executeAsync({$id: goalId});
    } catch (e) {
      console.error('DB deleteGoal error:', e);
    }
  };

  return {
    updateTitle,
    updateDate,
    deleteGoal,
  };
}
