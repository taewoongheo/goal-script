import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Keyboard, Platform} from 'react-native';
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

// TODO:
//  - 변경된 텍스트가 두 줄 이상 넘어가면 바텀시트 크기 변경시켜야됨

export function GoalBottomSheetContainer({
  bottomSheetRef,
}: GoalBottomSheetContainerProps) {
  const [editModeHeight, setEditModeHeight] = useState(1);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const snapPoints = useMemo(() => {
    const baseSnapPoints = [editModeHeight];

    if (Platform.OS === 'ios' && keyboardHeight > 0) {
      baseSnapPoints.push(editModeHeight + keyboardHeight);
    }

    return baseSnapPoints;
  }, [editModeHeight, keyboardHeight]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      event => {
        const {height} = event.endCoordinates;
        setKeyboardHeight(height);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

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
      setKeyboardHeight(0);
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
      {...commonBottomSheetProps}
      keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'interactive'}
      keyboardBlurBehavior="none"
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}>
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
          bottomSheetRef={bottomSheetRef}
          setEditModeHeight={setEditModeHeight}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
