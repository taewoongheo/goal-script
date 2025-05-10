import React from 'react';
import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {LinearTransition, FadeIn, FadeOut} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import {ToggleKey} from '@/hooks/useToggleExpand';

export interface DdaySectionProps {
  dDay: number;
  rDay: string;
  isDdayExpanded: boolean;
  onToggleDday: (key: ToggleKey) => void;
  styles: {
    lineContainer: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    highlight: StyleProp<TextStyle>;
    dropdownContainer: StyleProp<ViewStyle>;
    dropdownItem: StyleProp<TextStyle>;
  };
  linearTransitionAnimation: LinearTransition;
  fadeInAnimation: FadeIn;
  fadeOutAnimation: FadeOut;
  bottomSheetRef: React.RefObject<BottomSheet>;
}
