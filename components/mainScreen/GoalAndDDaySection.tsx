import React, {useState} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {formatRDay, ParsedLines, parseLine} from './utils/utils'; // Assuming utils file exists
import TouchableLineRenderer from './ui/TouchableLineRenderer';
import NoWrapLine from './ui/NoWrapLine'; // Make sure path is correct

interface GoalAndDDaySectionProps {
  goal: string;
  dDay: number;
  rDay: string;
  isDdayExpanded: boolean;
  onToggleDday: (_key: ToggleKey) => void;
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
  const [parsedLines, setParsedLines] = useState<ParsedLines | null>(null);

  console.log(parsedLines);

  return (
    <View style={styles.lineContainer}>
      <View>
        {parsedLines?.lines.map((line, idx) => {
          // --- Last Line Rendering ---
          if (idx === parsedLines.lines.length - 1) {
            if (parsedLines.type === 'noWrap') {
              return (
                <NoWrapLine
                  key={`${line}-${idx}`}
                  line={line}
                  idx={idx}
                  dDay={dDay}
                  rDay={rDay}
                  isDdayExpanded={isDdayExpanded}
                  onToggleDday={onToggleDday}
                  styles={styles}
                />
              );
            }
          }

          // --- Non-Last Line Rendering ---
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
      </View>

      {/* Hidden Text for onTextLayout (Keep as is) */}
      <Text
        style={[
          styles.text,
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            opacity: 0,
            zIndex: -1,
          },
        ]}
        onTextLayout={e => {
          const texts = e.nativeEvent.lines.map(el => el.text);
          const parsedResult = parseLine(texts, rDay);
          setParsedLines(parsedResult);
        }}>
        {goal}까지 D-{dDay} {formatRDay(rDay)} 남았어요
      </Text>
    </View>
  );
}
