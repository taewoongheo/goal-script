import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {useGoalStore} from '@/stores/goalStore';
import {useGoalData} from '@/hooks/useGoalData';
import {TaskSection} from './task/TaskSection';
import {TaskItemProps, TaskStyles} from './task/types';
import {TaskItem as TaskItemComponent} from './task/TaskItem';

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
  const selectedGoalId = useGoalStore(state => state.selectedGoalId);
  const {actions} = useGoalData(selectedGoalId ?? '');
  const achievedItems =
    useGoalStore(
      state => state.goalData.find(g => g.id === selectedGoalId)?.achieved,
    ) ?? [];
  const hasTodoItems =
    useGoalStore(
      state => state.goalData.find(g => g.id === selectedGoalId)?.todos.length,
    ) ?? 0;

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
      icon="list-check"
      title="achieved"
      suffix={hasTodoItems ? '들을 완료했고,' : '들을 완료했어요.'}
      renderItem={renderTaskItem}
      listItemBottomSheetRef={listItemBottomSheetRef}
    />
  );
}
