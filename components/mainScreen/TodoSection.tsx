import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {TaskSection} from './task/TaskSection';
import {TaskItemProps, TaskStyles} from './task/types';
import {TaskItem as TaskItemComponent} from './task/TaskItem';
import {useGoalStore} from '@/stores/goalStore';
import {useGoalData} from '@/hooks/useGoalData';

interface TodoSectionProps {
  isTodosExpanded: boolean;
  onToggle: (key: ToggleKey) => void;
  styles: TaskStyles;
  linearTransitionAnimation: any;
  listItemBottomSheetRef?: React.RefObject<BottomSheet>;
  addTaskBottomSheetRef?: React.RefObject<BottomSheet>;
}

export function TodoSection({
  isTodosExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  listItemBottomSheetRef,
  addTaskBottomSheetRef,
}: TodoSectionProps) {
  const todoItems = useGoalStore(state => state.goalData?.todos) ?? [];
  const {actions} = useGoalData();

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
      onUpdateItem={actions.todo.toggle}
      onEditItem={actions.todo.edit}
      icon="list"
      title="todos"
      suffix="들이 남았어요."
      emptyMessage="앞으로 할 일은 무엇인가요?"
      renderItem={renderTaskItem}
      listItemBottomSheetRef={listItemBottomSheetRef}
      addTaskBottomSheetRef={addTaskBottomSheetRef}
    />
  );
}
