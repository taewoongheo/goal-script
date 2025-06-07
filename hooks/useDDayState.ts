import {useState, useCallback, useMemo, useEffect} from 'react';
import {DateData} from 'react-native-calendars';
import {dateUtils} from '@/utils/dateUtils';

interface UseDDayStateProps {
  initialDate?: string;
  dDay?: number;
  onSaveDate?: (date: string) => void;
}

export function useDDayState({
  initialDate,
  dDay = 0,
  onSaveDate,
}: UseDDayStateProps) {
  console.log('initialDate', initialDate);

  // 오늘 날짜 (시간은 00:00:00으로 설정)
  const today = useMemo(() => dateUtils.getToday(), []);

  // 오늘 날짜를 캘린더에서 사용하는 YYYY-MM-DD 형식으로 변환
  const todayFormatted = useMemo(
    () => dateUtils.formatToISODate(today),
    [today],
  );

  // 초기 날짜 문자열을 캘린더에서 사용하는 YYYY-MM-DD 형식으로 변환
  const parseInitialDate = useCallback(
    (dateString?: string): string => {
      if (!dateString) return dateUtils.formatToISODate(today);

      const date = dateUtils.parseDate(dateString);
      return dateUtils.formatToISODate(date);
    },
    [today],
  );

  // 선택된 날짜 (캘린더에서 사용하는 YYYY-MM-DD 형식)
  const [selectedDate, setSelectedDate] = useState<string>(
    parseInitialDate(initialDate),
  );

  // 계산된 D-day 값 (선택된 날짜 - 오늘)
  const [calculatedDDay, setCalculatedDDay] = useState<number>(dDay);

  // 오늘 날짜와 선택된 날짜의 차이 계산
  const calculateDDay = useCallback(
    (dateString: string) => {
      const date = new Date(dateString);
      const daysDiff = dateUtils.getDaysDifference(today, date);
      return daysDiff;
    },
    [today],
  );

  // DDay 계산
  useEffect(() => {
    if (initialDate) {
      const initialDateObj = dateUtils.parseDate(initialDate);
      const days = dateUtils.getDaysDifference(today, initialDateObj);
      setCalculatedDDay(days);
    }
  }, [initialDate, today]);

  const handleDateSelect = useCallback(
    (date: DateData) => {
      setSelectedDate(date.dateString);
      const newDDay = calculateDDay(date.dateString);
      setCalculatedDDay(newDDay);
      onSaveDate?.(
        dateUtils.formatToAppDate(dateUtils.parseDate(date.dateString)),
      );
    },
    [calculateDDay, onSaveDate],
  );

  return {
    today,
    todayFormatted,
    selectedDate,
    calculatedDDay,
    handleDateSelect,
  };
}
