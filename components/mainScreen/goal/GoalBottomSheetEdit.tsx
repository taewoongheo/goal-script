import React from 'react';
import {View, Pressable, Keyboard, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {scale} from 'react-native-size-matters';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {TextInput} from 'react-native-gesture-handler';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import {PrimaryBottomSheetButton} from '@/components/ui/BottomSheetButton';
import {viewportWidth} from '@/utils/viewport';

interface GoalBottomSheetEditProps {
  tempEditableTitle: string;
  setTempEditableTitle: (text: string) => void;
  titleInputRef: React.RefObject<TextInput>;
  onSwitchToMain: () => void;
  onConfirmEdit: () => void;
  bottomSheetRef?: React.RefObject<any>;
  setEditModeHeight: (height: number) => void;
}

export function GoalBottomSheetEdit({
  tempEditableTitle,
  setTempEditableTitle,
  titleInputRef,
  onSwitchToMain,
  onConfirmEdit,
  bottomSheetRef,
  setEditModeHeight,
}: GoalBottomSheetEditProps) {
  return (
    <View
      style={[styles.slideView]}
      onLayout={e => {
        setEditModeHeight(e.nativeEvent.layout.height);
      }}>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          onSwitchToMain();
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
          <PrimaryBottomSheetButton label="수정하기" onPress={onConfirmEdit} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  slideView: {
    width: viewportWidth,
    paddingHorizontal: Theme.spacing.large,
  },
  container: {
    paddingVertical: Theme.spacing.medium,
    backgroundColor: Theme.colors.dropdownBackground,
    paddingBottom: Theme.spacing.xl,
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
