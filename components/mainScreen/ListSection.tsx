import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand';

interface ListSectionProps {
  items: string[];
  isExpanded: boolean;
  onToggle: (key: ToggleKey) => void;
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
  toggleKey, // Use the passed toggleKey
  suffixText, // Use the passed suffixText
  styles,
}: ListSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.lineContainer}>
      {/* Use toggleKey for the onPress handler */}
      <TouchableOpacity onPress={() => onToggle(toggleKey)}>
        <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
          {items[0]}
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.dropdownContainer}>
          {items.map((el, index) => (
            <Text key={`${el}${index + 1}`} style={styles.dropdownItem}>
              {el}
            </Text>
          ))}
        </View>
      )}

      {/* Use the dynamic suffixText */}
      <Text style={styles.text}>{suffixText}</Text>
    </View>
  );
}
