import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {TextInput} from 'react-native-gesture-handler';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import {BottomSheetButton} from '@/components/ui/BottomSheetButton';

interface AddTaskBottomSheetProps {
  onAddTask?: (taskText: string) => void;
  inputRef?: React.RefObject<TextInput>;
}

export function AddTaskBottomSheet({onAddTask}: AddTaskBottomSheetProps) {
  const [taskText, setTaskText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      onAddTask?.(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Input field */}
      <View style={styles.inputContainer}>
        <BottomSheetTextInput
          ref={inputRef}
          value={taskText}
          onChangeText={setTaskText}
          style={styles.input}
          placeholder="새로운 할 일을 입력하세요"
          multiline={false}
          returnKeyType="done"
          autoCorrect={false}
          spellCheck={false}
          onSubmitEditing={handleAddTask}
        />
      </View>

      {/* Action button */}
      <View style={styles.footerSection}>
        <BottomSheetButton
          label="할 일 추가"
          onPress={handleAddTask}
          type="primary"
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
