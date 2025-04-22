import {Layout} from '@/constants/Layout';
import {Typography} from '@/constants/Typography';
import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const goal = '(목표)';
const dDay = '(디데이)';
const achieved = '(달성한 일들)';
const todos = '(할 일들)';

type ToggleKey = 'goal' | 'dday' | 'achieved' | 'todos';

export default function MainScreen() {
  const [goalExtend, setGoalExtend] = useState<boolean>(false);
  const [ddayExtend, setDdayExtend] = useState<boolean>(false);
  const [achievedExtend, setAchievedExtend] = useState<boolean>(false);
  const [todosExtend, setTodosExtend] = useState<boolean>(false);

  const extendStates = {
    goal: [goalExtend, setGoalExtend] as const,
    dday: [ddayExtend, setDdayExtend] as const,
    achieved: [achievedExtend, setAchievedExtend] as const,
    todos: [todosExtend, setTodosExtend] as const,
  };

  const handleToggle = (key: ToggleKey) => {
    Object.entries(extendStates).forEach(([k, [, setter]]) => {
      if (k === key) {
        setter(prev => !prev);
      } else {
        setter(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.lineContainer}>
          <TouchableOpacity
            onPress={() => handleToggle('goal')}
            style={styles.extendContainer}>
            <Text style={[styles.text, styles.highlight]}>{goal}</Text>
            {goalExtend && (
              <Text style={[styles.text, styles.highlight]}>설정</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.text}>까지 </Text>
          <TouchableOpacity
            onPress={() => handleToggle('dday')}
            style={styles.extendContainer}>
            <Text style={[styles.text, styles.highlight]}>{dDay}</Text>
            {ddayExtend && (
              <Text style={[styles.text, styles.highlight]}>날짜</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.text}>남았어요.</Text>
        </View>

        <View style={styles.lineContainer}>
          <Text style={styles.text}>지금까지 </Text>

          <TouchableOpacity onPress={() => handleToggle('achieved')}>
            <Text style={[styles.text, styles.highlight]}>{achieved}</Text>
          </TouchableOpacity>

          {achievedExtend && (
            <View style={styles.dropdown}>
              <Text style={styles.dropdownItem}>• 첫 번째 달성 항목</Text>
              <Text style={styles.dropdownItem}>• 두 번째 달성 항목</Text>
              <Text style={styles.dropdownItem}>• 세 번째 달성 항목</Text>
            </View>
          )}

          <Text style={styles.text}>들을 해냈고, </Text>
          <Text style={styles.text}>앞으로 </Text>

          <TouchableOpacity onPress={() => handleToggle('todos')}>
            <Text style={[styles.text, styles.highlight]}>{todos}</Text>
          </TouchableOpacity>

          {todosExtend && (
            <View style={styles.dropdown}>
              <Text style={styles.dropdownItem}>• 첫 번째 할 일</Text>
              <Text style={styles.dropdownItem}>• 두 번째 할 일</Text>
              <Text style={styles.dropdownItem}>• 세 번째 할 일</Text>
            </View>
          )}

          <Text style={styles.text}>들이 남았어요.</Text>
        </View>
      </View>
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
  extendContainer: {
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
