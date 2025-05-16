import {LocaleConfig} from 'react-native-calendars';

// 캘린더 한국어 로케일 설정
export const setupKoreanLocale = (): void => {
  LocaleConfig.locales.kr = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    monthNamesShort: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    dayNames: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘',
  };

  LocaleConfig.defaultLocale = 'kr';
};

// 기본 내보내기를 통해 자동으로 설정 적용
setupKoreanLocale();

export default {setupKoreanLocale};
