import {Layout} from '@/constants/Layout';
import {
  academicPaper,
  marathonPreparation,
  websiteProject,
} from '@/constants/SampleData';
import {Typography} from '@/constants/Typography';
import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {LinearTransition} from 'react-native-reanimated';

const sampleData = websiteProject;

const goal = sampleData.title;
const {description} = sampleData;
const dDay = sampleData.dDay.remainingDays;
const rDay = sampleData.dDay.date;
const [...achieved] = sampleData.achieved;
const [...todos] = sampleData.todos;

const ANIMATION_DURATION = 400;

type ToggleKey = 'goal' | 'dday' | 'achieved' | 'todos';

export default function MainScreen() {
  const [goalExpand, setGoalExpand] = useState<boolean>(false);
  const [ddayExpand, setDdayExpand] = useState<boolean>(false);
  const [achievedExpand, setAchievedExpand] = useState<boolean>(false);
  const [todosExpand, setTodosExpand] = useState<boolean>(false);

  const expandStates = {
    goal: [goalExpand, setGoalExpand] as const,
    dday: [ddayExpand, setDdayExpand] as const,
    achieved: [achievedExpand, setAchievedExpand] as const,
    todos: [todosExpand, setTodosExpand] as const,
  };

  const handleToggle = (key: ToggleKey) => {
    Object.entries(expandStates).forEach(([k, [, setter]]) => {
      if (k === key) {
        setter(prev => !prev);
      } else {
        setter(false);
      }
    });
  };

  // https://x.com/vaunblu/status/1830961902299816296

  // 줄바꿈 시 줄바꿈 되는 텍스트를 별도의 View 로 만듦.
  // 마지막 View 에 확장 애니메이션 넣기

  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.textContainer}
        layout={LinearTransition.duration(ANIMATION_DURATION)}>
        {/* {goal} line */}
        <View style={styles.lineContainer}>
          <Text style={styles.text}>
            <Text onPress={() => handleToggle('goal')} style={styles.highlight}>
              {goal}
            </Text>
            <Text>까지</Text>
            {/* 추후 {goal} 이 두 줄 이상 넘어갈 시 {d day} 를 여기에 붙이기 */}
          </Text>
        </View>

        {goalExpand ? (
          <View>
            <Text>{description}</Text>
          </View>
        ) : null}

        {/* {d day} line */}
        <View style={styles.lineContainer}>
          <Text style={styles.text}>
            <Text onPress={() => handleToggle('dday')} style={styles.highlight}>
              D-{dDay}
            </Text>
            {ddayExpand ? <Text style={styles.highlight}>{rDay}</Text> : null}
            <Text>남았어요</Text>
          </Text>
        </View>

        {/* {achieved} line */}
        <View style={styles.lineContainer}>
          <TouchableOpacity onPress={() => handleToggle('achieved')}>
            <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
              {achieved[0]}
            </Text>
          </TouchableOpacity>

          {achievedExpand && (
            <View style={styles.dropdownContainer}>
              {achieved.map((el, index) => (
                <Text key={`${el}${index + 1}`} style={styles.dropdownItem}>
                  {el}
                </Text>
              ))}
            </View>
          )}

          <Text style={styles.text}>들을 완료했고, </Text>
        </View>

        <View style={styles.lineContainer}>
          <TouchableOpacity onPress={() => handleToggle('todos')}>
            <Text numberOfLines={1} style={[styles.text, styles.highlight]}>
              {todos[0]}
            </Text>
          </TouchableOpacity>

          {todosExpand && (
            <View style={styles.dropdownContainer}>
              {todos.map((el, index) => (
                <Text key={`${el}${index + 1}`} style={styles.dropdownItem}>
                  {el}
                </Text>
              ))}
            </View>
          )}

          <Text style={styles.text}>들이 남았어요.</Text>
        </View>
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
    backgroundColor: 'red',
  },
  dropdownItem: {},
});
