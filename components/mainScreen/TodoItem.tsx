import React, {useMemo} from 'react';
import {StyleProp, TextStyle, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {Pressable} from 'react-native-gesture-handler';
import {MaterialIcons} from '@expo/vector-icons';

interface TodoItemProps {
  item: string;
  index: number;
  style: StyleProp<TextStyle>;
  selectedTodoItem: {item: string; index: number} | null;
  setSelectedTodoItem: ({item, index}: {item: string; index: number}) => void;
}

export function TodoItem({
  item,
  index,
  style,
  selectedTodoItem,
  setSelectedTodoItem,
}: TodoItemProps) {
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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => setSelectedTodoItem({item, index})}
        style={{
          marginVertical: 3,
          marginHorizontal: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialIcons
          name="check-box-outline-blank"
          size={20}
          color="black"
          style={{marginRight: 6}}
          opacity={selectedTodoItem?.item === item ? 1 : 0}
        />
        <Animated.Text
          entering={fadeInAnimation}
          exiting={fadeOutAnimation}
          style={[style, {paddingVertical: 4}]}>
          {item}
        </Animated.Text>
      </Pressable>
    </View>
  );
}
