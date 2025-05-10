import React, {useState, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import Animated, {
  FadeOut,
  FadeIn,
  LinearTransition,
} from 'react-native-reanimated';
import {Pressable} from 'react-native-gesture-handler';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {TaskItem} from '@/hooks/useGoalData';
import {getViewportWidth} from '@/utils/viewport';
import {Layout} from '@/constants/Layout';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {HighlightColor} from '@/constants/Colors';
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
  const [height, setHeight] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const heightMeasured = useRef(false);

  const containerPadding = useMemo(
    () => ((1 - Layout.padding.horizontal) * getViewportWidth()) / 2,
    [],
  );

  const highlightAnimation = useMemo(
    () => LinearTransition.duration(ANIMATION_DURATION.HIGHLIGHT_TRANSITION),
    [],
  );

  const getHeight = useCallback((event: LayoutChangeEvent) => {
    if (!heightMeasured.current) {
      setHeight(event.nativeEvent.layout.height);
      heightMeasured.current = true;
    }
  }, []);

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
      <TouchableOpacity activeOpacity={1} onPress={() => onToggle('todos')}>
        <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
          {todoItems[0].text}
        </Text>
      </TouchableOpacity>

      <View style={localStyles.relativeContainer}>
        {isTodosExpanded && (
          <Animated.View
            layout={highlightAnimation}
            entering={FadeIn}
            exiting={FadeOut}
            style={[
              localStyles.highlightBackground,
              {
                height,
                width: getViewportWidth(),
                left: -containerPadding,
                top: selectedIdx * height,
              },
            ]}
          />
        )}

        <Animated.View
          layout={linearTransitionAnimation}
          style={[styles.dropdownContainer, localStyles.dropdownOverride]}>
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
                  onLayout={getHeight}
                  setSelectedIdx={setSelectedIdx}
                  selectedIdx={selectedIdx}
                />
              ))}
            </View>
          )}
        </Animated.View>
      </View>

      <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
        들이 남았어요.
      </Animated.Text>
    </Animated.View>
  );
}

const localStyles = StyleSheet.create({
  relativeContainer: {
    position: 'relative',
    width: '100%',
  },
  highlightBackground: {
    position: 'absolute',
    backgroundColor: HighlightColor.light,
    borderRadius: 8,
    zIndex: -1,
  },
  dropdownOverride: {
    position: 'relative',
    overflow: 'hidden',
  },
});
