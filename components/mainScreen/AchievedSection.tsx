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
import {ToggleKey} from '@/hooks/useToggleExpand';
import {AchievedItem} from './AchievedItem';

interface AchievedSectionProps {
  achievedItems: string[];
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
}

export function AchievedSection({
  achievedItems,
  isAchievedExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  hasTodoItems,
}: AchievedSectionProps) {
  const [selectedAchievedItem, setSelectedAchievedItem] = useState<{
    item: string;
    index: number;
  } | null>(null);

  const handleAchievedItemSelect = useCallback(
    ({item, index}: {item: string; index: number}) => {
      setSelectedAchievedItem({item, index});
      console.log(item);
    },
    [],
  );

  if (achievedItems.length === 0) {
    return null;
  }

  return (
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
                selectedAchievedItem={selectedAchievedItem}
                setSelectedAchievedItem={handleAchievedItemSelect}
              />
            ))}
          </View>
        )}
      </Animated.View>

      <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
        {hasTodoItems ? '들을 완료했고,' : '들을 완료했어요.'}
      </Animated.Text>
    </Animated.View>
  );
}
