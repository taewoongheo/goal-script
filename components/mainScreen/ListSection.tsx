import React, {useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated, {FadeOut} from 'react-native-reanimated';
import {Pressable} from 'react-native-gesture-handler';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {AchievedItem} from './AchievedItem';
import {TodoItem} from './TodoItem';

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
                {achievedItems.map((item, index) => (
                  <AchievedItem
                    key={`achieved-${item}-${index}`}
                    item={item}
                    index={index}
                    style={styles.dropdownItem}
                  />
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
                {todoItems.map((item, index) => (
                  <TodoItem
                    key={`todos-${item}-${index}`}
                    item={item}
                    index={index}
                    style={styles.dropdownItem}
                  />
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
