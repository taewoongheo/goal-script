import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {Pressable} from 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar, DateData} from 'react-native-calendars';
import {FontAwesome} from '@expo/vector-icons';
import {scale} from 'react-native-size-matters';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {Theme} from '@/constants/Theme';
import {dateUtils} from '@/utils/dateUtils';
import '@/constants/CalendarLocale';
import {Colors} from '@/constants/Colors';

// 달력에서 사용하는 날짜 형식을 위한 인터페이스 정의
interface DayObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface DDayBottomSheetProps {
  initialDate?: string;
  onSaveDate?: (date: string) => void;
  onCancel?: () => void;
  dDay?: number; // D-day 추가
}

export function DDayBottomSheet({
  initialDate,
  onSaveDate,
  onCancel,
  dDay = 0,
}: DDayBottomSheetProps) {
  // 오늘 날짜 (시간은 00:00:00으로 설정)
  const today = useMemo(() => dateUtils.getToday(), []);

  // 오늘 날짜를 캘린더에서 사용하는 YYYY-MM-DD 형식으로 변환
  const todayFormatted = useMemo(
    () => dateUtils.formatToISODate(today),
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

  const handleDateSelect = useCallback(
    (date: DateData) => {
      setSelectedDate(date.dateString);
      const newDDay = calculateDDay(date.dateString);
      setCalculatedDDay(newDDay);
      onSaveDate?.(date.dateString);
    },
    [calculateDDay, onSaveDate],
  );

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

  return (
    <View style={styles.container}>
      {/* Header with D-day */}

      {/* Calendar */}
      <Calendar
        style={styles.calendar}
        onDayPress={handleDateSelect} // 날짜 선택 시 호출되는 콜백 함수
        markedDates={markedDates} // 선택된 날짜 표시를 위한 객체
        current={selectedDate} // 현재 표시되는 날짜
        firstDay={0} // 주의 첫 날 (0: 일요일)
        hideExtraDays={false} // 이전/다음 달의 날짜 표시 여부
        disableAllTouchEventsForDisabledDays // 비활성화된 날짜에 대한 터치 이벤트 비활성화
        enableSwipeMonths // 월 단위 스와이프 활성화
        showWeekNumbers={false} // 주 번호 표시 여부
        markingType="custom" // 날짜 마킹 스타일 타입
        minDate={todayFormatted} // 오늘 이전 날짜 선택 불가능하게 설정
        theme={{
          backgroundColor: Colors.light.calendarBackground, // 배경색
          calendarBackground: Colors.light.calendarBackground, // 캘린더 배경색
          textSectionTitleColor: Theme.colors.textSecondary, // 섹션 제목 텍스트 색상
          todayTextColor: Theme.colors.highlight, // 오늘 날짜 텍스트 색상
          dayTextColor: Theme.colors.highlight, // 날짜 텍스트 색상
          textDisabledColor: Theme.colors.textSecondary, // 비활성화된 날짜 텍스트 색상
          arrowColor: Theme.colors.highlight, // 월 이동 화살표 색상
          monthTextColor: Theme.colors.highlight, // 월 텍스트 색상
          indicatorColor: Theme.colors.highlight, // 로딩 인디케이터 색상
          textDayFontFamily: Theme.fontFamily.regular, // 날짜 폰트
          textMonthFontFamily: Theme.fontFamily.semiBold, // 월 폰트
          textDayHeaderFontFamily: Theme.fontFamily.semiBold, // 요일 헤더 폰트
          textDayFontSize: Theme.fontSize.small, // 날짜 텍스트 크기
          textMonthFontSize: Theme.fontSize.small, // 월 텍스트 크기
          textDayHeaderFontSize: Theme.fontSize.small, // 요일 헤더 텍스트 크기
          borderRadius: Theme.borderRadius.small, // 테두리 둥글기
          dayShape: 'square', // 날짜 셀 모양
        }}
      />

      <View style={styles.divider} />

      <View style={styles.header}>
        <FontAwesome
          name="calendar"
          size={Theme.iconSize.medium}
          color={Theme.colors.highlight}
        />
        <Text style={styles.headerText}>
          {calculatedDDay > 0 ? `D-${calculatedDDay}` : 'D-Day'}
        </Text>
        <Pressable
          onPress={() => {
            console.log('LOG: selectedDate', selectedDate);
          }}>
          {/* <Animated.View
            layout={LinearTransition.springify()}
            style={{
              backgroundColor: 'red',
            }}> */}
          <Text
            style={{
              marginLeft: Theme.spacing.small,
              fontSize: Theme.fontSize.medium,
              fontFamily: Theme.fontFamily.bold,
              color: Theme.colors.highlight,
              marginRight: Theme.iconSpace.small,
              backgroundColor: Theme.colors.lineHighlight,
              borderRadius: Theme.borderRadius.small,
              paddingHorizontal: Theme.iconSpace.medium,
              paddingVertical: Theme.iconSpace.small,
            }}>
            {dateUtils.formatToAppDate(dateUtils.parseDate(selectedDate))}
          </Text>
          {/* </Animated.View> */}
        </Pressable>
        {calculatedDDay > 0 && (
          <Text
            style={{
              fontSize: Theme.fontSize.medium,
              fontFamily: Theme.fontFamily.regular,
              color: Theme.colors.textSecondary,
            }}>
            남았어요
          </Text>
        )}
      </View>
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
  selectedDateContainer: {
    alignItems: 'center',
    marginVertical: Theme.spacing.medium,
    paddingVertical: Theme.spacing.small,
    backgroundColor: Colors.light.inputBackground,
    borderRadius: Theme.borderRadius.medium,
  },
  selectedDateText: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.semiBold,
    color: Theme.colors.highlight,
  },
  calendar: {
    // borderRadius: Theme.borderRadius.medium,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  buttonContainer: {
    marginTop: Theme.spacing.medium,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.medium,
    marginTop: Theme.spacing.small,
  },
  cancelText: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.semiBold,
    color: '#FF4D4F',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.lightGray,
    marginVertical: Theme.spacing.medium,
  },
});
