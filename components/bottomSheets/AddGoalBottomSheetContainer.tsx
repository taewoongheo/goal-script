import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Keyboard, View, StyleSheet, TouchableOpacity} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {Theme} from '@/constants/Theme';
import {scale} from 'react-native-size-matters';
import {Colors} from '@/constants/Colors';
import {viewportWidth} from '@/utils/viewport';
import {Pressable, TextInput} from 'react-native-gesture-handler';
import {useGoalStore} from '@/stores/goalStore';
import {useGoalData} from '@/hooks/useGoalData';
import {FontAwesome5} from '@expo/vector-icons';
import {commonBottomSheetProps, commonStyles} from './bottomSheetCommon';
import {PrimaryBottomSheetButton} from '../ui/BottomSheetButton';

interface AddGoalBottomSheetContainerProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export function AddGoalBottomSheetContainer({
  bottomSheetRef,
}: AddGoalBottomSheetContainerProps) {
  const [tempEditableTitle, setTempEditableTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string>('archway');
  const titleInputRef = useRef<TextInput>(null);
  const selectedGoalId = useGoalStore(state => state.selectedGoalId);
  const {actions} = useGoalData(selectedGoalId ?? '');

  const icons = useMemo(
    () => [
      ['archway', 'atom', 'award', 'basketball-ball', 'battery-full', 'book'],
      ['brain', 'briefcase', 'broom', 'calendar-alt', 'camera-retro', 'car'],
      ['chart-line', 'child', 'city', 'cloud-sun', 'coffee', 'couch'],
      [
        'dumbbell',
        'glass-cheers',
        'globe',
        'graduation-cap',
        'heartbeat',
        'home',
      ],
      ['leaf', 'medal', 'mountain', 'paint-brush', 'paw', 'running'],
      ['trophy', 'weight', 'weight-hanging', 'tree', 'utensils', 'money-bill'],
    ],
    [],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      Keyboard.dismiss();
    }
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      style={commonStyles.bottomSheet}
      onChange={handleSheetChanges}
      {...commonBottomSheetProps}>
      <BottomSheetView style={commonStyles.contentContainer}>
        <Pressable
          style={styles.bottomSheetContainer}
          onPress={() => {
            Keyboard.dismiss();
          }}>
          {/* Input field */}
          <View style={styles.editTextInputContainer}>
            <BottomSheetTextInput
              ref={titleInputRef}
              value={tempEditableTitle}
              onChangeText={setTempEditableTitle}
              style={styles.editTextInput}
              placeholder="목표 제목을 입력하세요"
              multiline={false}
              returnKeyType="done"
              autoCorrect={false}
              spellCheck={false}
            />
          </View>
          <View style={styles.iconGrid}>
            {icons.map((icon, idx) => (
              <View
                key={idx}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {icon.map((name, iconIdx) => (
                  <Pressable
                    key={iconIdx}
                    style={[
                      styles.iconButton,
                      selectedIcon === name && styles.iconButtonSelected,
                    ]}
                    onPress={() => setSelectedIcon(name)}>
                    <FontAwesome5
                      key={iconIdx}
                      name={name}
                      size={24}
                      color="black"
                    />
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
          <PrimaryBottomSheetButton
            label="목표 추가"
            onPress={() => {
              actions.goal.add({
                title: tempEditableTitle,
                icon: selectedIcon,
                dDay: {
                  date: new Date().toISOString(),
                  remainingDays: 0,
                },
                isCompleted: false,
              });
            }}
          />
        </Pressable>
      </BottomSheetView>
    </BottomSheet>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: Theme.iconSize.addGoal,
    height: Theme.iconSize.addGoal,
    borderRadius: Theme.borderRadius.small,
    margin: 4,
    backgroundColor: 'rgb(239, 239, 239)',
    borderWidth: 0.3,
    borderColor: 'transparent',
  },
  iconButtonSelected: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(201, 201, 201)',
    borderWidth: 2,
  },
});
