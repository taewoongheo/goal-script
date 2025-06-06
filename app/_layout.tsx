import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Text, View} from 'react-native';
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
import BottomTabBar from '@/components/ui/BottomTabBar';

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
  const {goalData, setSelectedGoalId} = useGoalStore(state => state);

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
    <GestureHandlerRootView style={{flex: 1}}>
      <SelectedTaskContext.Provider value={selectedTaskValue}>
        {goalData.length === 0 && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>목표를 만들어보세요</Text>
          </View>
        )}

        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name="+not-found" />
        </Stack>

        <BottomTabBar
          goalData={goalData}
          setSelectedGoalId={setSelectedGoalId}
          onAddGoal={() => {
            addGoalBottomSheetRef.current?.expand();
          }}
          onSettings={() => {
            console.log('settings');
          }}
        />

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
