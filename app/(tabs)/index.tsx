import {Layout} from '@/constants/Layout';
import {websiteProject} from '@/constants/SampleData';
import {Typography} from '@/constants/Typography';
import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  EntryAnimationsValues,
  FadeIn,
  FadeInLeft,
  LinearTransition,
  withSpring,
} from 'react-native-reanimated';

const sampleData = websiteProject;

const goal = sampleData.title;
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
  const ExpandWidthFromLeft = (targetValues: EntryAnimationsValues) => {
    'worklet';

    return {
      initialValues: {width: 0},
      animations: {
        width: withSpring(targetValues.targetWidth, {
          duration: ANIMATION_DURATION,
        }),
      },
    };
  };

  // TODO:
  //  텍스트가 먼저 FadeOut 되고 레이아웃이 줄어들어야 함

  const ShrinkWidthFromRight = (currentValues: {currentWidth: number}) => {
    'worklet';

    return {
      initialValues: {width: currentValues.currentWidth},
      animations: {
        width: withSpring(0, {
          duration: ANIMATION_DURATION,
        }),
      },
    };
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.textContainer}
        layout={LinearTransition.duration(ANIMATION_DURATION)}>
        <View style={styles.lineContainer}>
          <TouchableOpacity
            onPress={() => handleToggle('goal')}
            style={styles.expandContainer}>
            <Text style={[styles.text, styles.highlight]}>{goal}</Text>
            {goalExpand && (
              <Animated.View
                entering={ExpandWidthFromLeft}
                exiting={ShrinkWidthFromRight}
                style={[
                  {
                    overflow: 'hidden',
                    flexDirection: 'row',
                    backgroundColor: 'gray',
                  },
                ]}>
                <Animated.Text
                  entering={FadeIn.duration(ANIMATION_DURATION)}
                  style={[styles.text, styles.highlight]}>
                  설정
                </Animated.Text>
              </Animated.View>
            )}
          </TouchableOpacity>

          <Animated.Text
            layout={LinearTransition.springify().duration(ANIMATION_DURATION)}
            style={styles.text}>
            까지{' '}
          </Animated.Text>

          <Animated.View
            layout={LinearTransition.springify().duration(ANIMATION_DURATION)}>
            <TouchableOpacity
              onPress={() => handleToggle('dday')}
              style={styles.expandContainer}>
              <Text style={[styles.text, styles.highlight]}>D-{dDay}</Text>
              {ddayExpand && (
                <Text style={[styles.text, styles.highlight]}>({rDay})</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* <Animated.Text
            layout={LinearTransition.springify().duration(ANIMATION_DURATION)}
            style={styles.text}>
            남았어요.
          </Animated.Text> */}
        </View>

        <View style={styles.lineContainer}>
          {/* <Text style={styles.text}>지금까지 </Text> */}

          <TouchableOpacity onPress={() => handleToggle('achieved')}>
            <Text style={[styles.text, styles.highlight]}>{achieved[0]}</Text>
          </TouchableOpacity>

          {achievedExpand && (
            <View style={styles.dropdown}>
              {achieved.map((el, index) => (
                <Text key={`${el}${index + 1}`} style={styles.dropdownItem}>
                  {el}
                </Text>
              ))}
            </View>
          )}

          <Text style={styles.text}>들을 완료했고, </Text>
          {/* <Text style={styles.text}>앞으로 </Text> */}

          <TouchableOpacity onPress={() => handleToggle('todos')}>
            <Text style={[styles.text, styles.highlight]}>{todos[0]}</Text>
          </TouchableOpacity>

          {todosExpand && (
            <View style={styles.dropdown}>
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
    paddingHorizontal: Layout.padding.horizontal,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  expandContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  dropdown: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownItem: {
    fontSize: Typography.fontSize.medium,
    paddingVertical: 5,
  },
});
