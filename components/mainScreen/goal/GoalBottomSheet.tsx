import React, {useState, useRef} from 'react';
import {View, Text, Pressable, StyleSheet, Keyboard} from 'react-native';
import {
  SimpleLineIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome6,
} from '@expo/vector-icons';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {TextInput} from 'react-native-gesture-handler';
import {TaskItem} from '@/hooks/useGoalData';
import {Theme} from '@/constants/Theme';

interface GoalBottomSheetProps {
  icon: string;
  title: string;
  achieved: TaskItem[];
  dDay: number;
  rDay: string;
  onTitleChange?: (newTitle: string) => void;
  onAchieveGoal?: () => void;
  onDeleteGoal?: () => void;
}

export function GoalBottomSheet({
  icon,
  title,
  achieved,
  dDay,
  rDay,
  onTitleChange,
  onAchieveGoal,
  onDeleteGoal,
}: GoalBottomSheetProps) {
  const [editableTitle, setEditableTitle] = useState(title);
  const titleInputRef = useRef<TextInput>(null);

  const handleTitleChange = (text: string) => {
    setEditableTitle(text);
    if (onTitleChange) {
      onTitleChange(text);
    }
  };

  const handleAchieveGoal = () => {
    console.log('목표 달성 버튼 클릭');
    if (onAchieveGoal) {
      onAchieveGoal();
    }
  };

  const handleDeleteGoal = () => {
    console.log('목표 삭제 버튼 클릭');
    if (onDeleteGoal) {
      onDeleteGoal();
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <SimpleLineIcons
            name={icon as any}
            size={Theme.iconSize.medium}
            color={Theme.colors.highlight}
          />
        </View>
        <Ionicons
          name="chevron-down"
          size={Theme.iconSize.small}
          color={Theme.colors.highlight}
          style={styles.dropdownIcon}
        />
        <View style={styles.inputContainer}>
          <BottomSheetTextInput
            ref={titleInputRef}
            value={editableTitle}
            onChangeText={handleTitleChange}
            style={styles.goalTitleInput}
            placeholder="Folder name"
            placeholderTextColor="#A0A0A0"
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
            <View style={styles.gaugeBackground}>
              <View style={[styles.gaugeProgress, {width: '70%'}]} />
            </View>
          </View>
          <Text style={styles.statValue}>D-{dDay}</Text>
          <Text style={styles.statLabel}>{rDay}</Text>
        </View>
      </View>

      {/* 완료 및 삭제 */}
      <View style={styles.footerSection}>
        {/* 완료 버튼 */}
        <Pressable style={styles.completeButton} onPress={handleAchieveGoal}>
          <Text style={styles.completeButtonText}>목표달성 완료</Text>
        </Pressable>

        {/* 삭제 버튼 */}
        <Text onPress={handleDeleteGoal} style={styles.deleteButtonText}>
          목표 삭제
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  goalTitleInput: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  underline: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 2,
  },
  dropdownIcon: {
    marginHorizontal: 4,
    marginRight: 12,
  },
  footerSection: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ff4d4f',
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 120,
    flexDirection: 'column',
  },
  statIconContainer: {
    // width: 50,
    // height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    // marginVertical: 4,
    flex: 0.3,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    flex: 0.3,
  },
  gaugeBackground: {
    width: 100,
    height: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  gaugeProgress: {
    height: '100%',
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
});
