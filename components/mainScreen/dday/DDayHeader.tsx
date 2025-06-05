import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {Theme} from '@/constants/Theme';
import {dateUtils} from '@/utils/dateUtils';

interface DDayHeaderProps {
  calculatedDDay: number;
  selectedDate: string;
}

export function DDayHeader({calculatedDDay, selectedDate}: DDayHeaderProps) {
  return (
    <View style={styles.header}>
      <FontAwesome
        name="calendar"
        size={Theme.iconSize.medium}
        color={Theme.colors.highlight}
      />
      <Text style={styles.headerText}>
        {calculatedDDay > 0 ? `D-${calculatedDDay}` : 'D-Day'}
      </Text>

      <Text style={styles.selectedDateBadge}>
        {dateUtils.formatToAppDate(dateUtils.parseDate(selectedDate))}
      </Text>
      {calculatedDDay > 0 && <Text style={styles.remainingText}>남았어요</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.small,
  },
  headerText: {
    fontSize: Theme.fontSize.medium,
    fontFamily: Theme.fontFamily.bold,
    color: Theme.colors.highlight,
    marginLeft: Theme.spacing.small,
  },
  selectedDateBadge: {
    marginLeft: Theme.spacing.small,
    fontSize: Theme.fontSize.medium,
    fontFamily: Theme.fontFamily.bold,
    color: Theme.colors.highlight,
    marginRight: Theme.iconSpace.small,
    backgroundColor: Theme.colors.lineHighlight,
    borderRadius: Theme.borderRadius.small,
    paddingHorizontal: Theme.iconSpace.medium,
    paddingVertical: Theme.iconSpace.small,
  },
  remainingText: {
    fontSize: Theme.fontSize.medium,
    fontFamily: Theme.fontFamily.regular,
    color: Theme.colors.textSecondary,
  },
});
