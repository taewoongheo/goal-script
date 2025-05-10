import React, {useState, useEffect} from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import Animated, {
  EntryAnimationsValues,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {ANIMATION_DURATION} from '@/constants/Animation';
import {FontAwesome5, Ionicons, SimpleLineIcons} from '@expo/vector-icons';
import {getViewportWidth} from '@/utils/viewport';
import {Pressable} from 'react-native-gesture-handler';
import {Layout as LayoutConstants} from '@/constants/Layout';

interface GoalSectionProps {
  title: string;
  icon: string;
  isGoalExpanded: boolean;
  onToggleGoal: (_key: ToggleKey) => void;
  styles: {
    lineContainer: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
    highlight: StyleProp<TextStyle>;
  };
  linearTransitionAnimation: any;
  fadeInAnimation: any;
  fadeOutAnimation: any;
}

export function GoalSection({
  title,
  icon,
  isGoalExpanded,
  onToggleGoal,
  styles,
  linearTransitionAnimation,
  fadeInAnimation,
  fadeOutAnimation,
}: GoalSectionProps) {
  const [lines, setLines] = useState<string[] | null>(null);

  console.log(lines);

  return (
    <View style={styles.lineContainer}>
      {/* visible lines */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <SimpleLineIcons
          name={icon as any}
          size={25}
          color="black"
          style={{marginRight: 6}}
        />

        {lines?.map((line, index) => {
          if (index === lines.length - 1) {
            return (
              <View key={`${line}-${index}`} style={styles.lineContainer}>
                <View style={{flexDirection: 'row'}}>
                  <Pressable onPress={() => onToggleGoal('goal')}>
                    <Text style={[styles.text, styles.highlight]}>{line} </Text>
                  </Pressable>
                  <Animated.View
                    style={{
                      overflow: 'hidden',
                    }}
                    layout={linearTransitionAnimation}>
                    {isGoalExpanded && (
                      <Pressable
                        android_ripple={null}
                        onPress={() => console.log('settings')}>
                        <Animated.Text
                          entering={fadeInAnimation}
                          exiting={fadeOutAnimation}
                          style={[
                            styles.text,
                            styles.highlight,
                            {marginRight: 6},
                          ]}>
                          <Ionicons
                            name="settings-sharp"
                            size={24}
                            color="black"
                          />
                        </Animated.Text>
                      </Pressable>
                    )}
                  </Animated.View>
                  <Animated.Text
                    layout={linearTransitionAnimation}
                    style={styles.text}>
                    까지
                  </Animated.Text>
                </View>
              </View>
            );
          }
          return (
            <View key={index} style={{flexDirection: 'row'}}>
              <Pressable
                onPress={() => {
                  onToggleGoal('goal');
                }}>
                <Text style={[styles.text, styles.highlight]}>{line}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>

      {/* hidden lines */}
      <Text
        style={[
          styles.text,
          {
            position: 'absolute',
            width: getViewportWidth() * LayoutConstants.padding.horizontal,
            top: 1000,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            zIndex: -1,
          },
        ]}
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

function parseLines(lines: string[]): string[] {
  const trimLines = lines.map(el => el.trim());
  const len = trimLines.length;
  const lastLine = trimLines[len - 1];

  if (lastLine === '지') {
    trimLines[len - 2] = trimLines[len - 2].substring(
      0,
      trimLines[len - 2].length - 1,
    );
    trimLines[len - 1] = '';
  } else {
    trimLines[len - 1] = lastLine.substring(0, lastLine.length - 2);
  }

  const firstLine = trimLines[0].split(' ');
  firstLine.shift();
  trimLines[0] = firstLine.join(' ');

  return trimLines.map(el => el.trim()).filter(el => el.length > 0);
}
