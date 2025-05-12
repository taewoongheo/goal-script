import React, {useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {Pressable} from 'react-native-gesture-handler';
import {MaterialIcons, Feather} from '@expo/vector-icons';
import {useSelectedTask} from '@/app/_layout';
import {TaskItemProps} from './types';

export function TaskItem({
  item,
  index,
  style,
  linearTransitionAnimation,
  onUpdate,
  onLayout,
  setSelectedIdx,
  selectedIdx,
  listItemBottomSheetRef,
}: TaskItemProps) {
  const checkboxOpacity = useSharedValue(item.completed ? 1 : 0);
  const textOpacity = useSharedValue(item.completed ? 0.6 : 1);
  const {setSelectedTask} = useSelectedTask();

  const fadeInAnimation = useMemo(
    () =>
      FadeIn.duration(ANIMATION_DURATION.LIST_ITEM_ANIMATION.FADE_IN).delay(
        ANIMATION_DURATION.LIST_ITEM_ANIMATION.ITEM_ANIMATION_DELAY *
          (index + 1),
      ),
    [index],
  );

  const fadeOutAnimation = useMemo(() => FadeOut, []);

  const checkboxStyle = useAnimatedStyle(() => ({
    opacity: checkboxOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    textDecorationLine: checkboxOpacity.value > 0.5 ? 'line-through' : 'none',
  }));

  const isSelected = index === selectedIdx;

  const toggleComplete = () => {
    checkboxOpacity.value = withTiming(item.completed ? 0 : 1, {
      duration: ANIMATION_DURATION.TASK_STATUS.CHECKBOX_ANIMATION,
    });

    textOpacity.value = withTiming(item.completed ? 1 : 0.6, {
      duration: ANIMATION_DURATION.TASK_STATUS.CHECKBOX_ANIMATION,
    });

    onUpdate(item.id);
    setSelectedIdx(index);
  };

  const handleTextTap = () => {
    setSelectedIdx(index);
  };

  const handleOpenBottomSheet = () => {
    // 선택된 작업 설정
    setSelectedTask(item);
    // 바텀시트 열기
    listItemBottomSheetRef?.current?.expand();
  };

  return (
    <Animated.View
      layout={linearTransitionAnimation}
      entering={fadeInAnimation}
      exiting={fadeOutAnimation}
      onLayout={onLayout}
      style={styles.container}>
      <Pressable
        onPress={toggleComplete}
        style={[styles.checkboxContainer, {opacity: isSelected ? 1 : 0}]}>
        <View style={styles.checkbox}>
          <MaterialIcons
            name="check-box-outline-blank"
            size={20}
            color="black"
          />
          <Animated.View style={[styles.checkboxOverlay, checkboxStyle]}>
            <MaterialIcons name="check-box" size={20} color="black" />
          </Animated.View>
        </View>
      </Pressable>

      <View style={styles.contentContainer}>
        <Pressable style={styles.textContainer} onPress={handleTextTap}>
          <Animated.Text style={[style, textStyle]} numberOfLines={1}>
            {item.text}
          </Animated.Text>
        </Pressable>

        {isSelected && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleOpenBottomSheet}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Feather name="edit-2" size={14} color="#555" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    minHeight: 36,
  },
  checkboxContainer: {
    marginHorizontal: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    position: 'relative',
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxOverlay: {
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 6,
  },
  editButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    borderRadius: 14,
  },
});
