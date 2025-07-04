import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {scale} from 'react-native-size-matters';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {Pressable, TextInput} from 'react-native-gesture-handler';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import {
  PrimaryBottomSheetButton,
  TextBottomSheetButton,
} from '@/components/ui/BottomSheetButton';
import {useSelectedTask} from '@/app/_layout';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

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

  useEffect(() => {
    if (selectedTask) {
      setEditText(selectedTask.text);
    }
  }, [selectedTask]);

  const handleEditTask = () => {
    if (selectedTask && editText !== selectedTask.text) {
      if (editText === '') {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: '목표를 입력해주세요.',
          textBody: '한 글자 이상 입력해주세요',
        });
        return;
      }
      if (editText.length > 30) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: '글자 수 제한',
          textBody: '30자 이하로 입력해주세요',
        });
        return;
      }
      onEditItem?.(selectedTask.id, editText);
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      onDeleteItem?.(selectedTask.id);
    }
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
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
        <PrimaryBottomSheetButton
          label={selectedTask?.isCompleted ? '수정하기' : '수정하기'}
          onPress={handleEditTask}
        />
        <TextBottomSheetButton
          label={selectedTask?.isCompleted ? '기록 삭제' : '할 일 삭제'}
          onPress={handleDeleteTask}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
    backgroundColor: Colors.light.white,
    marginBottom: Theme.spacing.xl,
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
