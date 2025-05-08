/**
 * Typography constants for the app
 * Centralizes font sizes, weights, and other text styling
 */

interface TypographyType {
  fontSize: {
    small: number;
    medium: number;
    large: number;
  };
  lineHeight: {
    compact: number;
    normal: number;
    relaxed: number;
  };
  fontFamily: {
    regular: string;
    semiBold: string;
    bold: string;
  };
}

export const Typography: TypographyType = {
  fontSize: {
    small: 16,
    medium: 20,
    large: 27,
  },
  lineHeight: {
    compact: 24,
    normal: 32,
    relaxed: 40,
  },
  fontFamily: {
    regular: 'Pretendard-Regular',
    semiBold: 'Pretendard-SemiBold',
    bold: 'Pretendard-Bold',
  },
};
