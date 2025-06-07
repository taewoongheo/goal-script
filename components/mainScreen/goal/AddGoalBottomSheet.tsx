import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {FontAwesome5} from '@expo/vector-icons';
import {Theme} from '@/constants/Theme';
import {scale} from 'react-native-size-matters';
import {Colors} from '@/constants/Colors';
import {viewportWidth} from '@/utils/viewport';
import {TextInput} from 'react-native-gesture-handler';
import {PrimaryBottomSheetButton} from '@/components/ui/BottomSheetButton';

interface AddGoalBottomSheetProps {
  title: string;
  setTitle: (text: string) => void;
  selectedIcon: string;
  setSelectedIcon: (icon: string) => void;
  onAddGoal: () => void;
  icons: string[][];
  inputRef: React.RefObject<TextInput>;
}

export function AddGoalBottomSheet({
  title,
  setTitle,
  selectedIcon,
  setSelectedIcon,
  onAddGoal,
  icons,
  inputRef,
}: AddGoalBottomSheetProps) {
  return (
    <View style={styles.bottomSheetContainer}>
      {/* Input field */}
      <View style={styles.editTextInputContainer}>
        <BottomSheetTextInput
          ref={inputRef}
          value={title}
          onChangeText={setTitle}
          style={styles.editTextInput}
          placeholder="목표 제목을 입력하세요"
          multiline={false}
          returnKeyType="done"
          autoCorrect={false}
          spellCheck={false}
        />
      </View>
      <View style={styles.iconGrid}>
        {icons.map((row, idx) => (
          <View
            key={idx}
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {row.map((name, iconIdx) => (
              <Pressable
                key={iconIdx}
                style={[
                  styles.iconButton,
                  selectedIcon === name && styles.iconButtonSelected,
                ]}
                onPress={() => setSelectedIcon(name)}>
                <FontAwesome5 name={name} size={24} color="black" />
              </Pressable>
            ))}
          </View>
        ))}
      </View>
      <PrimaryBottomSheetButton label="목표 추가" onPress={onAddGoal} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: viewportWidth,
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
    marginBottom: Theme.spacing.xl + scale(8),
  },
  editTextInputContainer: {},
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
  iconGrid: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Theme.spacing.medium,
    borderRadius: Theme.borderRadius.medium,
    padding: Theme.spacing.small,
  },
  iconButton: {
    width: Theme.iconSize.addGoal,
    height: Theme.iconSize.addGoal,
    borderRadius: Theme.borderRadius.small,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(239, 239, 239)',
    borderWidth: 0.3,
    borderColor: 'transparent',
  },
  iconButtonSelected: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(201, 201, 201)',
    borderWidth: 1.8,
  },
});
