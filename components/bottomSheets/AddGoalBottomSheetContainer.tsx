import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {TextInput} from 'react-native-gesture-handler';
import {useGoalData} from '@/hooks/useGoalData';
import {generateUUID} from '@/utils/uuid';
import {AddGoalBottomSheet} from '@/components/mainScreen/goal/AddGoalBottomSheet';
import {dateUtils} from '@/utils/dateUtils';
import {useGoalStore} from '@/stores/goalStore';
import {commonBottomSheetProps, commonStyles} from './bottomSheetCommon';

interface AddGoalBottomSheetContainerProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export function AddGoalBottomSheetContainer({
  bottomSheetRef,
}: AddGoalBottomSheetContainerProps) {
  const [tempEditableTitle, setTempEditableTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string>('archway');
  const titleInputRef = useRef<TextInput>(null);

  const {setSelectedGoalId} = useGoalStore();
  const {actions} = useGoalData('');

  const icons = useMemo(
    () => [
      ['archway', 'atom', 'award', 'basketball-ball', 'battery-full', 'book'],
      ['brain', 'briefcase', 'broom', 'calendar-alt', 'camera-retro', 'car'],
      ['chart-line', 'child', 'city', 'cloud-sun', 'coffee', 'couch'],
      [
        'dumbbell',
        'glass-cheers',
        'globe',
        'graduation-cap',
        'heartbeat',
        'home',
      ],
      ['leaf', 'medal', 'mountain', 'paint-brush', 'paw', 'running'],
      ['trophy', 'weight', 'weight-hanging', 'tree', 'utensils', 'money-bill'],
    ],
    [],
  );

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

  const handleAddGoal = () => {
    const goalId = generateUUID();
    const today = dateUtils.formatToAppDate(dateUtils.getToday());
    actions.goal.add({
      id: goalId,
      achieved: [],
      todos: [],
      title: tempEditableTitle,
      icon: selectedIcon,
      createdDate: today,
      dDay: {
        date: today,
        remainingDays: 0,
      },
      isCompleted: false,
    });
    bottomSheetRef.current?.close();
    setTempEditableTitle('');
    setSelectedIcon('archway');
    setSelectedGoalId(goalId);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      style={commonStyles.bottomSheet}
      onChange={handleSheetChanges}
      {...commonBottomSheetProps}>
      <BottomSheetView style={commonStyles.contentContainer}>
        <AddGoalBottomSheet
          title={tempEditableTitle}
          setTitle={setTempEditableTitle}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          onAddGoal={handleAddGoal}
          icons={icons}
          inputRef={titleInputRef}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
