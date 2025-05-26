import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetProvider,
  useBottomSheet,
} from '@/contexts/BottomSheetContext';

import {TaskItem} from '@/types/goal';
import {GoalBottomSheetContainer} from '@/components/bottomSheets/GoalBottomSheetContainer';
import {DDayBottomSheetContainer} from '@/components/bottomSheets/DDayBottomSheetContainer';
import {ListItemBottomSheetContainer} from '@/components/bottomSheets/ListItemBottomSheetContainer';
import {useGoalStore} from '@/stores/goalStore';
import {setupDatabase} from '@/scripts/setup';

SplashScreen.preventAutoHideAsync();

export type SelectedTaskContextType = {
  selectedTask: TaskItem | null;
  setSelectedTask: (task: TaskItem | null) => void;
};

export const SelectedTaskContext = React.createContext<
  SelectedTaskContextType | undefined
>(undefined);

export const useSelectedTask = () => {
  const context = React.useContext(SelectedTaskContext);
  if (context === undefined) {
    throw new Error(
      'useSelectedTask must be used within a SelectedTaskProvider',
    );
  }
  return context;
};

function RootLayoutContent() {
  const {goalBottomSheetRef, ddayBottomSheetRef, listItemBottomSheetRef} =
    useBottomSheet();
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const loadGoalDataFromDB = useGoalStore(state => state.loadGoalDataFromDB);
  const goalData = useGoalStore(state => state.goalData);

  useEffect(() => {
    (async function () {
      await setupDatabase();
      await loadGoalDataFromDB();
    })();
  }, [loadGoalDataFromDB]);

  const selectedTaskValue = useMemo(
    () => ({selectedTask, setSelectedTask}),
    [selectedTask],
  );

  if (!goalData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SelectedTaskContext.Provider value={selectedTaskValue}>
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />

        <GoalBottomSheetContainer bottomSheetRef={goalBottomSheetRef} />
        <DDayBottomSheetContainer bottomSheetRef={ddayBottomSheetRef} />
        <ListItemBottomSheetContainer
          bottomSheetRef={listItemBottomSheetRef}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      </SelectedTaskContext.Provider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BottomSheetProvider>
      <RootLayoutContent />
    </BottomSheetProvider>
  );
}
