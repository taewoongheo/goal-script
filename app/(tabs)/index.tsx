import {StyleSheet, View} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {Layout} from '@/constants/Layout';
import {
  academicPaper,
  marathonPreparation,
  // academicPaper,
  // marathonPreparation,
  websiteProject,
} from '@/constants/SampleData';
import {Typography} from '@/constants/Typography';
import {useToggleExpand} from '@/hooks/useToggleExpand';
// Import the new components
import {GoalSection} from '@/components/mainScreen/GoalSection';
import {DdaySection} from '@/components/mainScreen/DdaySection';
import {getViewportWidth} from '@/utils/viewport';
import {ListSection} from '@/components/mainScreen/ListSection';

// TODO: \u200B 제로 너비 공백 처리 -> 한글영문이 붙어있을 때 바로 줄바꿈되는 문제
//  title: 웹사이트 리뉴얼리qwwqqwqqqwqw뉴qq

const sampleData = marathonPreparation;

const goal = sampleData.title;
const dDay = sampleData.dDay.remainingDays;
const rDay = sampleData.dDay.date;
const {achieved} = sampleData;
const {todos} = sampleData;

const ANIMATION_DURATION = 400;

export default function MainScreen() {
  const {expandStates, handleToggle} = useToggleExpand();

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
        layout={LinearTransition.duration(ANIMATION_DURATION)}>
        {/* Use GoalSection */}
        <GoalSection
          goal={goal}
          isGoalExpanded={expandStates.goal[0]}
          onToggleGoal={handleToggle}
          styles={componentStyles}
        />

        {/* Use DdaySection */}
        <DdaySection
          dDay={dDay}
          rDay={rDay}
          isDdayExpanded={expandStates.dday[0]}
          onToggleDday={handleToggle}
          styles={componentStyles}
        />

        <ListSection
          achievedItems={achieved}
          todoItems={todos}
          isAchievedExpanded={expandStates.achieved[0]}
          isTodosExpanded={expandStates.todos[0]}
          onToggle={handleToggle}
          styles={componentStyles}
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
    marginBottom: 4,
    width: '100%',
  },
  text: {
    fontSize: Typography.fontSize.large,
    fontWeight: Typography.fontWeight.regular,
    lineHeight: Typography.lineHeight.relaxed,
  },
  highlight: {
    fontWeight: Typography.fontWeight.bold,
    color: '#007AFF',
  },
  dropdownContainer: {
    width: '100%',
    // backgroundColor: '#f0f0f0',
    // padding: 10,
    borderRadius: 4,
  },
  dropdownItem: {
    fontSize: Typography.fontSize.medium,
    paddingVertical: 4,
  },
});
