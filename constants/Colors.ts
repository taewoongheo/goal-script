/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This is the single source of truth for all color definitions in the app.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    highlight: '#2F2F2F',
    textSecondary: '#ACACAC',
    dropdownBackground: 'white',
    transparent: 'transparent',
    buttonDisabled: '#E0E0E0',
    inputBackground: '#F5F5F5',
    formBackground: '#F9F9F9',
    calendarBackground: '#ffffff',
    white: 'white',
    lightGray: '#eeeeee',
    gray: '#999',
    primary: '#4A6FFF',
    lineHighlight: 'rgb(217, 255, 0)',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    highlight: '#FFFFFF',
    textSecondary: '#9BA1A6',
    dropdownBackground: '#333333',
    transparent: 'transparent',
    buttonDisabled: '#555555',
    inputBackground: '#333333',
    formBackground: '#222222',
    calendarBackground: '#222222',
    white: '#222222',
    lightGray: '#333333',
    gray: '#777',
    primary: '#6A8FFF',
  },
};

export const HighlightColor = {
  light: 'rgb(217, 255, 0)',
};
