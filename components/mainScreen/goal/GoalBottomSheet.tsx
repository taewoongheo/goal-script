import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import {TaskItem} from '@/hooks/useGoalData';
import {useBottomSheet} from '@/contexts/BottomSheetContext';

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
    <View style={styles.container}>
      {/* 목표 아이콘과 제목 */}
      <View style={styles.headerRow}>
        <SimpleLineIcons
          name={icon as any}
          size={28}
          color="#444"
          style={styles.icon}
        />
        <View style={styles.titleInputContainer}>
          {/* <TextInput
            ref={titleInputRef}
            value={editableTitle}
            onChangeText={handleTitleChange}
            style={styles.titleInput}
            placeholder="목표를 입력해주세요"
            placeholderTextColor="#AAA"
            multiline={false}
            numberOfLines={1}
            maxLength={100}
            keyboardType="default"
            returnKeyType="done"
            scrollEnabled
            {...(Platform.OS === 'ios'
              ? {
                  allowFontScaling: false,
                  dataDetectorTypes: 'none',
                }
              : {})}
          /> */}
          <TextInput
            ref={titleInputRef}
            value={editableTitle}
            onChangeText={handleTitleChange}
            style={styles.basicTitleInput}
            placeholder="목표를 입력해주세요"
          />
        </View>
      </View>

      {/* 정보 박스 */}
      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>완료한 일들</Text>
          <Text style={styles.infoValue}>{achieved.length}개</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>남은 날짜</Text>
          <Text style={styles.infoValue}>
            {dDay}일 ({rDay})
          </Text>
        </View>
      </View>

      {/* 목표 달성 버튼 */}
      <Pressable style={styles.achieveButton} onPress={handleAchieveGoal}>
        <Text style={styles.achieveButtonText}>목표 달성</Text>
      </Pressable>

      {/* 목표 삭제 버튼 */}
      <Pressable onPress={handleDeleteGoal} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>목표 삭제</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
    marginTop: 8,
  },
  titleInputContainer: {
    flex: 1,
    // overflow: 'hidden',
  },
  titleInput: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
    paddingVertical: 6,
    paddingHorizontal: 0,
    borderWidth: 0,
    height: 40,
    textAlign: 'left',
    includeFontPadding: false,
  },
  basicTitleInput: {
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
  },
  infoBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    width: 1,
    backgroundColor: '#EAEAEA',
    marginHorizontal: 10,
  },
  achieveButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  achieveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    alignItems: 'center',
    padding: 12,
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 14,
  },
});
