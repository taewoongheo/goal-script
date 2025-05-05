import React from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import Animated, {
  EntryAnimationsValues,
  FadeIn,
  LinearTransition,
  withSpring,
} from 'react-native-reanimated';
import {ToggleKey} from '@/hooks/useToggleExpand';

interface DdaySectionProps {
  dDay: number;
  rDay: string;
  isDdayExpanded: boolean;
  onToggleDday: (_key: ToggleKey) => void;
  styles: {
    lineContainer: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    highlight: StyleProp<TextStyle>;
  };
}

export function DdaySection({
  dDay,
  rDay,
  isDdayExpanded,
  onToggleDday,
  styles,
}: DdaySectionProps) {
  const expandWidth = (values: EntryAnimationsValues) => {
    'worklet';

    const finalW = values.targetWidth;

    return {
      initialValues: {width: 0},
      animations: {
        width: withSpring(finalW, {duration: 1000}),
      },
    };
  };

  return (
    <View style={styles.lineContainer}>
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => onToggleDday('dday')}>
          <Text style={styles.text}>📅D-{dDay} </Text>
        </Pressable>
        {isDdayExpanded ? (
          <Animated.View
            entering={expandWidth}
            style={{
              overflow: 'hidden',
            }}>
            <Animated.Text entering={FadeIn.duration(400)} style={styles.text}>
              {rDay}{' '}
            </Animated.Text>
          </Animated.View>
        ) : null}
        <Animated.Text
          layout={LinearTransition.springify().duration(1000)}
          style={styles.text}>
          남았어요
        </Animated.Text>
      </View>
    </View>
  );
}
