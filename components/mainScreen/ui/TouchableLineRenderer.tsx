import {View, Text, TextStyle, StyleProp} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {tokenizeLineWithDday} from '../utils/utils';

interface TouchableLineRendererProps {
  line: string;
  dDay: number;
  onToggleDday: (_key: ToggleKey) => void;
  textStyle: StyleProp<TextStyle>;
}

function TouchableLineRenderer({
  line,
  dDay,
  onToggleDday,
  textStyle,
}: TouchableLineRendererProps) {
  const {isTouchableDDayToken, parsedTokens} = tokenizeLineWithDday(line, dDay);

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {isTouchableDDayToken ? (
        // 토큰에서 dDay 단어만 touchable 하게 바꾸는 컴포넌트
        parsedTokens.map(el =>
          el[1] ? (
            <TouchableOpacity key={el[2]} onPress={() => onToggleDday('dday')}>
              <Text style={textStyle}>{el[0]} </Text>
            </TouchableOpacity>
          ) : (
            <Text key={el[2]} style={textStyle}>
              {el[0]}{' '}
            </Text>
          ),
        )
      ) : (
        <Text style={textStyle}>{line}</Text>
      )}
    </View>
  );
}

export default TouchableLineRenderer;
