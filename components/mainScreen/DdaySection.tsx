import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {FontAwesome} from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import {Theme} from '@/constants/Theme';
import {useGoalStore} from '@/stores/goalStore';
import {ToggleKey} from '@/hooks/useToggleExpand';
import {dateUtils} from '@/utils/dateUtils';

interface DdaySectionProps {
  isDdayExpanded: boolean;
  onToggleDday: (key: ToggleKey) => void;
  styles: any;
  linearTransitionAnimation: any;
  fadeInAnimation: any;
  fadeOutAnimation: any;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export function DdaySection({
  isDdayExpanded,
  onToggleDday,
  styles,
  linearTransitionAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  bottomSheetRef,
}: DdaySectionProps) {
  const dDay = useGoalStore(state => state.goalData?.dDay.remainingDays) ?? 0;
  const rDay = useGoalStore(state => state.goalData?.dDay.date) ?? '??';

  const dDayText = dDay > 0 ? `D-${dDay}` : 'D-Day';

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
          <Text style={[styles.text, styles.highlight]}>{dDayText} </Text>
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
                  {dateUtils.formatToAppDate(dateUtils.parseDate(rDay))}
                </Animated.Text>
              </Pressable>
            </View>
          )}
        </Animated.View>
        {dDay > 0 && (
          <Animated.Text layout={linearTransitionAnimation} style={styles.text}>
            남았어요
          </Animated.Text>
        )}
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
