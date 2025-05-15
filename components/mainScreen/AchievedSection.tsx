import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {TaskItem} from '@/hooks/useGoalData';
import {TaskSection} from './task/TaskSection';
import {TaskItemProps, TaskStyles} from './task/types';
import {TaskItem as TaskItemComponent} from './task/TaskItem';

interface AchievedSectionProps {
  achievedItems: TaskItem[];
  isAchievedExpanded: boolean;
  onToggle: (key: ToggleKey) => void;
  styles: TaskStyles;
  linearTransitionAnimation: any;
  hasTodoItems: boolean;
  onUpdateItem: (taskId: string) => void;
  onEditItem?: (taskId: string, newText: string) => void;
  listItemBottomSheetRef?: React.RefObject<BottomSheet>;
}

export function AchievedSection({
  achievedItems,
  isAchievedExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  hasTodoItems,
  onUpdateItem,
  onEditItem,
  listItemBottomSheetRef,
}: AchievedSectionProps) {
  const renderTaskItem = (props: TaskItemProps) => (
    <TaskItemComponent {...props} />
  );

  return (
    <TaskSection
      items={achievedItems}
      isExpanded={isAchievedExpanded}
      onToggle={onToggle}
      styles={styles}
      linearTransitionAnimation={linearTransitionAnimation}
      onUpdateItem={onUpdateItem}
      onEditItem={onEditItem}
      icon="list-check"
      title="achieved"
      suffix={hasTodoItems ? '들을 완료했고,' : '들을 완료했어요.'}
      renderItem={renderTaskItem}
      listItemBottomSheetRef={listItemBottomSheetRef}
    />
  );
}
