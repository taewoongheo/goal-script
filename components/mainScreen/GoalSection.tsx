import React, {useState} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand'; // Import ToggleKey
import {Pressable} from 'react-native-gesture-handler';
import Animated, {
  EntryAnimationsValues,
  FadeIn,
  LinearTransition,
  withSpring,
} from 'react-native-reanimated';

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
        if (idx === lines.length - 1) {
          const lineArr = line.split(' ');
          lineArr.pop();

          return (
            <View style={{flexDirection: 'row'}} key={`${line}-${idx}`}>
              <Pressable onPress={() => onToggleGoal('goal')}>
                <Text style={styles.text}>{lineArr}</Text>
              </Pressable>
              {isGoalExpanded ? (
                <Animated.View
                  entering={expandWidth}
                  style={{
                    overflow: 'hidden',
                  }}>
                  <Animated.Text
                    entering={FadeIn.duration(400)}
                    style={styles.text}>
                    ⚙️
                  </Animated.Text>
                </Animated.View>
              ) : null}
              <Animated.Text
                layout={LinearTransition.springify().duration(1000)}
                style={styles.text}>
                까지
              </Animated.Text>
            </View>
          );
        }

        return (
          <Pressable
            onPress={() => onToggleGoal('goal')}
            style={{flexDirection: 'row'}}
            key={`${line}-${idx}`}>
            <Text style={styles.text}>{line}</Text>
          </Pressable>
        );
      })}

      {/* hidden */}
      <Text
        style={[
          styles.text,
          {
            position: 'absolute',
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
        {goal} 까지
      </Text>
    </View>
  );
}
