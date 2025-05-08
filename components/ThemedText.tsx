import {Text, type TextProps, StyleSheet} from 'react-native';

import {useThemeColor} from '@/hooks/useThemeColor';
import {Typography} from '@/constants/Typography';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return (
    <Text
      style={[
        {color},
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Typography.fontFamily.regular,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Typography.fontFamily.semiBold,
  },
  title: {
    fontSize: 32,
    fontFamily: Typography.fontFamily.bold,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: Typography.fontFamily.regular,
  },
});
