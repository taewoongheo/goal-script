import React, {useState} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {formatRDay, ParsedLines, parseLine} from './utils/utils';

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
  const [lines, setLines] = useState<ParsedLines | null>(null);

  return (
    <View style={styles.lineContainer}>
      {/* Hidden Text for onTextLayout */}
      <Text
        style={[
          styles.text,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            opacity: 0,
          },
        ]}
        onTextLayout={e => {
          const texts = e.nativeEvent.lines.map(el => el.text);
          const parsedLines = parseLine(texts, rDay);
          setLines(parsedLines);
        }}>
        {goal}까지 D-{dDay} {formatRDay(rDay)} 남았어요
      </Text>
    </View>
  );
}
