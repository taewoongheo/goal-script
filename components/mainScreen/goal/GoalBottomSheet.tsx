import React from 'react';
import {View, Pressable, StyleSheet, Keyboard} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import {viewportWidth} from '@/utils/viewport';
import {TaskItem} from '@/types/goal';
import {useGoalBottomSheetHandlers} from '@/hooks/useGoalBottomSheetHandlers';
import {GoalBottomSheetMain} from './GoalBottomSheetMain';
import {GoalBottomSheetEdit} from './GoalBottomSheetEdit';

interface GoalBottomSheetProps {
  icon: string;
  title: string;
  achieved: TaskItem[];
  dDay: number;
  rDay: string;
  isCompleted: boolean;
  onTitleChange?: (text: string) => void;
  onCompleteGoal?: () => void;
  onDeleteGoal?: () => void;
  bottomSheetRef?: React.RefObject<any>;
  setEditModeHeight: (height: number) => void;
}

export function GoalBottomSheet({
  title,
  achieved,
  dDay,
  rDay,
  isCompleted,
  onTitleChange,
  onCompleteGoal,
  onDeleteGoal,
  bottomSheetRef,
  setEditModeHeight,
}: GoalBottomSheetProps) {
  const {
    editableTitle,
    tempEditableTitle,
    setTempEditableTitle,
    isEditMode,
    titleInputRef,
    handlers,
  } = useGoalBottomSheetHandlers({
    title,
    onTitleChange,
    onCompleteGoal,
    onDeleteGoal,
    bottomSheetRef,
  });

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (isEditMode) {
          // bottomSheetRef?.current.snapToIndex(0);
          // Keyboard.dismiss();
          return;
        }
        Keyboard.dismiss();
      }}>
      <View>
        {!isEditMode ? (
          // 첫 번째 뷰 - 메인
          <GoalBottomSheetMain
            editableTitle={editableTitle}
            achieved={achieved}
            dDay={dDay}
            rDay={rDay}
            isCompleted={isCompleted}
            onSwitchToEdit={handlers.handleSwitchToEdit}
            onCompleteGoal={handlers.handleCompleteGoal}
            onDeleteGoal={handlers.handleDeleteGoal}
          />
        ) : (
          // 두 번째 뷰 - 편집
          <GoalBottomSheetEdit
            tempEditableTitle={tempEditableTitle}
            setTempEditableTitle={setTempEditableTitle}
            titleInputRef={titleInputRef}
            onSwitchToMain={handlers.handleSwitchToMain}
            onConfirmEdit={handlers.handleConfirmEdit}
            bottomSheetRef={bottomSheetRef}
            setEditModeHeight={setEditModeHeight}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Theme.spacing.medium,
    backgroundColor: Theme.colors.dropdownBackground,
    paddingBottom: Theme.spacing.xl,
  },
  slideView: {
    width: viewportWidth,
    paddingHorizontal: Theme.spacing.large,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.large,
    backgroundColor: 'rgb(245, 245, 245)',
    paddingVertical: Theme.spacing.small,
    paddingHorizontal: Theme.spacing.medium,
    borderRadius: Theme.borderRadius.medium,
  },
  inputContainer: {
    flex: 1,
  },
  goalTitleInput: {
    fontSize: moderateScale(18),
    fontFamily: Theme.fontFamily.semiBold,
    color: Theme.colors.highlight,
    paddingVertical: Theme.spacing.xs * scale(1.5),
  },
  footerSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: Theme.spacing.medium,
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.medium,
    gap: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: moderateScale(120, 0.3),
    flexDirection: 'column',
  },
  statIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },
  statValue: {
    fontSize: 24,
    fontFamily: Theme.fontFamily.bold,
    color: Theme.colors.highlight,
    flex: 0.3,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.textSecondary,
    flex: 0.3,
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
