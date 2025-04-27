import React from 'react';
import {View, Text, StyleProp, TextStyle} from 'react-native';
import Animated, {FadeIn, LinearTransition} from 'react-native-reanimated';
import TouchableLineRenderer from './TouchableLineRenderer';

interface NoWrapLineProps {
  line: string;
  idx: number;
  dDay: number;
  rDay: string;
  isDdayExpanded: boolean;
  onToggleDday: (key: ToggleKey) => void;
  styles: {
    text: StyleProp<TextStyle>;
    // Add other styles if needed, e.g., highlight
  };
}

function NoWrapLine({
  line,
  idx,
  dDay,
  rDay,
  isDdayExpanded,
  onToggleDday,
  styles,
}: NoWrapLineProps) {
  return (
    <View
      key={`${line}-${idx}`}
      style={{
        flexDirection: 'row',
        backgroundColor: 'red',
        flexWrap: 'wrap',
        alignItems: 'baseline',
      }}>
      <TouchableLineRenderer
        line={line}
        dDay={dDay}
        onToggleDday={onToggleDday}
        textStyle={styles.text}
      />

      {/* Animated rDay */}
      <Animated.View layout={LinearTransition.duration(100)}>
        {isDdayExpanded ? (
          <Animated.Text entering={FadeIn.duration(1000)} style={styles.text}>
            {rDay}{' '}
          </Animated.Text>
        ) : null}
      </Animated.View>

      <Animated.View layout={LinearTransition.springify().duration(1000)}>
        <Text style={styles.text}>남았어요</Text>
      </Animated.View>
    </View>
  );
}

export default NoWrapLine;
