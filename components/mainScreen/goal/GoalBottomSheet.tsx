import React, {useState, useRef} from 'react';
import {View, Text, Pressable, StyleSheet, Keyboard} from 'react-native';
import {FontAwesome6, AntDesign, FontAwesome5} from '@expo/vector-icons';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {TextInput} from 'react-native-gesture-handler';
import {moderateScale, scale} from 'react-native-size-matters';
import {Theme} from '@/constants/Theme';
import {BottomSheetButton} from '@/components/ui/BottomSheetButton';
import {Colors} from '@/constants/Colors';
import {TaskItem} from '@/types/goal';

interface GoalBottomSheetProps {
  icon: string;
  title: string;
  achieved: TaskItem[];
  dDay: number;
  rDay: string;
  onTitleChange?: (text: string) => void;
  onDeleteGoal?: () => void;
}

export function GoalBottomSheet({
  icon,
  title,
  achieved,
  dDay,
  rDay,
  onTitleChange,
  onDeleteGoal,
}: GoalBottomSheetProps) {
  const [editableTitle, setEditableTitle] = useState(title);
  const titleInputRef = useRef<TextInput>(null);

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

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <FontAwesome5
            name={icon as any}
            size={Theme.iconSize.medium}
            color={Theme.colors.highlight}
          />
        </View>
        {/* <Ionicons
          name="chevron-down"
          size={Theme.iconSize.small}
          color={Theme.colors.highlight}
          style={styles.dropdownIcon}
        /> */}
        <View style={styles.inputContainer}>
          <BottomSheetTextInput
            ref={titleInputRef}
            value={editableTitle}
            onChangeText={setEditableTitle}
            style={styles.goalTitleInput}
            placeholder="목표 이름을 입력해주세요"
            placeholderTextColor={Colors.light.textSecondary}
            autoCorrect={false}
            spellCheck={false}
          />
          <View style={styles.underline} />
        </View>
      </View>

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
          label="목표 이름 수정하기"
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
    backgroundColor: Theme.colors.dropdownBackground,
    marginBottom: Theme.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.large - scale(2),
  },
  iconContainer: {
    width: Theme.iconSize.large + scale(18),
    height: Theme.iconSize.large + scale(18),
    backgroundColor: Colors.light.inputBackground,
    borderRadius: Theme.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.iconSpace.medium,
  },
  inputContainer: {
    flex: 1,
  },
  goalTitleInput: {
    fontSize: Theme.fontSize.large - scale(5),
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.highlight,
    paddingVertical: Theme.spacing.xs * scale(1.5),
  },
  underline: {
    height: scale(1),
    backgroundColor: Colors.light.buttonDisabled,
  },
  dropdownIcon: {
    marginHorizontal: Theme.spacing.xs,
    marginRight: Theme.spacing.medium - scale(4),
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
});
