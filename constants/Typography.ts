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
  fontWeight: {
    regular: '400' | 'normal';
    bold: '800' | 'bold';
  };
}

export const Typography: TypographyType = {
  fontSize: {
    small: 16,
    medium: 20,
    large: 26,
  },
  lineHeight: {
    compact: 24,
    normal: 32,
    relaxed: 40,
  },
  fontWeight: {
    regular: '400',
    bold: '800',
  },
};
