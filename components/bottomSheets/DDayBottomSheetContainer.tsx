import React, {useCallback, useMemo} from 'react';
import {Keyboard} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {DDayBottomSheet} from '@/components/mainScreen/dday/DDayBottomSheet';
import {useGoalData} from '@/hooks/useGoalData';
import {useGoalStore} from '@/stores/goalStore';
import {commonBottomSheetProps, commonStyles} from './bottomSheetCommon';

interface DDayBottomSheetContainerProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export function DDayBottomSheetContainer({
  bottomSheetRef,
}: DDayBottomSheetContainerProps) {
  const snapPoints = useMemo(() => ['65%'], []);
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

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      Keyboard.dismiss();
    }
  }, []);

  if (!goalData) return null;

  const dDay = goalData.dDay.remainingDays;
  const rDay = goalData.dDay.date;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      style={commonStyles.bottomSheet}
      onChange={handleSheetChanges}
      {...commonBottomSheetProps}>
      <BottomSheetView style={commonStyles.contentContainer}>
        <DDayBottomSheet
          initialDate={rDay}
          dDay={dDay}
          onSaveDate={actions.goal.updateDate}
          onCancel={() => bottomSheetRef.current?.close()}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
