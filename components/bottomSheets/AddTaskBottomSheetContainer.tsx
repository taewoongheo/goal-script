import React, {useCallback} from 'react';
import {Keyboard} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useGoalStore} from '@/stores/goalStore';
import {AddTaskBottomSheet} from '@/components/mainScreen/task/AddTaskBottomSheet';
import {useGoalData} from '@/hooks/useGoalData';
import {commonBottomSheetProps, commonStyles} from './bottomSheetCommon';

interface AddTaskBottomSheetContainerProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export function AddTaskBottomSheetContainer({
  bottomSheetRef,
}: AddTaskBottomSheetContainerProps) {
  // const addTaskSnapPoints = useMemo(() => ['30%'], []);
  const selectedGoalId = useGoalStore(state => state.selectedGoalId);
  const {actions} = useGoalData(selectedGoalId ?? '');

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

  const handleAddTask = useCallback(
    (taskText: string) => {
      actions.todo.add(taskText);
      bottomSheetRef.current?.close();
    },
    [actions, bottomSheetRef],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      style={commonStyles.bottomSheet}
      onChange={handleSheetChanges}
      {...commonBottomSheetProps}>
      <BottomSheetView style={commonStyles.contentContainer}>
        <AddTaskBottomSheet onAddTask={handleAddTask} />
      </BottomSheetView>
    </BottomSheet>
  );
}
