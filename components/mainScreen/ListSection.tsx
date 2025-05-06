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
  EntryAnimationsValues,
  FadeIn,
  FadeOut,
  LinearTransition,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {ToggleKey} from '@/hooks/useToggleExpand';

export interface ListSectionProps {
  items: string[];
  isExpanded: boolean;
  onToggle: (_key: ToggleKey) => void;
  toggleKey: ToggleKey;
  suffixText: string;
  styles: {
    lineContainer: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    highlight: StyleProp<TextStyle>;
    dropdownContainer: StyleProp<ViewStyle>;
    dropdownItem: StyleProp<TextStyle>;
  };
}

export function ListSection({
  items,
  isExpanded,
  onToggle,
  toggleKey,
  suffixText,
  styles,
}: ListSectionProps) {
  if (items.length === 0) return null;

  return (
    <Animated.View
      layout={LinearTransition.springify().duration(1000)}
      style={styles.lineContainer}>
      <TouchableOpacity onPress={() => onToggle(toggleKey)}>
        <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
          {items[0]}
        </Text>
      </TouchableOpacity>

      <Animated.View
        layout={LinearTransition.duration(500)}
        style={[
          styles.dropdownContainer,
          {
            overflow: 'hidden',
            backgroundColor: 'red',
          },
        ]}>
        {isExpanded && (
          <View>
            {items.map((el, i) => (
              <Animated.Text
                entering={FadeIn.springify().delay(100 * (i + 1))}
                exiting={FadeOut.springify()}
                key={`${el}-${i}`}
                style={styles.dropdownItem}>
                {el}
              </Animated.Text>
            ))}
          </View>
        )}
      </Animated.View>

      <Animated.Text
        layout={LinearTransition.springify().duration(1000)}
        style={styles.text}>
        {suffixText}
      </Animated.Text>
    </Animated.View>
  );
}
