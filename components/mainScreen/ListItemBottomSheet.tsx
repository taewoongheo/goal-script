import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {TaskItem} from '@/hooks/useGoalData';
import {useSelectedTask} from '@/app/_layout';

interface ListItemBottomSheetProps {
  onEditItem?: (taskId: string, newText: string) => void;
  onDeleteItem?: (taskId: string) => void;
}

export function ListItemBottomSheet({
  onEditItem,
  onDeleteItem,
}: ListItemBottomSheetProps) {
  const {selectedTask} = useSelectedTask();
  const [editText, setEditText] = useState('');
  const inputRef = useRef<TextInput>(null);

  // 선택된 작업이 변경될 때마다 텍스트 업데이트
  useEffect(() => {
    if (selectedTask) {
      setEditText(selectedTask.text);
    }
  }, [selectedTask]);

  const handleEditTask = () => {
    if (
      selectedTask &&
      editText.trim() !== '' &&
      editText !== selectedTask.text
    ) {
      onEditItem?.(selectedTask.id, editText);
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      onDeleteItem?.(selectedTask.id);
    }
  };

  if (!selectedTask) return null;

  return (
    <View style={styles.container}>
      {/* 핸들바 */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.title}>작업 편집</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          value={editText}
          onChangeText={setEditText}
          style={styles.input}
          placeholder="작업 내용을 입력하세요"
          multiline={false}
          returnKeyType="done"
          autoFocus
        />
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditTask}>
          <Feather name="edit-2" size={18} color="#FFF" />
          <Text style={styles.editButtonText}>수정하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteTask}>
          <Feather name="trash-2" size={16} color="#FF5555" />
          <Text style={styles.deleteButtonText}>삭제하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    backgroundColor: 'white',
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  actionButtons: {
    gap: 12,
  },
  editButton: {
    backgroundColor: '#4A6FFF',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    shadowColor: '#4A6FFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'rgba(255, 85, 85, 0.3)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  deleteButtonText: {
    color: '#FF5555',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 8,
  },
});
