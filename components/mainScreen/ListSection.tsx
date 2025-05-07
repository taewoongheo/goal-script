import React, {useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {Pressable} from 'react-native-gesture-handler';

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
  const fadeOutItemAnimation = useMemo(() => FadeOut, []);

  return (
    <View>
      {/* Achieved 섹션 */}
      {achievedItems.length > 0 && (
        <Animated.View
          layout={linearTransitionAnimation}
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
              },
            ]}>
            {isAchievedExpanded && (
              <View>
                {achievedItems.map((el, i) => (
                  <Animated.Text
                    entering={FadeIn.duration(
                      ANIMATION_DURATION.LIST_ITEM_ANIMATION.FADE_IN,
                    ).delay(
                      ANIMATION_DURATION.LIST_ITEM_ANIMATION
                        .ITEM_ANIMATION_DELAY *
                        (i + 1),
                    )}
                    exiting={fadeOutItemAnimation}
                    key={`achieved-${el}-${i}`}
                    style={styles.dropdownItem}>
                    {el}
                  </Animated.Text>
                ))}
              </View>
            )}
          </Animated.View>

          <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
            {todoItems.length ? '들을 완료했고,' : '들을 완료했어요.'}
          </Animated.Text>
        </Animated.View>
      )}

      {/* Todos 섹션 */}
      {todoItems.length > 0 ? (
        <Animated.View
          layout={linearTransitionAnimation}
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
                    entering={FadeIn.duration(
                      ANIMATION_DURATION.LIST_ITEM_ANIMATION.FADE_IN,
                    ).delay(
                      ANIMATION_DURATION.LIST_ITEM_ANIMATION
                        .ITEM_ANIMATION_DELAY *
                        (i + 1),
                    )}
                    exiting={fadeOutItemAnimation}
                    key={`todos-${el}-${i}`}
                    style={styles.dropdownItem}>
                    {el}
                  </Animated.Text>
                ))}
              </View>
            )}
          </Animated.View>

          <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
            들이 남았어요.
          </Animated.Text>
        </Animated.View>
      ) : (
        <Pressable onPress={() => console.log('add todo')}>
          <Animated.Text
            layout={linearTransitionAnimation}
            style={[styles.text, styles.highlight]}>
            앞으로 할 일은 무엇인가요?
          </Animated.Text>
        </Pressable>
      )}
    </View>
  );
}
