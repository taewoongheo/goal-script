import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
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
import {Feather, FontAwesome6} from '@expo/vector-icons';
import {Pressable} from 'react-native-gesture-handler';

import {Layout} from '@/constants/Layout';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {HighlightColor} from '@/constants/Colors';
import {TaskSectionProps} from './types';
import {Theme} from '@/constants/Theme';
import {viewportWidth} from '@/utils/viewport';

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
  listItemBottomSheetRef,
  addTaskBottomSheetRef,
}: TaskSectionProps) {
  const [height, setHeight] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const heightMeasured = useRef(false);

  useEffect(() => {
    setSelectedIdx(prev => (prev === 0 ? 0 : prev - 1));
  }, [items.length]);

  const containerPadding = useMemo(
    () => ((1 - Layout.padding.horizontal) * viewportWidth) / 2,
    [],
  );

  const highlightAnimation = useMemo(
    () => LinearTransition.duration(ANIMATION_DURATION.HIGHLIGHT_TRANSITION),
    [],
  );

  const highlightFadeIn = useMemo(
    () =>
      FadeIn.duration(ANIMATION_DURATION.LIST_ITEM_ANIMATION.FADE_IN).delay(
        ANIMATION_DURATION.LIST_ITEM_ANIMATION.ITEM_ANIMATION_DELAY *
          (selectedIdx + 1),
      ),
    [selectedIdx],
  );

  const highlightFadeOut = useMemo(() => FadeOut, []);

  const addTaskFadeInAnimation = useMemo(
    () =>
      FadeIn.duration(ANIMATION_DURATION.LIST_ITEM_ANIMATION.FADE_IN).delay(
        ANIMATION_DURATION.LIST_ITEM_ANIMATION.ITEM_ANIMATION_DELAY *
          (items.length + 1),
      ),
    [items.length],
  );

  const addTaskFadeOutAnimation = useMemo(() => FadeOut, []);

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
        <Pressable onPress={() => addTaskBottomSheetRef?.current?.expand()}>
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
        style={localStyles.headerContainer}>
        <FontAwesome6
          name={icon}
          size={Theme.iconSize.medium}
          color={Theme.colors.highlight}
          style={localStyles.iconContainer}
        />
        <View style={localStyles.headerTextContainer}>
          <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
            {isExpanded ? `${items.length}개의 할 일` : items[0].text}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={localStyles.relativeContainer}>
        {isExpanded && (
          <Animated.View
            layout={highlightAnimation}
            entering={highlightFadeIn}
            exiting={highlightFadeOut}
            style={[
              localStyles.highlightBackground,
              {
                backgroundColor: HighlightColor.light,
                height,
                width: viewportWidth,
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
                    listItemBottomSheetRef,
                  })}
                </React.Fragment>
              ))}
              {title === 'todos' && (
                <Pressable
                  onPress={() => addTaskBottomSheetRef?.current?.expand()}>
                  <Animated.View
                    layout={linearTransitionAnimation}
                    entering={addTaskFadeInAnimation}
                    exiting={addTaskFadeOutAnimation}
                    style={localStyles.addTaskButton}>
                    <Feather
                      name="plus"
                      size={Theme.iconSize.medium}
                      color={Theme.colors.text}
                    />
                  </Animated.View>
                </Pressable>
              )}
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
  iconContainer: {
    marginRight: Theme.iconSpace.medium,
  },
  highlightBackground: {
    position: 'absolute',
    zIndex: -1,
  },
  dropdownOverride: {
    position: 'relative',
    // overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  addTaskButton: {
    width: '100%',
    backgroundColor: Theme.colors.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.small,
    borderRadius: Theme.borderRadius.small,
    marginVertical: Theme.spacing.small,
  },
});
