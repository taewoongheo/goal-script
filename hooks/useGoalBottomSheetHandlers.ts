import React, {useState, useRef} from 'react';
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
    bottomSheetRef?.current.close();
  };

  const handleConfirmEdit = () => {
    setEditableTitle(tempEditableTitle);
    if (onTitleChange) {
      onTitleChange(tempEditableTitle);
    }
    handleSwitchToMain();
  };

  return {
    editableTitle,
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
