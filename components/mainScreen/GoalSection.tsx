import React, {useState, useEffect} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import Animated, {
  EntryAnimationsValues,
  FadeIn,
  LinearTransition,
  withSpring,
} from 'react-native-reanimated';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {Layout} from '@/constants/Layout';
import {getViewportWidth} from '@/utils/viewport';

interface GoalSectionProps {
  goal: string;
  isGoalExpanded: boolean;
  onToggleGoal: (_key: ToggleKey) => void;
  styles: {
    lineContainer: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    highlight: StyleProp<TextStyle>;
  };
}

export function GoalSection({
  goal,
  isGoalExpanded,
  onToggleGoal,
  styles,
}: GoalSectionProps) {
  const [lines, setLines] = useState<string[] | null>(null);

  useEffect(() => {
    setLines(null);
  }, [goal]);

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
      {lines === null && (
        <Text
          style={[
            styles.text,
            {
              position: 'absolute',
              width: getViewportWidth() * Layout.padding.horizontal,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0,
              zIndex: -1,
            },
          ]}
          onTextLayout={e => {
            const texts = e.nativeEvent.lines.map(l => l.text);
            setLines(parseLines(texts));
          }}>
          {goal}까지
        </Text>
      )}

      {lines?.map((line, idx) => {
        if (idx === lines.length - 1) {
          return (
            <Text key={`${line}-${idx}`} style={styles.text}>
              <Text style={styles.text}>{line}</Text>
              <Text>까지</Text>
            </Text>
          );
        }

        return (
          <Pressable key={`${line}-${idx}`} style={[styles.lineContainer]}>
            <Text style={styles.text}>{line}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function parseLines(lines: string[]): string[] {
  const trimLines = lines.map(el => el.trim());
  const len = trimLines.length;
  const lastLine = trimLines[len - 1];

  if (lastLine === '지') {
    trimLines[len - 2] = trimLines[len - 2].substring(
      0,
      trimLines[len - 2].length - 1,
    );
    trimLines[len - 1] = '';
  } else {
    trimLines[len - 1] = lastLine.substring(0, lastLine.length - 2);
  }

  return trimLines;
}
