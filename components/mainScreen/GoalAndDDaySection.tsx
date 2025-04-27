import React, {useState} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Layout} from '@/constants/Layout';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  formatRDay,
  ParsedLines,
  parseLine,
  tokenizeLineWithDday,
} from './utils/utils';
import NoWrapLine from './ui/NoWrapLine';
import TouchableLineRenderer from './ui/TouchableLineRenderer';

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

  // const [lineWidth, setLineWidth] = useState<number>(0);
  // console.log(lineWidth);

  return (
    <View style={[styles.lineContainer]}>
      {/* --- Conditional Rendering Based on Type --- */}
      {parsedLines?.type === 'noWrap' && (
        <NoWrapLine
          lines={parsedLines.lines}
          dDay={dDay}
          rDay={rDay}
          isDdayExpanded={isDdayExpanded}
          onToggleDday={onToggleDday}
          styles={styles}
        />
      )}

      {parsedLines?.type === 'rDayWrap' && (
        <View>
          {parsedLines.lines.map((line, idx) => {
            // D-37 만 터치할 수 있도록 분리
            // "2025." 을 lines.length - 2(마지막에서 두 번째)에서 애니메이션으로 나오도록 수정
            //  "2025." 가 숨겨져 있을 때는 "남았어요" 를 렌더링, 이때 hidden 으로 넘치는 부분은 보이지 않도록 하기
            // 마지막 줄에선 "05.30" 이 애니메이션 되도록 처리, 이때 "남았어요" 부분이 먼저 등장해야 됨

            const firstDateToken = parsedLines.lines[
              parsedLines.lines.length - 2
            ]
              .split(' ')
              .pop();
            const secondDateToekn = parsedLines.lines[
              parsedLines.lines.length - 1
            ]
              .split(' ')
              .pop();

            if (idx === parsedLines.lines.length - 2) {
              const lineArr = line.split(' ');
              lineArr.pop();
              const removedLastTokenLine = lineArr.join(' ');
              return (
                <View
                  key={`${line}-${idx}`}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'red',
                    flexWrap: 'nowrap',
                    alignItems: 'baseline',
                  }}>
                  <TouchableLineRenderer
                    dDay={dDay}
                    onToggleDday={onToggleDday}
                    textStyle={styles.text}
                    line={removedLastTokenLine}
                  />

                  <View
                    style={{
                      overflow: 'hidden',
                      backgroundColor: 'red',
                    }}>
                    {isDdayExpanded ? (
                      <Animated.View>
                        <Text style={styles.text}>{firstDateToken}</Text>
                      </Animated.View>
                    ) : (
                      <Text style={styles.text}>남았어요</Text>
                    )}
                  </View>
                </View>
              );
            }

            if (idx === parsedLines.lines.length - 1 && isDdayExpanded) {
              return (
                <View style={{backgroundColor: 'green'}} key={`${line}-${idx}`}>
                  <Text style={styles.text}>{secondDateToekn} 남았어요</Text>
                </View>
              );
            }

            if (idx <= parsedLines.lines.length - 3) {
              return (
                <View key={`${line}-${idx}`} style={{backgroundColor: 'blue'}}>
                  <Text style={styles.text}>{line}</Text>
                </View>
              );
            }
          })}
        </View>
      )}

      {/* Placeholder for strWrap */}
      {parsedLines?.type === 'strWrap' && (
        <View>
          {/* Replace with <StrWrapLine ... /> when created */}
          {parsedLines.lines.map((line, idx) => (
            <Text key={idx} style={styles.text}>
              {line} (strWrap Placeholder)
            </Text>
          ))}
        </View>
      )}
      {/* --- End Conditional Rendering --- */}

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
          if (!parsedLines) {
            const texts = e.nativeEvent.lines.map(el => el.text);
            const parsedResult = parseLine(texts, rDay);

            // if (e.nativeEvent.lines[e.nativeEvent.lines.length - 2])
            //   setLineWidth(
            //     e.nativeEvent.lines[e.nativeEvent.lines.length - 2].width +
            //       Layout.padding.horizontal +
            //       50,
            //   );
            setParsedLines(parsedResult);
          }
        }}>
        {goal}까지 D-{dDay} {formatRDay(rDay)} 남았어요
      </Text>
    </View>
  );
}
