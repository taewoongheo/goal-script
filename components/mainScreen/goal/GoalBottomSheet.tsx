import React, {useState, useRef} from 'react';
import {View, Text, Pressable, StyleSheet, Keyboard} from 'react-native';
import {FontAwesome6, AntDesign} from '@expo/vector-icons';
import {TextInput} from 'react-native-gesture-handler';
import {moderateScale, scale} from 'react-native-size-matters';
import {Theme} from '@/constants/Theme';
import {BottomSheetButton} from '@/components/ui/BottomSheetButton';
import {TaskItem} from '@/types/goal';
import {viewportWidth} from '@/utils/viewport';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {Colors} from '@/constants/Colors';

interface GoalBottomSheetProps {
  icon: string;
  title: string;
  achieved: TaskItem[];
  dDay: number;
  rDay: string;
  onTitleChange?: (text: string) => void;
  onDeleteGoal?: () => void;
  bottomSheetRef?: React.RefObject<any>;
  setEditModeHeight: (height: number) => void;
}

export function GoalBottomSheet({
  title,
  achieved,
  dDay,
  rDay,
  onTitleChange,
  onDeleteGoal,
  bottomSheetRef,
  setEditModeHeight,
}: GoalBottomSheetProps) {
  const [editableTitle, setEditableTitle] = useState(title);
  const [tempEditableTitle, setTempEditableTitle] = useState(title);
  const titleInputRef = useRef<TextInput>(null);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleSwitchToEdit = () => {
    setIsEditMode(true);
    setTempEditableTitle(editableTitle);
    bottomSheetRef?.current.snapToIndex(0);
  };

  const handleSwitchToMain = () => {
    setIsEditMode(false);
    setTempEditableTitle(editableTitle);
    bottomSheetRef?.current.snapToIndex(1);
  };

  const handleEditGoal = (text: string) => {
    if (onTitleChange) {
      onTitleChange(text);
    }
  };

  const handleDeleteGoal = () => {
    if (onDeleteGoal) {
      onDeleteGoal();
    }
  };

  const handleConfirmEdit = () => {
    setEditableTitle(tempEditableTitle);
    if (onTitleChange) {
      onTitleChange(tempEditableTitle);
    }
    handleSwitchToMain();
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (isEditMode) {
          bottomSheetRef?.current.snapToIndex(0);
          Keyboard.dismiss();
          return;
        }
        Keyboard.dismiss();
      }}>
      <View>
        {!isEditMode ? (
          // 첫 번째 뷰 - 메인
          <View style={styles.slideView}>
            <Pressable onPress={handleSwitchToEdit} style={styles.headerRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.goalTitleInput}>{editableTitle}</Text>
              </View>
              <AntDesign
                name="right"
                size={Theme.iconSize.medium}
                color={Theme.colors.highlight}
              />
            </Pressable>

            {/* 상단 통계 섹션 */}
            <View style={styles.statsContainer}>
              {/* 달성한 할 일들 achieved.length */}
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <FontAwesome6
                    name="fire"
                    size={Theme.iconSize.large}
                    color={Theme.colors.highlight}
                  />
                </View>
                <Text style={styles.statValue}>{achieved.length}</Text>
                <Text style={styles.statLabel}>완료한 일들</Text>
              </View>

              {/* 남은 날짜들 rDay */}
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <AntDesign
                    name="clockcircle"
                    size={Theme.iconSize.large}
                    color={Theme.colors.highlight}
                  />
                </View>
                <Text style={styles.statValue}>D-{dDay}</Text>
                <Text style={styles.statLabel}>{rDay}</Text>
              </View>
            </View>

            {/* 완료 및 삭제 */}
            <View style={styles.footerSection}>
              {/* 완료 버튼 */}
              <BottomSheetButton
                label="목표 완료하기"
                onPress={() => handleEditGoal(editableTitle)}
                type="primary"
              />

              {/* 삭제 버튼 */}
              <BottomSheetButton
                label="목표 삭제"
                onPress={handleDeleteGoal}
                type="text"
              />
            </View>
          </View>
        ) : (
          // 두 번째 뷰 - 편집
          <View
            style={[styles.slideView]}
            onLayout={e => {
              setEditModeHeight(e.nativeEvent.layout.height);
            }}>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                handleSwitchToMain();
              }}
              style={[{width: scale(30)}]}>
              <AntDesign
                name="arrowleft"
                size={Theme.iconSize.medium}
                color={Theme.colors.highlight}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                bottomSheetRef?.current.snapToIndex(0);
                Keyboard.dismiss();
              }}
              style={[styles.container]}>
              {/* Input field */}
              <View style={styles.editTextInputContainer}>
                <BottomSheetTextInput
                  ref={titleInputRef}
                  value={tempEditableTitle}
                  onChangeText={setTempEditableTitle}
                  style={styles.editTextInput}
                  placeholder="작업 내용을 입력하세요"
                  multiline={false}
                  returnKeyType="done"
                  autoCorrect={false}
                  spellCheck={false}
                />
              </View>

              {/* Action buttons */}
              <View style={styles.editActionsContainer}>
                <BottomSheetButton
                  label="수정하기"
                  onPress={handleConfirmEdit}
                  type="primary"
                />
              </View>
            </Pressable>
          </View>
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
