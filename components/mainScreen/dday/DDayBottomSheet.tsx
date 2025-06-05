import React from 'react';
import {View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';
import {useDDayState} from '@/hooks/useDDayState';
import {useMarkedDates} from '@/hooks/useMarkedDates';
import {DDayHeader} from './DDayHeader';
import {DDayCalendar} from './DDayCalendar';

interface DDayBottomSheetProps {
  initialDate?: string;
  onSaveDate?: (date: string) => void;
  onCancel?: () => void;
  dDay?: number;
}

export function DDayBottomSheet({
  initialDate,
  onSaveDate,
  onCancel,
  dDay = 0,
}: DDayBottomSheetProps) {
  const {todayFormatted, selectedDate, calculatedDDay, handleDateSelect} =
    useDDayState({
      initialDate,
      dDay,
      onSaveDate,
    });

  const {markedDates} = useMarkedDates({
    selectedDate,
    todayFormatted,
  });

  return (
    <View style={styles.container}>
      <DDayCalendar
        selectedDate={selectedDate}
        todayFormatted={todayFormatted}
        markedDates={markedDates}
        onDateSelect={handleDateSelect}
      />

      <View style={styles.divider} />

      <DDayHeader calculatedDDay={calculatedDDay} selectedDate={selectedDate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.large,
    paddingVertical: Theme.spacing.medium,
    backgroundColor: Colors.light.white,
    marginBottom: scale(90),
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.lightGray,
    marginVertical: Theme.spacing.medium,
  },
});
