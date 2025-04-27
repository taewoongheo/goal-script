import React from 'react';
import {View, Text, StyleProp, TextStyle} from 'react-native';
import Animated, {FadeIn, LinearTransition} from 'react-native-reanimated';
import {ToggleKey} from '@/hooks/useToggleExpand'; // Assuming path
import TouchableLineRenderer from './TouchableLineRenderer'; // Assuming path

interface NoWrapLineProps {
  lines: string[]; // Accept the full array of lines
  dDay: number;
  rDay: string;
  isDdayExpanded: boolean;
  onToggleDday: (_key: ToggleKey) => void;
  styles: {
    text: StyleProp<TextStyle>;
    // Add other styles if needed
  };
}

function NoWrapLine({
  lines,
  dDay,
  rDay,
  isDdayExpanded,
  onToggleDday,
  styles,
}: NoWrapLineProps) {
  return (
    <>
      {lines.map((line, idx) => {
        // --- Last Line Rendering (Red Background) ---
        if (idx === lines.length - 1) {
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
                  <Animated.Text
                    entering={FadeIn.duration(1000)}
                    style={styles.text}>
                    {' '}
                    {rDay}
                  </Animated.Text>
                ) : null}
              </Animated.View>

              {/* Animated "남았어요" */}
              <Animated.View
                layout={LinearTransition.springify().duration(1000)}>
                <Text style={styles.text}> 남았어요</Text>
              </Animated.View>
            </View>
          );
        }

        return (
          <View key={`${line}-${idx}`} style={{backgroundColor: 'blue'}}>
            <TouchableLineRenderer
              line={line}
              dDay={dDay}
              onToggleDday={onToggleDday}
              textStyle={styles.text}
            />
          </View>
        );
      })}
    </>
  );
}

export default NoWrapLine;
