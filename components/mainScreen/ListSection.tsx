import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import {ToggleKey} from '@/hooks/useToggleExpand';

export interface ListSectionProps {
  achievedItems: string[];
  todoItems: string[];
  isAchievedExpanded: boolean;
  isTodosExpanded: boolean;
  onToggle: (_key: ToggleKey) => void;
  styles: {
    lineContainer: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    highlight: StyleProp<TextStyle>;
    dropdownContainer: StyleProp<ViewStyle>;
    dropdownItem: StyleProp<TextStyle>;
  };
}

export function ListSection({
  achievedItems,
  todoItems,
  isAchievedExpanded,
  isTodosExpanded,
  onToggle,
  styles,
}: ListSectionProps) {
  return (
    <View>
      {/* Achieved 섹션 */}
      {achievedItems.length > 0 && (
        <Animated.View
          layout={
            isAchievedExpanded
              ? LinearTransition.springify().duration(1000)
              : LinearTransition.springify().delay(1000)
          }
          style={styles.lineContainer}>
          <TouchableOpacity onPress={() => onToggle('achieved')}>
            <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
              {achievedItems[0]}
            </Text>
          </TouchableOpacity>

          <Animated.View
            layout={LinearTransition.duration(500)}
            style={[
              styles.dropdownContainer,
              {
                overflow: 'hidden',
              },
            ]}>
            {isAchievedExpanded && (
              <View>
                {achievedItems.map((el, i) => (
                  <Animated.Text
                    entering={FadeIn.springify().delay(100 * (i + 1))}
                    exiting={FadeOut.springify().delay(
                      100 * (achievedItems.length - (i + 1)),
                    )}
                    key={`achieved-${el}-${i}`}
                    style={styles.dropdownItem}>
                    {el}
                  </Animated.Text>
                ))}
              </View>
            )}
          </Animated.View>

          <Animated.Text
            layout={
              isAchievedExpanded
                ? LinearTransition.springify().duration(1000)
                : LinearTransition.springify().delay(1000)
            }
            style={styles.text}>
            들을 완료했고,
          </Animated.Text>
        </Animated.View>
      )}

      {/* Todos 섹션 */}
      {todoItems.length > 0 && (
        <Animated.View
          layout={
            isAchievedExpanded
              ? LinearTransition.springify().duration(1000)
              : LinearTransition.springify().delay(1000)
          }
          style={styles.lineContainer}>
          <TouchableOpacity onPress={() => onToggle('todos')}>
            <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
              {todoItems[0]}
            </Text>
          </TouchableOpacity>

          <Animated.View
            layout={LinearTransition.duration(500)}
            style={[
              styles.dropdownContainer,
              {
                overflow: 'hidden',
              },
            ]}>
            {isTodosExpanded && (
              <View>
                {todoItems.map((el, i) => (
                  <Animated.Text
                    entering={FadeIn.springify().delay(100 * (i + 1))}
                    exiting={FadeOut.springify().delay(
                      100 * (achievedItems.length - (i + 1)),
                    )}
                    key={`todos-${el}-${i}`}
                    style={styles.dropdownItem}>
                    {el}
                  </Animated.Text>
                ))}
              </View>
            )}
          </Animated.View>

          <Animated.Text
            layout={
              isAchievedExpanded || isTodosExpanded
                ? LinearTransition.springify().duration(1000)
                : LinearTransition.springify().delay(1000)
            }
            style={styles.text}>
            들이 남았어요.
          </Animated.Text>
        </Animated.View>
      )}
    </View>
  );
}
