import React from 'react';
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
}

export function AchievedSection({
  achievedItems,
  isAchievedExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  hasTodoItems,
  onUpdateItem,
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
      icon="list-check"
      title="achieved"
      suffix={hasTodoItems ? '들을 완료했고,' : '들을 완료했어요.'}
      renderItem={renderTaskItem}
    />
  );
}
