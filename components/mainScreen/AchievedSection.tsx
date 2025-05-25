import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {TaskSection} from './task/TaskSection';
import {TaskItemProps, TaskStyles} from './task/types';
import {TaskItem as TaskItemComponent} from './task/TaskItem';
import {useGoalStore} from '@/stores/goalStore';
import {useGoalData} from '@/hooks/useGoalData';

interface AchievedSectionProps {
  isAchievedExpanded: boolean;
  onToggle: (key: ToggleKey) => void;
  styles: TaskStyles;
  linearTransitionAnimation: any;
  listItemBottomSheetRef?: React.RefObject<BottomSheet>;
}

export function AchievedSection({
  isAchievedExpanded,
  onToggle,
  styles,
  linearTransitionAnimation,
  listItemBottomSheetRef,
}: AchievedSectionProps) {
  const achievedItems = useGoalStore(state => state.goalData?.achieved) ?? [];
  const hasTodoItems = useGoalStore(state => state.goalData?.todos.length) ?? 0;

  const {actions} = useGoalData();

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
      onUpdateItem={actions.achieved.toggle}
      onEditItem={actions.achieved.edit}
      icon="list-check"
      title="achieved"
      suffix={hasTodoItems ? '들을 완료했고,' : '들을 완료했어요.'}
      renderItem={renderTaskItem}
      listItemBottomSheetRef={listItemBottomSheetRef}
    />
  );
}
