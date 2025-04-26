import React, {useState} from 'react';
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

interface ParsedLines {
  type: 'noWrap' | 'rDayWrap' | 'strWrap';
  lines: string[];
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

function formatRDay(date: string): string {
  return date.replace(/\./g, '.\u200B');
}

function parseLine(texts: string[], rDay: string): ParsedLines {
  let lines: string[] = [...texts];

  const SUFFIX = '남았어요';

  let type: 'noWrap' | 'strWrap' | 'rDayWrap' | null = null;
  if (
    lines.at(-1)?.includes(SUFFIX) &&
    lines.at(-1)?.includes(formatRDay(rDay))
  )
    type = 'noWrap';
  else if (
    !lines.at(-1)?.includes(SUFFIX) &&
    lines.at(-2)?.includes(formatRDay(rDay))
  )
    type = 'strWrap';
  else type = 'rDayWrap';

  if (type === 'strWrap') {
    const sec = lines[lines.length - 2].split(' ');
    sec.pop();
    lines[lines.length - 2] = sec.join(' ');
  } else if (type === 'noWrap') {
    const last = lines[lines.length - 1].split(' ');
    last.pop();
    last.pop();
    lines[lines.length - 1] = last.join(' ');
  }

  lines = lines.map(el => el.trim());

  return {
    type,
    lines,
  };
}
