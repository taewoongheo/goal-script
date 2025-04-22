import {Layout} from '@/constants/Layout';
import {Typography} from '@/constants/Typography';
import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const goal = '(목표)';
const dDay = '(디데이)';
const achieved = '(달성한 일들)';
const remaining = '(할 일들)';

type ToggleKey = 'goal' | 'dday';

export default function MainScreen() {
  const [goalExtend, setGoalExtend] = useState<boolean>(false);
  const [ddayExtend, setDdayExtend] = useState<boolean>(false);

  const extendStates = {
    goal: [goalExtend, setGoalExtend] as const,
    dday: [ddayExtend, setDdayExtend] as const,
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
        <TouchableOpacity onPress={() => handleToggle('goal')}>
          <View style={styles.extendContainer}>
            <Text style={[styles.text, styles.highlight]}>{goal}</Text>
            {goalExtend && (
              <Text style={[styles.text, styles.highlight]}>설정</Text>
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>까지 </Text>
        <TouchableOpacity onPress={() => handleToggle('dday')}>
          <View style={styles.extendContainer}>
            <Text style={[styles.text, styles.highlight]}>{dDay}</Text>
            {ddayExtend && (
              <Text style={[styles.text, styles.highlight]}>날짜</Text>
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>남았어요.</Text>

        <Text style={styles.text}>지금까지 </Text>
        <TouchableOpacity>
          <Text style={[styles.text, styles.highlight]}>{achieved}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>을 해냈고,</Text>

        <Text style={styles.text}>앞으로 </Text>
        <TouchableOpacity>
          <Text style={[styles.text, styles.highlight]}>{remaining}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>이 남았어요.</Text>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  extendContainer: {
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
});
