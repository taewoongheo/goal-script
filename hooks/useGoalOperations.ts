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
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';

export function useGoalOperations(goalId: string) {
  const {updateGoalData, deleteGoalData, addGoalData} = useGoalStore();

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

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: '수정 완료',
        textBody: '목표 제목이 변경되었어요',
      });
    } catch (e) {
      console.error('DB updateGoal error:', e);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '목표 수정 실패',
        textBody: '다시 시도해주세요',
      });
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

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: '수정 완료',
        textBody: '목표 날짜가 변경되었어요',
      });
    } catch (e) {
      console.error('DB updateGoalDate error:', e);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '날짜 수정 실패',
        textBody: '다시 시도해주세요',
      });
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

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: '목표 완료!',
        textBody: '축하합니다! 목표를 달성했어요',
      });
    } catch (e) {
      console.error('DB completeGoal error:', e);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '목표 완료 실패',
        textBody: '다시 시도해주세요',
      });
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

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: '삭제 완료',
        textBody: '목표를 성공적으로 삭제했어요',
      });
    } catch (e) {
      console.error('DB deleteGoal error:', e);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '목표 삭제 실패',
        textBody: '다시 시도해주세요',
      });
    }
  };

  const addGoal = async (goal: GoalData) => {
    addGoalData(goal);

    try {
      const addQuery = await prepareInsertGoal();
      await addQuery.executeAsync({
        $id: goal.id,
        $title: goal.title,
        $icon: goal.icon,
        $created_date: goal.createdDate,
        $dDay_date: goal.dDay.date,
        $isCompleted: goal.isCompleted,
      });
    } catch (e) {
      console.error('DB addGoal error:', e);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '목표 저장 실패',
        textBody: '다시 시도해주세요',
      });
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
