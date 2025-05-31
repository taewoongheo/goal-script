import {scale, moderateScale} from 'react-native-size-matters';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from './Colors';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const Theme = {
  // 디바이스 정보
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    widthPercent: (percent: number) => SCREEN_WIDTH * (percent / 100),
    heightPercent: (percent: number) => SCREEN_HEIGHT * (percent / 100),
  },

  colors: Colors.light,

  fontSize: {
    small: moderateScale(16),
    medium: moderateScale(20),
    large: moderateScale(27),
  },

  fontFamily: {
    regular: 'Pretendard-Regular',
    semiBold: 'Pretendard-SemiBold',
    bold: 'Pretendard-Bold',
  },

  lineHeight: {
    compact: moderateScale(24),
    normal: moderateScale(32),
    relaxed: moderateScale(40),
  },

  spacing: {
    xs: scale(4),
    small: scale(8),
    medium: scale(16),
    large: scale(24),
    xl: scale(32),
    xxl: scale(42),
  },

  padding: {
    horizontal: 0.8, // 화면 너비의 80%
    vertical: scale(16),
  },

  borderRadius: {
    small: scale(4),
    medium: scale(8),
    large: scale(12),
  },

  iconSize: {
    small: moderateScale(22),
    medium: moderateScale(24),
    large: moderateScale(26),
  },

  iconSpace: {
    small: scale(6),
    medium: scale(8),
    large: scale(12),
  },
};

// Function to update theme based on color scheme
export const updateThemeColors = (colorScheme: 'light' | 'dark') => {
  Theme.colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
};
