import React, {useMemo} from 'react';
import {StyleProp, Text, TextStyle, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {Pressable} from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';

interface AchievedItemProps {
  item: {
    text: string;
    completed: boolean;
  };
  index: number;
  style: StyleProp<TextStyle>;
  onUpdate: (index: number, completed: boolean) => void;
}

export function AchievedItem({
  item,
  index,
  style,
  onUpdate,
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

  const toggleComplete = () => {
    onUpdate(index, !item.completed);
  };

  return (
    <Animated.View
      entering={fadeInAnimation}
      exiting={fadeOutAnimation}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={toggleComplete}
        style={{
          marginVertical: 3,
          marginHorizontal: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialIcons
          name={item.completed ? 'check-box' : 'check-box-outline-blank'}
          size={20}
          color="black"
          style={{marginRight: 6}}
        />
        <Text
          style={[
            style,
            {
              paddingVertical: 4,
              textDecorationLine: item.completed ? 'line-through' : 'none',
              opacity: item.completed ? 0.6 : 1,
            },
          ]}>
          {item.text}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
