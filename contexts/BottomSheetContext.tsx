import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useMemo,
} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

type BottomSheetRefs = {
  goalBottomSheetRef: React.RefObject<BottomSheet>;
  ddayBottomSheetRef: React.RefObject<BottomSheet>;
  listItemBottomSheetRef: React.RefObject<BottomSheet>;
  addTaskBottomSheetRef: React.RefObject<BottomSheet>;
};

type BottomSheetContextType = BottomSheetRefs;

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export function BottomSheetProvider({children}: {children: ReactNode}) {
  const goalBottomSheetRef = useRef<BottomSheet>(null);
  const ddayBottomSheetRef = useRef<BottomSheet>(null);
  const listItemBottomSheetRef = useRef<BottomSheet>(null);
  const addTaskBottomSheetRef = useRef<BottomSheet>(null);

  const value = useMemo(
    () => ({
      goalBottomSheetRef,
      ddayBottomSheetRef,
      listItemBottomSheetRef,
      addTaskBottomSheetRef,
    }),
    [],
  );

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
