import {Layout} from '@/constants/Layout';
import {
  academicPaper,
  marathonPreparation,
  websiteProject,
} from '@/constants/SampleData';
import {Typography} from '@/constants/Typography';
import {StyleSheet, View} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {useToggleExpand} from '@/hooks/useToggleExpand';
import {ListSection} from '@/components/mainScreen/ListSection';
import {GoalAndDDaySection} from '@/components/mainScreen/GoalAndDDaySection';

const sampleData = websiteProject;

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
        {/* Use GoalDDaySection component */}
        <GoalAndDDaySection
          goal={goal}
          dDay={dDay}
          rDay={rDay}
          isDdayExpanded={expandStates.dday[0]}
          onToggleDday={handleToggle}
          styles={componentStyles}
        />

        {/* ListSection for Achieved */}
        <ListSection
          items={achieved}
          isExpanded={expandStates.achieved[0]}
          onToggle={handleToggle}
          toggleKey="achieved"
          suffixText="들을 완료했고, "
          styles={componentStyles}
        />

        {/* ListSection for Todos */}
        <ListSection
          items={todos}
          isExpanded={expandStates.todos[0]}
          onToggle={handleToggle}
          toggleKey="todos"
          suffixText="들이 남았어요."
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
    paddingHorizontal: Layout.padding.horizontal,
  },
  textContainer: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  lineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4,
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
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginTop: 4,
    borderRadius: 4,
  },
  dropdownItem: {
    fontSize: Typography.fontSize.medium,
    paddingVertical: 4,
  },
});
