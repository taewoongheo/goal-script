/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

/**
 * Get theme-aware color from the Colors object
 * @param colorName The color name to get from Colors
 * @param defaultColorScheme Optional override for the color scheme
 * @returns The color value for the current theme
 */
export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  defaultColorScheme?: 'light' | 'dark',
) {
  const theme = useColorScheme();
  const colorScheme = defaultColorScheme || theme || 'light';

  return Colors[colorScheme][colorName];
}

/**
 * Get all colors for the current theme
 * @param defaultColorScheme Optional override for the color scheme
 * @returns The colors object for the current theme
 */
export function useThemeColors(defaultColorScheme?: 'light' | 'dark') {
  const theme = useColorScheme();
  const colorScheme = defaultColorScheme || theme || 'light';

  return Colors[colorScheme];
}
