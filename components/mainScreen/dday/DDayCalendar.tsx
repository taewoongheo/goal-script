import React from 'react';
import {StyleSheet} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import '@/constants/CalendarLocale';

interface DDayCalendarProps {
  selectedDate: string;
  todayFormatted: string;
  markedDates: {[key: string]: any};
  onDateSelect: (date: DateData) => void;
}

export function DDayCalendar({
  selectedDate,
  todayFormatted,
  markedDates,
  onDateSelect,
}: DDayCalendarProps) {
  return (
    <Calendar
      style={styles.calendar}
      onDayPress={onDateSelect}
      markedDates={markedDates}
      current={selectedDate}
      firstDay={0}
      hideExtraDays={false}
      disableAllTouchEventsForDisabledDays
      enableSwipeMonths
      showWeekNumbers={false}
      markingType="custom"
      minDate={todayFormatted}
      theme={{
        backgroundColor: Colors.light.calendarBackground,
        calendarBackground: Colors.light.calendarBackground,
        textSectionTitleColor: Theme.colors.textSecondary,
        todayTextColor: Theme.colors.highlight,
        dayTextColor: Theme.colors.highlight,
        textDisabledColor: Theme.colors.textSecondary,
        arrowColor: Theme.colors.highlight,
        monthTextColor: Theme.colors.highlight,
        indicatorColor: Theme.colors.highlight,
        textDayFontFamily: Theme.fontFamily.regular,
        textMonthFontFamily: Theme.fontFamily.semiBold,
        textDayHeaderFontFamily: Theme.fontFamily.semiBold,
        textDayFontSize: Theme.fontSize.small,
        textMonthFontSize: Theme.fontSize.small,
        textDayHeaderFontSize: Theme.fontSize.small,
        borderRadius: Theme.borderRadius.small,
        dayShape: 'square',
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    // borderRadius: Theme.borderRadius.medium,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
});
