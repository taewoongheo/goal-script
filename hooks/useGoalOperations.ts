import {differenceInCalendarDays} from 'date-fns';
import {useGoalStore} from '@/stores/goalStore';
import {
  prepareUpdateTitleGoal,
  prepareUpdateDateGoal,
  prepareDeleteGoal,
} from '@/models/goal.queries';
import {dateUtils} from '@/utils/dateUtils';

export function useGoalOperations() {
  const updateGoalData = useGoalStore(state => state.updateGoalData);
  const goalData = useGoalStore(state => state.goalData);

  const updateTitle = async (newTitle: string) => {
    if (!newTitle.trim()) return;

    // UI update
    updateGoalData(draft => {
      draft.title = newTitle;
    });

    // DB update
    try {
      if (!goalData?.id) {
        console.error('No goal ID found in goalData');
        return;
      }

      const updateQuery = await prepareUpdateTitleGoal();
      await updateQuery.executeAsync({
        $id: goalData.id,
        $title: newTitle,
      });
    } catch (e) {
      console.error('DB updateGoal error:', e);
    }
  };

  const updateDate = async (newDate: string) => {
    if (!goalData?.id) {
      console.error('No goal ID found in goalData');
      return;
    }

    updateGoalData(draft => {
      draft.dDay.date = newDate;
      draft.dDay.remainingDays = differenceInCalendarDays(
        dateUtils.parseDate(newDate),
        new Date(),
      );
    });

    try {
      const updateQuery = await prepareUpdateDateGoal();
      await updateQuery.executeAsync({
        $id: goalData.id,
        $dDay_date: newDate,
      });
    } catch (e) {
      console.error('DB updateGoalDate error:', e);
    }
  };

  const deleteGoal = async () => {
    if (!goalData?.id) {
      console.error('No goal ID found in goalData');
      return;
    }

    try {
      const deleteQuery = await prepareDeleteGoal();
      await deleteQuery.executeAsync({$id: goalData.id});
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
