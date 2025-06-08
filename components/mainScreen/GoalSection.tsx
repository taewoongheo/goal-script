import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import {parseLines} from '@/utils/goalText';
import {Theme} from '@/constants/Theme';
import {useGoalStore} from '@/stores/goalStore';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {styles as localStyles} from './goal/styles';
import {GoalLine} from './goal/GoalLine';

interface GoalSectionProps {
  isGoalExpanded: boolean;
  onToggleGoal: (key: ToggleKey) => void;
  styles: any;
  linearTransitionAnimation: any;
  fadeInAnimation: any;
  fadeOutAnimation: any;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export function GoalSection({
  isGoalExpanded,
  onToggleGoal,
  styles,
  linearTransitionAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  bottomSheetRef,
}: GoalSectionProps) {
  const [lines, setLines] = useState<string[] | null>(null);

  const selectedGoalId = useGoalStore(state => state.selectedGoalId);
  const title =
    useGoalStore(
      state => state.goalData.find(g => g.id === selectedGoalId)?.title,
    ) ?? '?';
  const icon =
    useGoalStore(
      state => state.goalData.find(g => g.id === selectedGoalId)?.icon,
    ) ?? '?';
  const isCompleted =
    useGoalStore(
      state => state.goalData.find(g => g.id === selectedGoalId)?.isCompleted,
    ) ?? false;

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
                  isCompleted={isCompleted}
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
              isCompleted={isCompleted}
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
