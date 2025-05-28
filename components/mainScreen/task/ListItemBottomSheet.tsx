import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {TextInput} from 'react-native-gesture-handler';
import {useSelectedTask} from '@/app/_layout';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import {BottomSheetButton} from '@/components/ui/BottomSheetButton';

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

  // Update text when selected task changes
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
      {/* Input field */}
      <View style={styles.inputContainer}>
        <BottomSheetTextInput
          ref={inputRef}
          value={editText}
          onChangeText={setEditText}
          style={styles.input}
          placeholder="작업 내용을 입력하세요"
          multiline={false}
          returnKeyType="done"
          autoCorrect={false}
          spellCheck={false}
        />
      </View>

      {/* Action buttons */}
      <View style={styles.footerSection}>
        <BottomSheetButton
          label={selectedTask.completed ? '수정하기' : '수정하기'}
          onPress={handleEditTask}
          type="primary"
        />
        <BottomSheetButton
          label={selectedTask.completed ? '기록 삭제' : '할 일 삭제'}
          onPress={handleDeleteTask}
          type="text"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
    backgroundColor: Colors.light.white,
  },
  inputContainer: {
    marginBottom: Theme.spacing.medium,
  },
  input: {
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
  footerSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: Theme.spacing.medium,
    alignItems: 'center',
  },
});
