import {format, differenceInDays, isBefore} from 'date-fns';

// 날짜 관련 유틸리티 함수
export const dateUtils = {
  // 앱에서 사용하는 YY.MM.DD 형식과 캘린더에서 사용하는 YYYY-MM-DD 형식 간 변환 유틸리티
  parseDate: (dateString: string): Date => {
    if (dateString.includes('.') && dateString.length === 8) {
      const [year, month, day] = dateString.split('.');
      return new Date(`20${year}-${month}-${day}`);
    }

    if (dateString.includes('-') && dateString.length === 10) {
      return new Date(dateString);
    }

    return new Date();
  },

  // 앱에서 사용하는 YY.MM.DD 형식으로 변환
  formatToAppDate: (date: Date): string => format(date, 'yy.MM.dd'),

  // 캘린더에서 사용하는 YYYY-MM-DD 형식으로 변환 (react-native-calendars 요구사항)
  formatToISODate: (date: Date): string => format(date, 'yyyy-MM-dd'),

  getDaysDifference: (startDate: Date, endDate: Date): number =>
    differenceInDays(endDate, startDate),

  isBeforeToday: (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isBefore(date, today);
  },

  getToday: (): Date => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  },
};

export default dateUtils;
