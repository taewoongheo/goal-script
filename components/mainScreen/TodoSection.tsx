import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {Pressable} from 'react-native-gesture-handler';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {TaskItem} from '@/hooks/useGoalData';
import {TodoItem} from './TodoItem';

interface TodoSectionProps {
  todoItems: TaskItem[];
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
  onUpdateItem: (taskId: string) => void;
}

export function TodoSection({
  todoItems,
  isTodosExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  onUpdateItem,
}: TodoSectionProps) {
  if (todoItems.length === 0) {
    return (
      <Pressable onPress={() => console.log('add todo')}>
        <Animated.Text
          layout={linearTransitionAnimation}
          style={[styles.text, styles.highlight]}>
          앞으로 할 일은 무엇인가요?
        </Animated.Text>
      </Pressable>
    );
  }

  return (
    <Animated.View
      layout={linearTransitionAnimation}
      style={styles.lineContainer}>
      <TouchableOpacity onPress={() => onToggle('todos')}>
        <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
          {todoItems[0].text}
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
                key={item.id}
                item={item}
                index={index}
                style={styles.dropdownItem}
                linearTransitionAnimation={linearTransitionAnimation}
                onUpdate={onUpdateItem}
              />
            ))}
          </View>
        )}
      </Animated.View>

      <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
        들이 남았어요.
      </Animated.Text>
    </Animated.View>
  );
}
