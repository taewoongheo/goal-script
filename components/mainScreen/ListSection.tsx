import React, {useMemo} from 'react';
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
import {ANIMATION_DURATION, ITEM_ANIMATION_DELAY} from '@/constants/Animation';

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
  linearTransitionAnimation: any;
}

export function ListSection({
  achievedItems,
  todoItems,
  isAchievedExpanded,
  isTodosExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
}: ListSectionProps) {
  const linearDelayTransitionAnimation = useMemo(
    () => LinearTransition.delay(ANIMATION_DURATION.LINEAR_TRANSIION * 0.1),
    [],
  );

  const fadeOutItemAnimation = useMemo(() => FadeOut, []);

  return (
    <View>
      {/* Achieved 섹션 */}
      {achievedItems.length > 0 && (
        <Animated.View
          layout={
            isAchievedExpanded
              ? linearTransitionAnimation
              : linearDelayTransitionAnimation
          }
          style={styles.lineContainer}>
          <TouchableOpacity onPress={() => onToggle('achieved')}>
            <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
              {achievedItems[0]}
            </Text>
          </TouchableOpacity>

          <Animated.View
            layout={linearTransitionAnimation}
            style={[
              styles.dropdownContainer,
              {
                overflow: 'hidden',
                // backgroundColor: 'red',
              },
            ]}>
            {isAchievedExpanded && (
              <View>
                {achievedItems.map((el, i) => (
                  <Animated.Text
                    entering={FadeIn.delay(ITEM_ANIMATION_DELAY * (i + 1))}
                    exiting={fadeOutItemAnimation}
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
                ? linearTransitionAnimation
                : linearDelayTransitionAnimation
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
              ? linearTransitionAnimation
              : linearDelayTransitionAnimation
          }
          style={styles.lineContainer}>
          <TouchableOpacity onPress={() => onToggle('todos')}>
            <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
              {todoItems[0]}
            </Text>
          </TouchableOpacity>

          <Animated.View
            layout={linearTransitionAnimation}
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
                    entering={FadeIn.delay(ITEM_ANIMATION_DELAY * (i + 1))}
                    exiting={fadeOutItemAnimation}
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
                ? linearTransitionAnimation
                : linearDelayTransitionAnimation
            }
            style={styles.text}>
            들이 남았어요.
          </Animated.Text>
        </Animated.View>
      )}
    </View>
  );
}
