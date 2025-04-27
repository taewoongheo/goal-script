import React, {useState} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand';
import Animated, {
  FadeIn,
  LinearTransition,
  SlideInLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
  const [parsedLines, setParsedLines] = useState<ParsedLines | null>(null);

  console.log(parsedLines);

  // 파싱하는거 끝남, 이제
  // type 별로 렌더링해서 애니메이션 적용
  // 각 문자열들을 별도의 View 만든 뒤, row 로 문자열처럼 연결해야 됨
  // 타입별 구현 전략
  //  type=noWrap
  //    {rDay} 의 width 를 0 으로, "남았어요" 는 그대로 렌더링
  //    확장 시 {rDay} 의 width 를 단순히 늘리면 됨
  //  type=rDayWrap
  //    마지막에서 두 번째 라인의 잘린 날짜부분의 width=0, 마지막 라인의 "남었어요" 부분만 렌더링("리펙토링 후 남았어요 텍스트는 직접 렌더링")
  // \        ******"남았어요" 부분 아예 빼기 => 리펙토링부터 시작하기
  //    확장 시 두 번째 라인의 잘린 날짜부분의 width=100으로 늘림, 마지막 라인의 잘린 날짜에 delay 후 늘림
  //  type=strWrap
  //    마지막에서 두 번째 라인의 날짜부분 width=0, "남았어요" 직접 렌더링
  //    확장 시 두 번째 라인의 날짜부분 width=100 으로 늘리기, "남았어요"도 그대로 옆으로 밀기, 이때 overflow: hideen으로 기리기
  //    마지막 라인의 "남았어요"는 delay 이후 잘린부분부터 렌더링될 것임

  return (
    <View style={styles.lineContainer}>
      <View>
        {parsedLines?.lines.map((line, idx) => {
          // Touchable한 dDay 버튼이 라인에 포함된 경우
          const tokens = line.split(' ');
          const isTouchableDDayToken = tokens.some(el =>
            el.includes(`D-${dDay}`),
          );
          let parsedTokens: [string, boolean, number][] = [];
          if (isTouchableDDayToken)
            parsedTokens = tokens.map((element, index) => {
              if (element === `D-${dDay}`) return [element, true, index];
              return [element, false, index];
            });

          if (idx === parsedLines.lines.length - 1) {
            return (
              <View
                key={line.toString()}
                style={{flexDirection: 'row', backgroundColor: 'red'}}>
                <View style={{flexDirection: 'row'}}>
                  {isTouchableDDayToken ? (
                    parsedTokens.map(el =>
                      el[1] ? (
                        <TouchableOpacity
                          key={el[2]}
                          onPress={() => onToggleDday('dday')}>
                          <Text style={styles.text}>{el[0]}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text key={el[2]} style={styles.text}>
                          {el[0]}
                        </Text>
                      ),
                    )
                  ) : (
                    <Text style={styles.text}>{line}</Text>
                  )}
                </View>

                <Animated.View
                  style={{backgroundColor: 'red'}}
                  layout={LinearTransition.duration(100)}>
                  {isDdayExpanded ? (
                    <Animated.Text
                      entering={FadeIn.duration(1000)}
                      style={styles.text}>
                      {' '}
                      {rDay}
                    </Animated.Text>
                  ) : null}
                </Animated.View>
                <Animated.View
                  layout={LinearTransition.springify().duration(1000)}>
                  <Text style={styles.text}> 남았어요</Text>
                </Animated.View>
              </View>
            );
          }

          return (
            <View key={line.toString()} style={{backgroundColor: 'blue'}}>
              <View style={{flexDirection: 'row'}}>
                {isTouchableDDayToken ? (
                  parsedTokens.map(el =>
                    el[1] ? (
                      <TouchableOpacity
                        key={el[2]}
                        onPress={() => onToggleDday('dday')}>
                        <Text style={styles.text}>{el[0]} </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text key={el[2]} style={styles.text}>
                        {el[0]}{' '}
                      </Text>
                    ),
                  )
                ) : (
                  <Text style={styles.text}>{line}</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

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
          const parsedTexts = parseLine(texts, rDay);
          setParsedLines(parsedTexts);
        }}>
        {goal}까지 D-{dDay} {formatRDay(rDay)} 남았어요
      </Text>
    </View>
  );
}
