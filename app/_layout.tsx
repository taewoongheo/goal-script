import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Platform, Text, View} from 'react-native';
import {
  FlatList,
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';
import {
  BottomSheetProvider,
  useBottomSheet,
} from '@/contexts/BottomSheetContext';
import {TaskItem} from '@/types/goal';
import {GoalBottomSheetContainer} from '@/components/bottomSheets/GoalBottomSheetContainer';
import {DDayBottomSheetContainer} from '@/components/bottomSheets/DDayBottomSheetContainer';
import {ListItemBottomSheetContainer} from '@/components/bottomSheets/ListItemBottomSheetContainer';
import {AddTaskBottomSheetContainer} from '@/components/bottomSheets/AddTaskBottomSheetContainer';
import {initializeGoals, useGoalStore} from '@/stores/goalStore';
import {setupDatabase} from '@/scripts/setup';
import {BlurView} from 'expo-blur';
import {viewportHeight, viewportWidth} from '@/utils/viewport';
import {Theme} from '@/constants/Theme';
import {scale} from 'react-native-size-matters';
import {FontAwesome5, Fontisto, MaterialIcons} from '@expo/vector-icons';
import {Colors} from '@/constants/Colors';

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
  } = useBottomSheet();
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const goalData = useGoalStore(state => state.goalData);

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

        <TabWrapper>
          <Pressable
            onPress={() => {
              console.log('add goal');
            }}>
            <MaterialIcons
              name="library-add"
              size={30}
              // color={Platform.OS === 'ios' ? 'black' : 'white'}
              color="black"
            />
          </Pressable>
          <Pressable
            onPress={() => {
              console.log('settings');
            }}>
            <Fontisto
              name="player-settings"
              size={30}
              // color={Platform.OS === 'ios' ? 'black' : 'white'}
              color="black"
            />
          </Pressable>
          {goalData.length > 0 && (
            <>
              <View
                style={{
                  width: 20,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(92, 92, 92, 0.3)',
                    width: 1.5,
                    height: 30,
                  }}
                />
              </View>

              <FlatList
                data={goalData}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                style={{
                  flexGrow: 0, // 필요한 만큼만 크기 증가
                }}
                renderItem={({item}) => (
                  <Pressable onPress={() => console.log(item.title)}>
                    <FontAwesome5
                      name={item.icon}
                      size={24}
                      // color={Platform.OS === 'ios' ? 'black' : 'white'}
                      color="black"
                    />
                  </Pressable>
                )}
              />
            </>
          )}
        </TabWrapper>

        <GoalBottomSheetContainer bottomSheetRef={goalBottomSheetRef} />
        <DDayBottomSheetContainer bottomSheetRef={ddayBottomSheetRef} />
        <ListItemBottomSheetContainer
          bottomSheetRef={listItemBottomSheetRef}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
        <AddTaskBottomSheetContainer bottomSheetRef={addTaskBottomSheetRef} />
      </SelectedTaskContext.Provider>
    </GestureHandlerRootView>
  );
}

function TabWrapper({children}: {children: React.ReactNode}) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: viewportHeight * 0.04,
        left: viewportWidth * 0.06,
        right: viewportWidth * 0.06,
        height: viewportHeight * 0.08,
      }}>
      <BlurView
        intensity={60}
        blurReductionFactor={0.2}
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        style={{
          alignSelf: 'center',
          backgroundColor: 'rgba(161, 161, 161, 0.3)',
          borderWidth: Platform.OS === 'ios' ? 0.4 : 1,
          borderColor: 'rgba(66, 66, 66, 0.3)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: Theme.spacing.large,
          paddingVertical: Theme.spacing.small + scale(2),
          borderRadius: Theme.borderRadius.medium,
          overflow: 'hidden',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 20,
          }}>
          {children}
        </View>
      </BlurView>
    </View>
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
