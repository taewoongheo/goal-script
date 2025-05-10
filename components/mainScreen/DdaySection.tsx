import React from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {DdaySectionProps} from './dday/types';

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
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
          onPress={() => onToggleDday('dday')}>
          <FontAwesome
            name="calendar"
            size={25}
            color="black"
            style={{marginRight: 6}}
          />
          <Text style={[styles.text, styles.highlight]}>D-{dDay} </Text>
        </Pressable>
        <Animated.View
          style={{overflow: 'hidden'}}
          layout={linearTransitionAnimation}>
          {isDdayExpanded && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Pressable
                onPress={() => bottomSheetRef.current?.expand()}
                android_ripple={null}>
                <Animated.Text
                  entering={fadeInAnimation}
                  exiting={fadeOutAnimation}
                  style={[styles.text, styles.highlight, {marginRight: 6}]}>
                  {rDay}{' '}
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
