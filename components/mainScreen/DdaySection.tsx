import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {FontAwesome} from '@expo/vector-icons';
import {DdaySectionProps} from './dday/types';
import {Theme} from '@/constants/Theme';

export function DdaySection({
  dDay,
  rDay,
  isDdayExpanded,
  onToggleDday,
  styles,
  linearTransitionAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  bottomSheetRef,
}: DdaySectionProps) {
  return (
    <View style={styles.lineContainer}>
      <View style={localStyles.row}>
        <Pressable
          style={localStyles.calendarButton}
          onPress={() => onToggleDday('dday')}>
          <FontAwesome
            name="calendar"
            size={Theme.iconSize.medium}
            color={Theme.colors.highlight}
            style={localStyles.iconContainer}
          />
          <Text style={[styles.text, styles.highlight]}>D-{dDay} </Text>
        </Pressable>
        <Animated.View
          style={localStyles.overflowContainer}
          layout={linearTransitionAnimation}>
          {isDdayExpanded && (
            <View style={localStyles.expandedContent}>
              <Pressable
                onPress={() => bottomSheetRef.current?.expand()}
                style={localStyles.calendarButtonContainer}
                android_ripple={null}>
                <Animated.Text
                  entering={fadeInAnimation}
                  exiting={fadeOutAnimation}
                  style={[styles.text, styles.highlight]}>
                  {rDay}
                </Animated.Text>
              </Pressable>
            </View>
          )}
        </Animated.View>
        <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
          남았어요
        </Animated.Text>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: Theme.iconSpace.medium,
  },
  overflowContainer: {
    overflow: 'hidden',
  },
  expandedContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarButtonContainer: {
    marginRight: Theme.iconSpace.small,
    backgroundColor: Theme.colors.lineHighlight,
    borderRadius: Theme.borderRadius.small,
    paddingHorizontal: Theme.iconSpace.small,
  },
});
