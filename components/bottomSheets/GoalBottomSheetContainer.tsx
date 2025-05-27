import React, {useCallback, useMemo, useState} from 'react';
import {Keyboard} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {GoalBottomSheet} from '@/components/mainScreen/goal/GoalBottomSheet';
import {useGoalData} from '@/hooks/useGoalData';
import {useGoalStore} from '@/stores/goalStore';
import {commonBottomSheetProps, commonStyles} from './bottomSheetCommon';

interface GoalBottomSheetContainerProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export function GoalBottomSheetContainer({
  bottomSheetRef,
}: GoalBottomSheetContainerProps) {
  const snapPoints = useMemo(() => ['50%'], []);
  const [goalSheetKey, setGoalSheetKey] = useState(0);
  const {actions} = useGoalData();
  const goalData = useGoalStore(state => state.goalData);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleGoalSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      Keyboard.dismiss();
      // BottomSheet가 닫힐 때 GoalBottomSheet 컴포넌트를 리렌더링하기 위해 key 변경
      setGoalSheetKey(prev => prev + 1);
    }
  }, []);

  if (!goalData) return null;

  const {title, icon, achieved} = goalData;
  const dDay = goalData.dDay.remainingDays;
  const rDay = goalData.dDay.date;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      style={commonStyles.bottomSheet}
      onChange={handleGoalSheetChanges}
      {...commonBottomSheetProps}>
      <BottomSheetView style={commonStyles.contentContainer}>
        <GoalBottomSheet
          key={goalSheetKey}
          icon={icon}
          title={title}
          achieved={achieved}
          dDay={dDay}
          rDay={rDay}
          onTitleChange={actions.goal.updateTitle}
          onDeleteGoal={actions.goal.deleteGoal}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
