import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect, useMemo, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetProvider,
  useBottomSheet,
} from '@/contexts/BottomSheetContext';
import {TaskItem} from '@/types/goal';
import {GoalBottomSheetContainer} from '@/components/bottomSheets/GoalBottomSheetContainer';
import {DDayBottomSheetContainer} from '@/components/bottomSheets/DDayBottomSheetContainer';
import {ListItemBottomSheetContainer} from '@/components/bottomSheets/ListItemBottomSheetContainer';
import {AddTaskBottomSheetContainer} from '@/components/bottomSheets/AddTaskBottomSheetContainer';
import {AddGoalBottomSheetContainer} from '@/components/bottomSheets/AddGoalBottomSheetContainer';
import {initializeGoals, useGoalStore} from '@/stores/goalStore';
import {setupDatabase} from '@/scripts/setup';
import {AlertNotificationRoot} from 'react-native-alert-notification';

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
  const {
    goalBottomSheetRef,
    ddayBottomSheetRef,
    listItemBottomSheetRef,
    addTaskBottomSheetRef,
    addGoalBottomSheetRef,
  } = useBottomSheet();
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const {goalData} = useGoalStore(state => state);

  useEffect(() => {
    (async function () {
      await setupDatabase();
      initializeGoals();
    })();
  }, []);

  const selectedTaskValue = useMemo(
    () => ({selectedTask, setSelectedTask}),
    [selectedTask],
  );

  return (
    <AlertNotificationRoot>
      <GestureHandlerRootView style={{flex: 1}}>
        <SelectedTaskContext.Provider value={selectedTaskValue}>
          <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="settings" options={{headerShown: false}} />
            <Stack.Screen
              name="privacy-policy"
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="terms-of-service"
              options={{headerShown: false}}
            />
            <Stack.Screen name="license-info" options={{headerShown: false}} />
            <Stack.Screen name="+not-found" />
          </Stack>

          <GoalBottomSheetContainer bottomSheetRef={goalBottomSheetRef} />
          <DDayBottomSheetContainer bottomSheetRef={ddayBottomSheetRef} />
          <ListItemBottomSheetContainer
            bottomSheetRef={listItemBottomSheetRef}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
          />
          <AddTaskBottomSheetContainer bottomSheetRef={addTaskBottomSheetRef} />
          <AddGoalBottomSheetContainer bottomSheetRef={addGoalBottomSheetRef} />
        </SelectedTaskContext.Provider>
      </GestureHandlerRootView>
    </AlertNotificationRoot>
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
