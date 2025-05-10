import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {
  Pressable,
  LongPressGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';
import {useBottomSheet} from '@/contexts/BottomSheetContext';
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
}: TaskItemProps) {
  const checkboxOpacity = useSharedValue(item.completed ? 1 : 0);
  const textOpacity = useSharedValue(item.completed ? 0.6 : 1);
  const {listItemBottomSheetRef} = useBottomSheet();
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

  const handleLongPress = () => {
    setSelectedTask(item);
    setSelectedIdx(index);
    listItemBottomSheetRef.current?.expand();
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

      <LongPressGestureHandler
        minDurationMs={800}
        onHandlerStateChange={({nativeEvent}) => {
          if (nativeEvent.state === State.ACTIVE) {
            handleLongPress();
          }
        }}>
        <TapGestureHandler
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.END) {
              handleTextTap();
            }
          }}>
          <Animated.View style={styles.textContainer}>
            <Animated.Text style={[style, textStyle]} numberOfLines={1}>
              {item.text}
            </Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </LongPressGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
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
  textContainer: {
    flex: 1,
  },
});
