import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {Pressable} from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
import {GoalLineProps} from './types';
import {Theme} from '@/constants/Theme';

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
          <Text style={[styles.text, styles.highlight]}>{line} </Text>
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
          까지
        </Animated.Text>
      </View>
    </View>
  );
}

const iconStyles = StyleSheet.create({
  iconContainer: {
    marginRight: Theme.iconSpace.medium,
  },
});
