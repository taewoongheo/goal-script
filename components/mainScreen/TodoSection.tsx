import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {TaskItem} from '@/hooks/useGoalData';
import {TaskSection} from './task/TaskSection';
import {TaskItemProps, TaskStyles} from './task/types';
import {TaskItem as TaskItemComponent} from './task/TaskItem';

interface TodoSectionProps {
  todoItems: TaskItem[];
  isTodosExpanded: boolean;
  onToggle: (key: ToggleKey) => void;
  styles: TaskStyles;
  linearTransitionAnimation: any;
  onUpdateItem: (taskId: string) => void;
  onEditItem?: (taskId: string, newText: string) => void;
  listItemBottomSheetRef?: React.RefObject<BottomSheet>;
}

export function TodoSection({
  todoItems,
  isTodosExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  onUpdateItem,
  onEditItem,
  listItemBottomSheetRef,
}: TodoSectionProps) {
  const renderTaskItem = (props: TaskItemProps) => (
    <TaskItemComponent {...props} />
  );

  return (
    <TaskSection
      items={todoItems}
      isExpanded={isTodosExpanded}
      onToggle={onToggle}
      styles={styles}
      linearTransitionAnimation={linearTransitionAnimation}
      onUpdateItem={onUpdateItem}
      onEditItem={onEditItem}
      icon="list"
      title="todos"
      suffix="들이 남았어요."
      emptyMessage="앞으로 할 일은 무엇인가요?"
      renderItem={renderTaskItem}
      listItemBottomSheetRef={listItemBottomSheetRef}
    />
  );
}
