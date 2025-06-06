import React, {useCallback, useRef, useState} from 'react';
import {Keyboard, View, StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {Theme} from '@/constants/Theme';
import {scale} from 'react-native-size-matters';
import {Colors} from '@/constants/Colors';
import {viewportWidth} from '@/utils/viewport';
import {TextInput} from 'react-native-gesture-handler';
import {useGoalStore} from '@/stores/goalStore';
import {useGoalData} from '@/hooks/useGoalData';
import {commonBottomSheetProps, commonStyles} from './bottomSheetCommon';
import {PrimaryBottomSheetButton} from '../ui/BottomSheetButton';

interface AddGoalBottomSheetContainerProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export function AddGoalBottomSheetContainer({
  bottomSheetRef,
}: AddGoalBottomSheetContainerProps) {
  const [tempEditableTitle, setTempEditableTitle] = useState('');
  const titleInputRef = useRef<TextInput>(null);
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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      style={commonStyles.bottomSheet}
      onChange={handleSheetChanges}
      {...commonBottomSheetProps}>
      <BottomSheetView style={commonStyles.contentContainer}>
        <View style={styles.bottomSheetContainer}>
          {/* Input field */}
          <View style={styles.editTextInputContainer}>
            <BottomSheetTextInput
              ref={titleInputRef}
              value={tempEditableTitle}
              onChangeText={setTempEditableTitle}
              style={styles.editTextInput}
              placeholder="목표 제목을 입력하세요"
              multiline={false}
              returnKeyType="done"
              autoCorrect={false}
              spellCheck={false}
            />
          </View>
          <PrimaryBottomSheetButton
            label="목표 추가"
            onPress={() => {
              actions.goal.add({
                title: tempEditableTitle,
                icon: '🎯',
                dDay: {
                  date: new Date().toISOString(),
                  remainingDays: 0,
                },
                isCompleted: false,
              });
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: viewportWidth,
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
    marginBottom: Theme.spacing.xl,
  },
  editTextInputContainer: {
    marginBottom: Theme.spacing.medium,
  },
  editTextInput: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.regular,
    paddingVertical: Theme.spacing.medium - scale(2),
    paddingHorizontal: Theme.spacing.small,
    borderWidth: 1,
    borderColor: Colors.light.buttonDisabled,
    borderRadius: Theme.borderRadius.medium,
    backgroundColor: Colors.light.formBackground,
    color: Theme.colors.highlight,
  },
  editActionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: Theme.spacing.medium,
    alignItems: 'center',
    paddingBottom: scale(57),
  },
});
