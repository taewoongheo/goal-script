import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useMemo, useCallback, useState} from 'react';
import {StyleSheet, Keyboard, ActivityIndicator, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useColorScheme} from '@/hooks/useColorScheme';
import {
  BottomSheetProvider,
  useBottomSheet,
} from '@/contexts/BottomSheetContext';
import {Typography} from '@/constants/Typography';
import {TaskItem, useGoalData} from '@/hooks/useGoalData';
import {GoalBottomSheet} from '@/components/mainScreen/goal/GoalBottomSheet';
import {ListItemBottomSheet} from '@/components/mainScreen/task/ListItemBottomSheet';
import {DDayBottomSheet} from '@/components/mainScreen/dday/DDayBottomSheet';
import {Colors} from '@/constants/Colors';
import {updateThemeColors} from '@/constants/Theme';
import {useGoalStore} from '@/stores/goalStore';
import {seedSampleGoalData} from '@/scripts/seedSampleData';

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
  const snapPoints = useMemo(() => ['50%'], []);
  const listItemSnapPoints = useMemo(() => ['35%'], []);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const {actions} = useGoalData();
  const loadGoalDataFromDB = useGoalStore(state => state.loadGoalDataFromDB);
  const goalData = useGoalStore(state => state.goalData);

  useEffect(() => {
    (async function () {
      await seedSampleGoalData();
      await loadGoalDataFromDB();
    })();
  }, []);

  const selectedTaskValue = useMemo(
    () => ({selectedTask, setSelectedTask}),
    [selectedTask],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      Keyboard.dismiss();
      setSelectedTask(null);
    }
  }, []);

  const handleEditTask = useCallback(
    (taskId: string, newText: string) => {
      if (!selectedTask) return;

      if (selectedTask.completed) {
        actions.achieved.edit(taskId, newText);
      } else {
        actions.todo.edit(taskId, newText);
      }

      listItemBottomSheetRef.current?.close();
    },
    [selectedTask, actions, listItemBottomSheetRef],
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (!selectedTask) return;

      if (selectedTask.completed) {
        actions.achieved.remove(taskId);
      } else {
        actions.todo.remove(taskId);
      }

      listItemBottomSheetRef.current?.close();
    },
    [selectedTask, actions, listItemBottomSheetRef],
  );

  // 아래는 goalData가 없을 때만 렌더링 분기
  if (!goalData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const {title} = goalData;
  const {icon} = goalData;
  const {achieved} = goalData;
  const dDay = goalData.dDay.remainingDays;
  const rDay = goalData.dDay.date;

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SelectedTaskContext.Provider value={selectedTaskValue}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />

        {/* Goal BottomSheet */}
        <BottomSheet
          ref={goalBottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          backdropComponent={renderBackdrop}
          backgroundStyle={{backgroundColor: Colors.light.white}}
          style={styles.bottomSheet}
          onChange={handleSheetChanges}
          handleIndicatorStyle={{backgroundColor: Colors.light.gray}}
          enablePanDownToClose
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
          enableDynamicSizing>
          <BottomSheetView style={styles.contentContainer}>
            <GoalBottomSheet
              icon={icon}
              title={title}
              achieved={achieved}
              dDay={dDay}
              rDay={rDay}
              onTitleChange={newTitle => console.log('제목 변경:', newTitle)}
              onAchieveGoal={() => console.log('목표 달성 클릭')}
              onDeleteGoal={() => console.log('목표 삭제 클릭')}
            />
          </BottomSheetView>
        </BottomSheet>

        {/* D-day BottomSheet */}
        <BottomSheet
          ref={ddayBottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{backgroundColor: Colors.light.gray}}
          backgroundStyle={{backgroundColor: Colors.light.white}}
          style={styles.bottomSheet}
          onChange={handleSheetChanges}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
          enableDynamicSizing>
          <BottomSheetView style={styles.contentContainer}>
            <DDayBottomSheet
              initialDate={rDay}
              dDay={dDay}
              onSaveDate={date => console.log('선택된 날짜:', date)}
              onCancel={() => ddayBottomSheetRef.current?.close()}
            />
          </BottomSheetView>
        </BottomSheet>

        {/* List Item BottomSheet */}
        <BottomSheet
          ref={listItemBottomSheetRef}
          snapPoints={listItemSnapPoints}
          index={-1}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          handleIndicatorStyle={{backgroundColor: Colors.light.gray}}
          backgroundStyle={{backgroundColor: Colors.light.white}}
          style={styles.bottomSheet}
          onChange={handleSheetChanges}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize">
          <BottomSheetView style={styles.contentContainer}>
            <ListItemBottomSheet
              onEditItem={handleEditTask}
              onDeleteItem={handleDeleteTask}
            />
          </BottomSheetView>
        </BottomSheet>
      </SelectedTaskContext.Provider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: Typography.fontFamily.regular,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  taskDetails: {
    paddingHorizontal: 20,
  },
});
