import {View} from 'react-native';
import Animated, {
  LinearTransition,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {useMemo} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {useToggleExpand} from '@/hooks/useToggleExpand';
import {GoalSection} from '@/components/mainScreen/GoalSection';
import {DdaySection} from '@/components/mainScreen/DdaySection';
import {AchievedSection} from '@/components/mainScreen/AchievedSection';
import {TodoSection} from '@/components/mainScreen/TodoSection';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {useBottomSheet} from '@/contexts/BottomSheetContext';
import {Theme} from '@/constants/Theme';

export default function MainScreen() {
  const {expandStates, handleToggle} = useToggleExpand();

  const {
    goalBottomSheetRef,
    ddayBottomSheetRef,
    listItemBottomSheetRef,
    addTaskBottomSheetRef,
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
      <Animated.View
        style={styles.textContainer}
        layout={linearTransitionAnimation}>
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
        />

        <AchievedSection
          isAchievedExpanded={expandStates.achieved[0]}
          onToggle={handleToggle}
          styles={componentStyles}
          linearTransitionAnimation={linearTransitionAnimation}
          listItemBottomSheetRef={listItemBottomSheetRef}
        />

        <TodoSection
          isTodosExpanded={expandStates.todos[0]}
          onToggle={handleToggle}
          styles={componentStyles}
          linearTransitionAnimation={linearTransitionAnimation}
          listItemBottomSheetRef={listItemBottomSheetRef}
          addTaskBottomSheetRef={addTaskBottomSheetRef}
        />
      </Animated.View>
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
});
