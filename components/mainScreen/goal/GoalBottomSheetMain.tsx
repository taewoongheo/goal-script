import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {FontAwesome6, AntDesign} from '@expo/vector-icons';
import {moderateScale} from 'react-native-size-matters';
import {Theme} from '@/constants/Theme';
import {
  PrimaryBottomSheetButton,
  TextBottomSheetButton,
} from '@/components/ui/BottomSheetButton';
import {TaskItem} from '@/types/goal';
import {viewportWidth} from '@/utils/viewport';

interface GoalBottomSheetMainProps {
  editableTitle: string;
  achieved: TaskItem[];
  dDay: number;
  rDay: string;
  onSwitchToEdit: () => void;
  onCompleteGoal: () => void;
  onDeleteGoal: () => void;
}

export function GoalBottomSheetMain({
  editableTitle,
  achieved,
  dDay,
  rDay,
  onSwitchToEdit,
  onCompleteGoal,
  onDeleteGoal,
}: GoalBottomSheetMainProps) {
  return (
    <View style={styles.slideView}>
      <Pressable onPress={onSwitchToEdit} style={styles.headerRow}>
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
        <PrimaryBottomSheetButton
          label="목표 완료하기"
          onPress={onCompleteGoal}
        />

        {/* 삭제 버튼 */}
        <TextBottomSheetButton label="목표 삭제" onPress={onDeleteGoal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingVertical: Theme.spacing.xs * 1.5,
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
  footerSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: Theme.spacing.medium,
    alignItems: 'center',
  },
});
