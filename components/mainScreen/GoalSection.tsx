import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import {parseLines} from '@/utils/goalText';
import {GoalSectionProps} from './goal/types';
import {GoalLine} from './goal/GoalLine';
import {styles as localStyles} from './goal/styles';

export function GoalSection({
  title,
  icon,
  isGoalExpanded,
  onToggleGoal,
  styles,
  linearTransitionAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  bottomSheetRef,
}: GoalSectionProps) {
  const [lines, setLines] = useState<string[] | null>(null);

  return (
    <View style={styles.lineContainer}>
      <View style={localStyles.container}>
        <Pressable onPress={() => bottomSheetRef.current?.expand()}>
          <SimpleLineIcons
            name={icon as any}
            size={25}
            color="black"
            style={{marginRight: 6}}
          />
        </Pressable>

        {lines?.map((line, index) => (
          <GoalLine
            key={`${line}-${index}`}
            line={line}
            isLastLine={index === lines.length - 1}
            onToggleGoal={() => onToggleGoal('goal')}
            isGoalExpanded={isGoalExpanded}
            styles={styles}
            linearTransitionAnimation={linearTransitionAnimation}
            fadeInAnimation={fadeInAnimation}
            fadeOutAnimation={fadeOutAnimation}
            bottomSheetRef={bottomSheetRef}
          />
        ))}
      </View>

      {/* hidden lines */}
      <Text
        style={[styles.text, localStyles.hiddenText]}
        onTextLayout={e => {
          const texts = e.nativeEvent.lines.map(l => l.text);
          if (texts === null) return;
          setLines(parseLines(texts));
        }}>
        ✅ {title} 까지
      </Text>
    </View>
  );
}
