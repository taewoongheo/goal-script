import React from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand'; // Import ToggleKey

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
  return (
    <View style={styles.lineContainer}>
      <Text style={styles.text}>{goal} 까지</Text>
    </View>
  );
}
