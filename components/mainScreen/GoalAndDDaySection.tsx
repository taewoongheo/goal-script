import React from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand';

interface GoalAndDDaySectionProps {
  goal: string;
  dDay: number;
  rDay: string;
  isDdayExpanded: boolean;
  onToggleDday: (key: ToggleKey) => void;
  styles: {
    lineContainer: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    highlight: StyleProp<TextStyle>;
  };
}

export function GoalAndDDaySection({
  goal,
  dDay,
  rDay,
  isDdayExpanded,
  onToggleDday,
  styles,
}: GoalAndDDaySectionProps) {
  return (
    <View style={styles.lineContainer}>
      <Text style={styles.text}>
        <Text style={styles.highlight}>{goal}</Text>
        <Text>까지 </Text>
        <Text onPress={() => onToggleDday('dday')} style={styles.highlight}>
          D-{dDay}
        </Text>
        {isDdayExpanded ? (
          <Text style={styles.highlight}> ({rDay})</Text>
        ) : null}
        <Text> 남았어요.</Text>
      </Text>
    </View>
  );
}
