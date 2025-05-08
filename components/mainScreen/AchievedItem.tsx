import React, {useMemo} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {Pressable} from 'react-native-gesture-handler';

interface AchievedItemProps {
  item: string;
  index: number;
  style: StyleProp<TextStyle>;
  setSelectedAchievedItem: ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => void;
}

export function AchievedItem({
  item,
  index,
  style,
  setSelectedAchievedItem,
}: AchievedItemProps) {
  const fadeInAnimation = useMemo(
    () =>
      FadeIn.duration(ANIMATION_DURATION.LIST_ITEM_ANIMATION.FADE_IN).delay(
        ANIMATION_DURATION.LIST_ITEM_ANIMATION.ITEM_ANIMATION_DELAY *
          (index + 1),
      ),
    [index],
  );

  const fadeOutAnimation = useMemo(() => FadeOut, []);

  return (
    <Pressable
      onPress={() => setSelectedAchievedItem({item, index})}
      style={{marginVertical: 3, marginHorizontal: 8, paddingHorizontal: 12}}>
      <Animated.Text
        entering={fadeInAnimation}
        exiting={fadeOutAnimation}
        style={[style, {paddingVertical: 4}]}>
        {item}
      </Animated.Text>
    </Pressable>
  );
}
