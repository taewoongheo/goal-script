import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useMemo, useCallback, useState} from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet, View, Text, Keyboard} from 'react-native';
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
import {ListItemBottomSheet} from '@/components/mainScreen/ListItemBottomSheet';
import {DDayBottomSheet} from '@/components/mainScreen/dday/DDayBottomSheet';

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
  const colorScheme = useColorScheme();
  const snapPoints = useMemo(() => ['50%'], []);
  const defaultSnapPoints = useMemo(() => ['25%', '50%'], []);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const {
    title,
    icon,
    achieved,
    dDay,
    rDay,
    editAchievedTask,
    editTodoTask,
    removeAchievedTask,
    removeTodoTask,
  } = useGoalData();

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
      // 바텀시트가 닫힐 때 선택된 작업 초기화
      setSelectedTask(null);
    }
  }, []);

  // 선택된 작업 편집 처리
  const handleEditTask = useCallback(
    (taskId: string, newText: string) => {
      if (!selectedTask) return;

      if (selectedTask.completed) {
        editAchievedTask(taskId, newText);
      } else {
        editTodoTask(taskId, newText);
      }

      // 편집 후 바텀시트 닫기
      listItemBottomSheetRef.current?.close();
    },
    [selectedTask, editAchievedTask, editTodoTask, listItemBottomSheetRef],
  );

  // 선택된 작업 삭제 처리
  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (!selectedTask) return;

      if (selectedTask.completed) {
        removeAchievedTask(taskId);
      } else {
        removeTodoTask(taskId);
      }

      // 삭제 후 바텀시트 닫기
      listItemBottomSheetRef.current?.close();
    },
    [selectedTask, removeAchievedTask, removeTodoTask, listItemBottomSheetRef],
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SelectedTaskContext.Provider value={selectedTaskValue}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
            backgroundStyle={{backgroundColor: 'white'}}
            style={styles.bottomSheet}
            onChange={handleSheetChanges}
            handleIndicatorStyle={{backgroundColor: '#999'}}
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
            handleIndicatorStyle={{backgroundColor: '#999'}}
            backgroundStyle={{backgroundColor: 'white'}}
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
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{backgroundColor: '#999'}}
            backgroundStyle={{backgroundColor: 'white'}}
            style={styles.bottomSheet}
            onChange={handleSheetChanges}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
            enableDynamicSizing>
            <BottomSheetView style={styles.contentContainer}>
              <ListItemBottomSheet
                onEditItem={handleEditTask}
                onDeleteItem={handleDeleteTask}
              />
            </BottomSheetView>
          </BottomSheet>
        </ThemeProvider>
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
