import {useMemo} from 'react';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';

interface UseMarkedDatesProps {
  selectedDate: string;
  todayFormatted: string;
}

export function useMarkedDates({
  selectedDate,
  todayFormatted,
}: UseMarkedDatesProps) {
  const markedDates = useMemo(() => {
    const result: {[key: string]: any} = {};

    result[todayFormatted] = {
      customStyles: {
        container: {
          backgroundColor: Colors.light.lightGray,
          borderRadius: Theme.borderRadius.small,
        },
        text: {
          fontFamily: Theme.fontFamily.regular,
          color: Theme.colors.highlight,
        },
      },
    };

    if (selectedDate) {
      result[selectedDate] = {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: Theme.colors.highlight,
            borderRadius: Theme.borderRadius.small,
          },
          text: {
            fontFamily: Theme.fontFamily.semiBold,
            color: Colors.light.white,
          },
        },
      };
    }

    return result;
  }, [selectedDate, todayFormatted]);

  return {markedDates};
}
