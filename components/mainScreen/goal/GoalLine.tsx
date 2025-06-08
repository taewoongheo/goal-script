import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {Pressable} from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import {Theme} from '@/constants/Theme';
import {GoalLineProps} from './types';

export function GoalLine({
  line,
  isLastLine,
  onToggleGoal,
  isGoalExpanded,
  styles,
  linearTransitionAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  bottomSheetRef,
  isCompleted,
}: GoalLineProps) {
  if (!isLastLine) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={onToggleGoal}>
          <Text style={[styles.text, styles.highlight]}>{line}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.lineContainer}>
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={onToggleGoal}>
          <Text style={[styles.text, styles.highlight]}>{line}</Text>
        </Pressable>
        <Animated.View
          style={{overflow: 'hidden'}}
          layout={linearTransitionAnimation}>
          {isGoalExpanded && (
            <Pressable
              android_ripple={null}
              onPress={() => bottomSheetRef.current?.expand()}>
              <Animated.Text
                entering={fadeInAnimation}
                exiting={fadeOutAnimation}
                style={[
                  styles.text,
                  styles.highlight,
                  iconStyles.iconContainer,
                ]}>
                <Ionicons
                  name="settings-sharp"
                  size={Theme.iconSize.medium}
                  color={Theme.colors.highlight}
                />
              </Animated.Text>
            </Pressable>
          )}
        </Animated.View>
        <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
          {isCompleted ? '성공' : '까지'}
        </Animated.Text>
      </View>
    </View>
  );
}

const iconStyles = StyleSheet.create({
  iconContainer: {
    marginHorizontal: Theme.iconSpace.small,
    backgroundColor: Theme.colors.lineHighlight,
    borderRadius: Theme.borderRadius.small,
    paddingHorizontal: Theme.iconSpace.small,
  },
});
