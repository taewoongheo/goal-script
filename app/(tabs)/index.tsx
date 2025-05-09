import {StyleSheet, View} from 'react-native';
import Animated, {
  LinearTransition,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {useMemo} from 'react';
import {Layout} from '@/constants/Layout';
import {Typography} from '@/constants/Typography';
import {useToggleExpand} from '@/hooks/useToggleExpand';
import {useGoalData} from '@/hooks/useGoalData';
import {GoalSection} from '@/components/mainScreen/GoalSection';
import {DdaySection} from '@/components/mainScreen/DdaySection';
import {getViewportWidth} from '@/utils/viewport';
import {AchievedSection} from '@/components/mainScreen/AchievedSection';
import {TodoSection} from '@/components/mainScreen/TodoSection';
import {ANIMATION_DURATION} from '@/constants/Animation';

// TODO: \u200B 제로 너비 공백 처리 -> 한글영문이 붙어있을 때 바로 줄바꿈되는 문제
//  title: 웹사이트 리뉴얼리qwwqqwqqqwqw뉴qq

export default function MainScreen() {
  const {expandStates, handleToggle} = useToggleExpand();
  const {
    title,
    dDay,
    rDay,
    achieved,
    todos,
    toggleAchievedTask,
    toggleTodoTask,
  } = useGoalData();

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
          title={title}
          icon="trophy"
          isGoalExpanded={expandStates.goal[0]}
          onToggleGoal={handleToggle}
          styles={componentStyles}
          linearTransitionAnimation={linearTransitionAnimation}
          fadeInAnimation={fadeInAnimation}
          fadeOutAnimation={fadeOutAnimation}
        />

        <DdaySection
          dDay={dDay}
          rDay={rDay}
          isDdayExpanded={expandStates.dday[0]}
          onToggleDday={handleToggle}
          styles={componentStyles}
          linearTransitionAnimation={linearTransitionAnimation}
          fadeInAnimation={fadeInAnimation}
          fadeOutAnimation={fadeOutAnimation}
        />

        <AchievedSection
          achievedItems={achieved}
          isAchievedExpanded={expandStates.achieved[0]}
          onToggle={handleToggle}
          styles={componentStyles}
          linearTransitionAnimation={linearTransitionAnimation}
          hasTodoItems={todos.length > 0}
          onUpdateItem={toggleAchievedTask}
        />

        <TodoSection
          todoItems={todos}
          isTodosExpanded={expandStates.todos[0]}
          onToggle={handleToggle}
          styles={componentStyles}
          linearTransitionAnimation={linearTransitionAnimation}
          onUpdateItem={toggleTodoTask}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'stretch',
    flexDirection: 'column',
    width: getViewportWidth() * Layout.padding.horizontal,
  },
  lineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // marginBottom: 4,
    width: '100%',
  },
  text: {
    fontSize: Typography.fontSize.large,
    lineHeight: Typography.lineHeight.relaxed,
    fontFamily: Typography.fontFamily.regular,
    color: '#ACACAC',
  },
  highlight: {
    fontFamily: Typography.fontFamily.bold,
    color: '#2F2F2F',
  },
  dropdownContainer: {
    width: '100%',
    borderRadius: 4,
  },
  dropdownItem: {
    fontSize: Typography.fontSize.medium,
    fontFamily: Typography.fontFamily.regular,
    paddingVertical: 4,
  },
});
