import React, {useState} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ToggleKey} from '@/hooks/useToggleExpand';

interface DdaySectionProps {
  dDay: number;
  rDay: string;
  isDdayExpanded: boolean;
  onToggleDday: (_key: ToggleKey) => void;
  styles: {
    lineContainer: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    highlight: StyleProp<TextStyle>;
  };
}

export function DdaySection({
  dDay,
  rDay,
  isDdayExpanded,
  onToggleDday,
  styles,
}: DdaySectionProps) {
  return (
    <View style={styles.lineContainer}>
      <Text style={styles.text}>
        D-{dDay} {rDay} 남았어요
      </Text>
    </View>
  );
}
