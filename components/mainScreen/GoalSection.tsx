import React, {useState} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {Pressable} from 'react-native-gesture-handler';
import Animated, {
  EntryAnimationsValues,
  FadeIn,
  LinearTransition,
  withSpring,
} from 'react-native-reanimated';
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

  console.log(lines);

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
      {lines?.map((line, idx) => {
        return (
          <View key={`${line + idx}`}>
            <Text style={styles.text}>{line}</Text>
          </View>
        );
      })}

      {/* hidden */}
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
          const linesText: string[] = [];
          e.nativeEvent.lines.map(el => linesText.push(el.text));
          setLines(linesText);
        }}>
        {goal}까지
      </Text>
    </View>
  );
}
