import React, {useCallback} from 'react';
import {Keyboard} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {ListItemBottomSheet} from '@/components/mainScreen/task/ListItemBottomSheet';
import {useGoalData} from '@/hooks/useGoalData';
import {useGoalStore} from '@/stores/goalStore';
import {TaskItem} from '@/types/goal';
import {commonBottomSheetProps, commonStyles} from './bottomSheetCommon';

interface ListItemBottomSheetContainerProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
  selectedTask: TaskItem | null;
  setSelectedTask: (task: TaskItem | null) => void;
}

export function ListItemBottomSheetContainer({
  bottomSheetRef,
  selectedTask,
  setSelectedTask,
}: ListItemBottomSheetContainerProps) {
  // const listItemSnapPoints = useMemo(() => ['35%'], []);
  const goalData = useGoalStore(state => state.goalData);
  const {actions} = useGoalData(goalData?.id ?? '');

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

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        Keyboard.dismiss();
        setSelectedTask(null);
      }
    },
    [setSelectedTask],
  );

  const handleEditTask = useCallback(
    (taskId: string, newText: string) => {
      if (!selectedTask) return;

      if (selectedTask.isCompleted) {
        actions.achieved.edit(taskId, newText);
      } else {
        actions.todo.edit(taskId, newText);
      }

      bottomSheetRef.current?.close();
    },
    [selectedTask, actions, bottomSheetRef],
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (!selectedTask) return;

      if (selectedTask.isCompleted) {
        actions.achieved.remove(taskId);
      } else {
        actions.todo.remove(taskId);
      }

      bottomSheetRef.current?.close();
    },
    [selectedTask, actions, bottomSheetRef],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      // snapPoints={listItemSnapPoints}
      backdropComponent={renderBackdrop}
      style={commonStyles.bottomSheet}
      onChange={handleSheetChanges}
      {...commonBottomSheetProps}>
      <BottomSheetView style={commonStyles.contentContainer}>
        <ListItemBottomSheet
          onEditItem={handleEditTask}
          onDeleteItem={handleDeleteTask}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
