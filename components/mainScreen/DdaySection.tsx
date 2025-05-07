import React from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
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
  linearTransitionAnimation: any;
  fadeInAnimation: any;
  fadeOutAnimation: any;
}

export function DdaySection({
  dDay,
  rDay,
  isDdayExpanded,
  onToggleDday,
  styles,
  linearTransitionAnimation,
  fadeInAnimation,
  fadeOutAnimation,
}: DdaySectionProps) {
  return (
    <View style={styles.lineContainer}>
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => onToggleDday('dday')}>
          <Text style={[styles.text, styles.highlight]}>📅D-{dDay} </Text>
        </Pressable>
        <Animated.View
          style={{overflow: 'hidden'}}
          layout={linearTransitionAnimation}>
          {isDdayExpanded && (
            <Animated.Text
              entering={fadeInAnimation}
              exiting={fadeOutAnimation}
              style={[styles.text, styles.highlight]}>
              {rDay}{' '}
            </Animated.Text>
          )}
        </Animated.View>
        <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
          남았어요
        </Animated.Text>
      </View>
    </View>
  );
}
