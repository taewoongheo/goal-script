import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {parseLines} from '@/utils/goalText';
import {GoalSectionProps} from './goal/types';
import {GoalLine} from './goal/GoalLine';
import {styles as localStyles} from './goal/styles';
import {Theme} from '@/constants/Theme';

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
        {lines?.map((line, index) => {
          if (index === 0) {
            return (
              <View key={`${line}-${index}`} style={firstLineStyles.container}>
                <Pressable onPress={() => onToggleGoal}>
                  <FontAwesome5
                    name={icon as any}
                    size={Theme.iconSize.medium}
                    color={Theme.colors.highlight}
                    style={localStyles.iconContainer}
                  />
                </Pressable>
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
              </View>
            );
          }
          return (
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
          );
        })}
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

const firstLineStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },
});
