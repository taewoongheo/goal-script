import React, {useMemo} from 'react';
import {LayoutChangeEvent, StyleProp, TextStyle, View} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {Pressable} from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';
import {TaskItem} from '@/hooks/useGoalData';

interface AchievedItemProps {
  item: TaskItem;
  index: number;
  style: StyleProp<TextStyle>;
  linearTransitionAnimation: any;
  onUpdate: (taskId: string) => void;
  onLayout: (event: LayoutChangeEvent) => void;
  setSelectedIdx: (idx: number) => void;
  selectedIdx: number;
}

export function AchievedItem({
  item,
  index,
  style,
  linearTransitionAnimation,
  onUpdate,
  onLayout,
  setSelectedIdx,
  selectedIdx,
}: AchievedItemProps) {
  const checkboxOpacity = useSharedValue(item.completed ? 1 : 0);
  const textOpacity = useSharedValue(item.completed ? 0.6 : 1);

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

  return (
    <Animated.View
      layout={linearTransitionAnimation}
      entering={fadeInAnimation}
      exiting={fadeOutAnimation}
      onLayout={onLayout}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 3,
      }}>
      <Pressable
        onPress={toggleComplete}
        style={{
          marginHorizontal: 6,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          opacity: isSelected ? 1 : 0,
        }}>
        <View
          style={{
            position: 'relative',
            width: 26,
            height: 26,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="check-box-outline-blank"
            size={20}
            color="black"
          />
          <Animated.View style={[{position: 'absolute'}, checkboxStyle]}>
            <MaterialIcons name="check-box" size={20} color="black" />
          </Animated.View>
        </View>
      </Pressable>
      <Pressable style={{flex: 1}} onPress={() => setSelectedIdx(index)}>
        <Animated.Text style={[style, textStyle]} numberOfLines={1}>
          {item.text}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}
