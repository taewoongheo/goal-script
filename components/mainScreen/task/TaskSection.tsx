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
import {FontAwesome6} from '@expo/vector-icons';
import {Pressable} from 'react-native-gesture-handler';
import {getViewportWidth} from '@/utils/viewport';
import {Layout} from '@/constants/Layout';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {HighlightColor} from '@/constants/Colors';
import {TaskSectionProps} from './types';
import {Theme} from '@/constants/Theme';

export function TaskSection({
  items,
  isExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  onUpdateItem,
  onEditItem,
  icon,
  title,
  suffix = '',
  emptyMessage,
  renderItem,
  listItemBottomSheetRef,
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

  const highlightFadeIn = useMemo(
    () =>
      FadeIn.duration(ANIMATION_DURATION.LIST_ITEM_ANIMATION.FADE_IN).delay(
        ANIMATION_DURATION.LIST_ITEM_ANIMATION.ITEM_ANIMATION_DELAY *
          (selectedIdx + 1),
      ),
    [selectedIdx],
  );

  const highlightFadeOut = useMemo(() => FadeOut, []);

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
                    listItemBottomSheetRef,
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
  iconContainer: {
    marginRight: Theme.iconSpace.medium,
  },
  highlightBackground: {
    position: 'absolute',
    zIndex: -1,
  },
  dropdownOverride: {
    position: 'relative',
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
});
