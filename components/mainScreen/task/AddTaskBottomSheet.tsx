import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {TextInput} from 'react-native-gesture-handler';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import {PrimaryBottomSheetButton} from '@/components/ui/BottomSheetButton';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

interface AddTaskBottomSheetProps {
  onAddTask?: (taskText: string) => void;
}

export function AddTaskBottomSheet({onAddTask}: AddTaskBottomSheetProps) {
  const [taskText, setTaskText] = useState('');
  const inputRef = useRef<TextInput>(null);

  const handleAddTask = () => {
    if (taskText === '') {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '목표를 입력해주세요.',
        textBody: '한 글자 이상 입력해주세요',
      });
      return;
    }

    if (taskText.length > 30) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '글자 수 제한',
        textBody: '30자 이하로 입력해주세요',
      });
      return;
    }

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
          onSubmitEditing={handleAddTask}
          autoCorrect={false}
          spellCheck={false}
        />
      </View>

      {/* Action button */}
      <View style={styles.footerSection}>
        <PrimaryBottomSheetButton label="할 일 추가" onPress={handleAddTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
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
