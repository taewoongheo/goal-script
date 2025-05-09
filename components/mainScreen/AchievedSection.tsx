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
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {TaskItem} from '@/hooks/useGoalData';
import {getViewportWidth} from '@/utils/viewport';
import {Layout} from '@/constants/Layout';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {AchievedItem} from './AchievedItem';

interface AchievedSectionProps {
  achievedItems: TaskItem[];
  isAchievedExpanded: boolean;
  onToggle: (_key: ToggleKey) => void;
  styles: {
    lineContainer: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    highlight: StyleProp<TextStyle>;
    dropdownContainer: StyleProp<ViewStyle>;
    dropdownItem: StyleProp<TextStyle>;
  };
  linearTransitionAnimation: any;
  hasTodoItems: boolean;
  onUpdateItem: (taskId: string) => void;
}

export function AchievedSection({
  achievedItems,
  isAchievedExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  hasTodoItems,
  onUpdateItem,
}: AchievedSectionProps) {
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

  if (achievedItems.length === 0) {
    return null;
  }

  return (
    <Animated.View
      layout={linearTransitionAnimation}
      style={styles.lineContainer}>
      <TouchableOpacity onPress={() => onToggle('achieved')}>
        <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
          {achievedItems[0].text}
        </Text>
      </TouchableOpacity>

      <View style={localStyles.relativeContainer}>
        {isAchievedExpanded && (
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
          {isAchievedExpanded && (
            <View>
              {achievedItems.map((item, index) => (
                <AchievedItem
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
        {hasTodoItems ? '들을 완료했고,' : '들을 완료했어요.'}
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
    backgroundColor: 'rgb(217, 255, 0)',
    borderRadius: 8,
    zIndex: -1,
  },
  dropdownOverride: {
    position: 'relative',
    overflow: 'hidden',
  },
});
