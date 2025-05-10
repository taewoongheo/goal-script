import React, {useState, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import {Pressable} from 'react-native-gesture-handler';
import {getViewportWidth} from '@/utils/viewport';
import {Layout} from '@/constants/Layout';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {HighlightColor} from '@/constants/Colors';
import {FontAwesome6} from '@expo/vector-icons';
import {TaskSectionProps} from './types';

export function TaskSection({
  items,
  isExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  onUpdateItem,
  icon,
  title,
  suffix = '',
  emptyMessage,
  renderItem,
}: TaskSectionProps) {
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

  // 항목이 없는 경우 처리
  if (items.length === 0) {
    if (emptyMessage) {
      return (
        <Pressable onPress={() => console.log('add task')}>
          <Animated.Text
            layout={linearTransitionAnimation}
            style={[styles.text, styles.highlight]}>
            {emptyMessage}
          </Animated.Text>
        </Pressable>
      );
    }
    return null;
  }

  return (
    <Animated.View
      layout={linearTransitionAnimation}
      style={styles.lineContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onToggle(title.toLowerCase() as any)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesome6
          name={icon}
          size={24}
          color="black"
          style={{marginRight: 6}}
        />
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
            {isExpanded ? `${items.length}개의 할 일` : items[0].text}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={localStyles.relativeContainer}>
        {isExpanded && (
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
          {isExpanded && (
            <View>
              {items.map((item, index) => (
                <React.Fragment key={item.id}>
                  {renderItem({
                    item,
                    index,
                    style: styles.dropdownItem,
                    linearTransitionAnimation,
                    onUpdate: onUpdateItem,
                    onLayout: getHeight,
                    setSelectedIdx,
                    selectedIdx,
                  })}
                </React.Fragment>
              ))}
            </View>
          )}
        </Animated.View>
      </View>

      <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
        {suffix}
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
