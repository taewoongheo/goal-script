import {useGoalStore} from '@/stores/goalStore';
import React, {useState, useRef} from 'react';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {TextInput} from 'react-native-gesture-handler';

interface UseGoalBottomSheetHandlersProps {
  title: string;
  onTitleChange?: (text: string) => void;
  onCompleteGoal?: () => void;
  onDeleteGoal?: () => void;
  bottomSheetRef?: React.RefObject<any>;
}

export function useGoalBottomSheetHandlers({
  title,
  onTitleChange,
  onCompleteGoal,
  onDeleteGoal,
  bottomSheetRef,
}: UseGoalBottomSheetHandlersProps) {
  const [editableTitle, setEditableTitle] = useState(title);
  const [tempEditableTitle, setTempEditableTitle] = useState(title);
  const [isEditMode, setIsEditMode] = useState(false);
  const titleInputRef = useRef<TextInput>(null);

  const {goalData, setSelectedGoalId} = useGoalStore();

  const handleSwitchToEdit = () => {
    setIsEditMode(true);
    setTempEditableTitle(editableTitle);
    bottomSheetRef?.current.snapToIndex(0);
  };

  const handleSwitchToMain = () => {
    setIsEditMode(false);
    setTempEditableTitle(editableTitle);
    bottomSheetRef?.current.snapToIndex(1);
  };

  const handleCompleteGoal = () => {
    if (onCompleteGoal) {
      onCompleteGoal();
    }
    bottomSheetRef?.current.close();
  };

  const handleDeleteGoal = () => {
    if (onDeleteGoal) {
      onDeleteGoal();
    }

    if (goalData.length > 1) {
      setSelectedGoalId(goalData[0].id);
    }

    bottomSheetRef?.current.close();
  };

  const handleConfirmEdit = () => {
    setEditableTitle(tempEditableTitle);
    if (tempEditableTitle === '') {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '목표를 입력해주세요.',
        textBody: '한 글자 이상 입력해주세요',
      });
      return;
    }
    if (tempEditableTitle.length > 30) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: '글자 수 제한',
        textBody: '30자 이하로 입력해주세요',
      });
      return;
    }
    if (onTitleChange) {
      onTitleChange(tempEditableTitle);
    }
    handleSwitchToMain();
  };

  return {
    editableTitle,
    setEditableTitle,
    tempEditableTitle,
    setTempEditableTitle,
    isEditMode,
    titleInputRef,
    handlers: {
      handleSwitchToEdit,
      handleSwitchToMain,
      handleCompleteGoal,
      handleDeleteGoal,
      handleConfirmEdit,
    },
  };
}
