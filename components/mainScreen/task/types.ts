import React from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {LinearTransition} from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {TaskItem} from '@/hooks/useGoalData';

export interface TaskStyles {
  lineContainer: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  highlight: StyleProp<TextStyle>;
  dropdownContainer: StyleProp<ViewStyle>;
  dropdownItem: StyleProp<TextStyle>;
}

export interface TaskItemProps {
  item: TaskItem;
  index: number;
  style: StyleProp<TextStyle>;
  linearTransitionAnimation: LinearTransition;
  onUpdate: (taskId: string) => void;
  onLayout: (event: any) => void;
  setSelectedIdx: (idx: number) => void;
  selectedIdx: number;
  listItemBottomSheetRef?: React.RefObject<BottomSheet>;
}

export interface TaskSectionProps {
  items: TaskItem[];
  isExpanded: boolean;
  onToggle: (key: ToggleKey) => void;
  styles: TaskStyles;
  linearTransitionAnimation: LinearTransition;
  onUpdateItem: (taskId: string) => void;
  onEditItem?: (taskId: string, newText: string) => void;
  icon: string;
  title: string;
  suffix?: string;
  emptyMessage?: string;
  renderItem: (props: TaskItemProps) => React.ReactElement;
  listItemBottomSheetRef?: React.RefObject<BottomSheet>;
  addTaskBottomSheetRef?: React.RefObject<BottomSheet>;
}
