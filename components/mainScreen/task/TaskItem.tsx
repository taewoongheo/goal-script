import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import {Pressable} from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {useSelectedTask} from '@/app/_layout';
import {Theme} from '@/constants/Theme';
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
  const checkboxOpacity = useSharedValue(item.isCompleted ? 1 : 0);
  const textOpacity = useSharedValue(item.isCompleted ? 0.6 : 1);
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
    checkboxOpacity.value = withTiming(item.isCompleted ? 0 : 1, {
      duration: ANIMATION_DURATION.TASK_STATUS.CHECKBOX_ANIMATION,
    });

    textOpacity.value = withTiming(item.isCompleted ? 1 : 0.6, {
      duration: ANIMATION_DURATION.TASK_STATUS.CHECKBOX_ANIMATION,
    });

    onUpdate(item.id);
    setSelectedIdx(index);
  };

  const handleTextTap = () => {
    setSelectedIdx(index);
  };

  const handleOpenBottomSheet = () => {
    setSelectedTask(item);
    listItemBottomSheetRef?.current?.expand();
  };

  return (
    <Animated.View
      layout={linearTransitionAnimation}
      entering={fadeInAnimation}
      exiting={fadeOutAnimation}
      onLayout={onLayout}
      style={styles.container}>
      <View style={[styles.contentContainer]}>
        <Pressable
          onPress={toggleComplete}
          style={[styles.checkboxContainer, {opacity: isSelected ? 1 : 0}]}>
          <View style={styles.checkbox}>
            <MaterialIcons
              name="check-box-outline-blank"
              size={Theme.iconSize.small}
              color={Theme.colors.highlight}
            />
            <Animated.View style={[styles.checkboxOverlay, checkboxStyle]}>
              <MaterialIcons
                name="check-box"
                size={Theme.iconSize.small}
                color={Theme.colors.highlight}
              />
            </Animated.View>
          </View>
        </Pressable>

        <Pressable
          style={[
            {marginHorizontal: Theme.iconSpace.medium},
            styles.textContainer,
          ]}
          onPress={handleTextTap}>
          <Animated.Text style={[style, textStyle]} numberOfLines={1}>
            {item.text}
          </Animated.Text>
        </Pressable>

        {isSelected && (
          <Pressable
            style={[styles.editButton]}
            onPress={handleOpenBottomSheet}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <MaterialIcons
              name="edit"
              size={Theme.iconSize.small + scale(2)}
              color={Theme.colors.highlight}
            />
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    position: 'relative',
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
  editButton: {},
});
