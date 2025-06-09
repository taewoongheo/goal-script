import {Text, View} from 'react-native';
import Animated, {
  LinearTransition,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {useMemo, useState} from 'react';
import {scale, ScaledSheet} from 'react-native-size-matters';
import {Pressable, ScrollView} from 'react-native-gesture-handler';
import {useToggleExpand} from '@/hooks/useToggleExpand';
import {GoalSection} from '@/components/mainScreen/GoalSection';
import {DdaySection} from '@/components/mainScreen/DdaySection';
import {AchievedSection} from '@/components/mainScreen/AchievedSection';
import {TodoSection} from '@/components/mainScreen/TodoSection';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {useBottomSheet} from '@/contexts/BottomSheetContext';
import {Theme} from '@/constants/Theme';
import {viewportHeight, viewportWidth} from '@/utils/viewport';
import {AntDesign, FontAwesome5} from '@expo/vector-icons';
import {router} from 'expo-router';
import BottomTabBar from '@/components/ui/BottomTabBar';
import {useGoalStore} from '@/stores/goalStore';

export default function MainScreen() {
  const {expandStates, handleToggle} = useToggleExpand();
  const [isScrollable, setIsScrollable] = useState(false);

  const {goalData, setSelectedGoalId, selectedGoalId} = useGoalStore(
    state => state,
  );

  const isCompleted = goalData.find(
    goal => goal.id === selectedGoalId,
  )?.isCompleted;

  const {
    goalBottomSheetRef,
    ddayBottomSheetRef,
    listItemBottomSheetRef,
    addTaskBottomSheetRef,
    addGoalBottomSheetRef,
  } = useBottomSheet();

  const linearTransitionAnimation = useMemo(
    () => LinearTransition.duration(ANIMATION_DURATION.LINEAR_TRANSIION),
    [],
  );

  const fadeInAnimation = useMemo(
    () => FadeIn.duration(ANIMATION_DURATION.FADE_IN),
    [],
  );

  const fadeOutAnimation = useMemo(
    () => FadeOut.duration(ANIMATION_DURATION.FADE_IN * 0.6),
    [],
  );

  const componentStyles = {
    lineContainer: styles.lineContainer,
    text: styles.text,
    highlight: styles.highlight,
    dropdownContainer: styles.dropdownContainer,
    dropdownItem: styles.dropdownItem,
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: viewportHeight * 0.08,
          right: viewportWidth * 0.08,
          zIndex: 1000,
          elevation: 1000,
        }}>
        <Pressable
          onPress={() => router.push('/settings')}
          style={{
            padding: 8,
            borderRadius: 20,
          }}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <FontAwesome5
            name="info-circle"
            size={24}
            color="rgb(147, 147, 147)"
          />
        </Pressable>
      </View>

      <BottomTabBar
        goalData={goalData}
        setSelectedGoalId={setSelectedGoalId}
        selectedGoalId={selectedGoalId ?? ''}
        onAddGoal={() => {
          addGoalBottomSheetRef.current?.expand();
        }}
        onToggleExpand={handleToggle}
      />

      {goalData.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Pressable onPress={() => addGoalBottomSheetRef.current?.expand()}>
            <Text style={[componentStyles.text, componentStyles.highlight]}>
              목표를 만들어보세요
            </Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          scrollEnabled={isScrollable}
          showsVerticalScrollIndicator={false}>
          <Animated.View
            style={styles.textContainer}
            layout={linearTransitionAnimation}
            onLayout={e => {
              setIsScrollable(e.nativeEvent.layout.height > viewportHeight);
            }}>
            <GoalSection
              isGoalExpanded={expandStates.goal[0]}
              onToggleGoal={handleToggle}
              styles={componentStyles}
              linearTransitionAnimation={linearTransitionAnimation}
              fadeInAnimation={fadeInAnimation}
              fadeOutAnimation={fadeOutAnimation}
              bottomSheetRef={goalBottomSheetRef}
            />

            <DdaySection
              isDdayExpanded={expandStates.dday[0]}
              onToggleDday={handleToggle}
              styles={componentStyles}
              linearTransitionAnimation={linearTransitionAnimation}
              fadeInAnimation={fadeInAnimation}
              fadeOutAnimation={fadeOutAnimation}
              bottomSheetRef={ddayBottomSheetRef}
              isCompleted={isCompleted ?? false}
            />

            <AchievedSection
              isAchievedExpanded={expandStates.achieved[0]}
              onToggle={handleToggle}
              styles={componentStyles}
              linearTransitionAnimation={linearTransitionAnimation}
              listItemBottomSheetRef={listItemBottomSheetRef}
              isCompleted={isCompleted ?? false}
            />

            {!isCompleted && (
              <TodoSection
                isTodosExpanded={expandStates.todos[0]}
                onToggle={handleToggle}
                styles={componentStyles}
                linearTransitionAnimation={linearTransitionAnimation}
                listItemBottomSheetRef={listItemBottomSheetRef}
                addTaskBottomSheetRef={addTaskBottomSheetRef}
                isScrollable={isScrollable}
              />
            )}
          </Animated.View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'stretch',
    flexDirection: 'column',
    width: Theme.screen.width * Theme.padding.horizontal,
  },
  lineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: '27@ms',
    lineHeight: Theme.lineHeight.relaxed,
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.textSecondary,
  },
  highlight: {
    fontFamily: Theme.fontFamily.bold,
    color: Theme.colors.highlight,
  },
  dropdownContainer: {
    width: '100%',
    borderRadius: Theme.borderRadius.small,
  },
  dropdownItem: {
    fontSize: '20@ms',
    fontFamily: Theme.fontFamily.regular,
    paddingVertical: '4@vs',
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: viewportWidth,
  },
  debugInfo: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    borderRadius: 5,
    zIndex: 1000,
  },
  debugText: {
    fontSize: '12@ms',
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.textSecondary,
  },
});
