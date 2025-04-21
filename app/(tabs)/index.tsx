import {Layout} from '@/constants/Layout';
import {Typography} from '@/constants/Typography';
import {StyleSheet, View, Text} from 'react-native';

export default function MainScreen() {
  const goal = '(목표)';
  const dDay = '(디데이)';
  const achieved = '(달성한 일들)';
  const remaining = '(할 일들)';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.highlight}>{goal}</Text>까지{' '}
        <Text style={styles.highlight}>{dDay}</Text> 남았어요.
      </Text>
      <Text style={styles.text}>
        지금까지 <Text style={styles.highlight}>{achieved}</Text>을 해냈고,
      </Text>
      <Text style={styles.text}>
        앞으로 <Text style={styles.highlight}>{remaining}</Text>이 남았어요.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Layout.padding.horizontal,
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
