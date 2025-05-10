import React, {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useMemo,
} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

type BottomSheetContextType = {
  bottomSheetRef: React.RefObject<BottomSheet>;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export function BottomSheetProvider({children}: {children: ReactNode}) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const value = useMemo(
    () => ({
      bottomSheetRef,
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
