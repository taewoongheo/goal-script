import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useMemo, useCallback, useState} from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet, View, Text} from 'react-native';
import {useColorScheme} from '@/hooks/useColorScheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {
  BottomSheetProvider,
  useBottomSheet,
} from '@/contexts/BottomSheetContext';
import {Typography} from '@/constants/Typography';
import {TaskItem} from '@/hooks/useGoalData';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Context for selected task item
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
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  // Context 값을 메모이제이션
  const selectedTaskValue = useMemo(
    () => ({selectedTask, setSelectedTask}),
    [selectedTask],
  );

  // 배경 컴포넌트 렌더링 함수
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
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{backgroundColor: '#999'}}
            backgroundStyle={{backgroundColor: 'white'}}
            style={styles.bottomSheet}>
            <BottomSheetView style={styles.contentContainer}>
              <Animated.Text style={styles.text}>목표 설정</Animated.Text>
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
            style={styles.bottomSheet}>
            <BottomSheetView style={styles.contentContainer}>
              <Animated.Text style={styles.text}>디데이 설정</Animated.Text>
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
            style={styles.bottomSheet}>
            <BottomSheetView style={styles.contentContainer}>
              <Text style={styles.title}>Task Details</Text>
              {selectedTask && (
                <View style={styles.taskDetails}>
                  <Text style={styles.label}>Task:</Text>
                  <Text style={styles.value}>{selectedTask.text}</Text>

                  <Text style={styles.label}>Status:</Text>
                  <Text style={styles.value}>
                    {selectedTask.completed ? 'Completed' : 'In Progress'}
                  </Text>

                  <Text style={styles.label}>ID:</Text>
                  <Text style={styles.value}>{selectedTask.id}</Text>
                </View>
              )}
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
    padding: 16,
  },
  text: {
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.regular,
    color: '#2F2F2F',
  },
  title: {
    fontSize: Typography.fontSize.large,
    fontFamily: Typography.fontFamily.bold,
    color: '#2F2F2F',
    marginBottom: 16,
  },
  taskDetails: {
    marginTop: 8,
  },
  label: {
    fontSize: Typography.fontSize.medium,
    fontFamily: Typography.fontFamily.bold,
    color: '#2F2F2F',
    marginTop: 8,
  },
  value: {
    fontSize: Typography.fontSize.medium,
    fontFamily: Typography.fontFamily.regular,
    color: '#2F2F2F',
    marginBottom: 8,
  },
});
