import React, {useMemo} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {ANIMATION_DURATION} from '@/constants/Animation';

interface AchievedItemProps {
  item: string;
  index: number;
  style: StyleProp<TextStyle>;
}

export function AchievedItem({item, index, style}: AchievedItemProps) {
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
    <Animated.Text
      entering={fadeInAnimation}
      exiting={fadeOutAnimation}
      style={style}>
      {item}
    </Animated.Text>
  );
}
