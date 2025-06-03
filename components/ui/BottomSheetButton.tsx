import React from 'react';
import {Text} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';

interface BaseButtonProps {
  label: string;
  onPress: () => void;
}

export function PrimaryBottomSheetButton({label, onPress}: BaseButtonProps) {
  return (
    <Pressable style={primaryButtonStyles.button} onPress={onPress}>
      <Text style={primaryButtonStyles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const primaryButtonStyles = {
  button: {
    borderRadius: Theme.borderRadius.medium,
    paddingVertical: Theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Theme.colors.highlight,
  } as const,
  buttonText: {
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.semiBold,
    color: Colors.light.white,
  } as const,
};

export function DangerBottomSheetButton({label, onPress}: BaseButtonProps) {
  return (
    <Pressable style={dangerButtonStyles.button} onPress={onPress}>
      <Text style={dangerButtonStyles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const dangerButtonStyles = {
  button: {
    borderRadius: Theme.borderRadius.medium,
    paddingVertical: Theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.light.transparent,
    borderWidth: 1,
    borderColor: 'rgba(255, 85, 85, 0.3)',
  } as const,
  buttonText: {
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.semiBold,
    color: '#ff4d4f',
  } as const,
};

export function TextBottomSheetButton({label, onPress}: BaseButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={textButtonStyles.button}
      hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}>
      <Text style={textButtonStyles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const textButtonStyles = {
  button: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  } as const,
  buttonText: {
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.semiBold,
    color: '#ff4d4f',
    textAlign: 'center',
  } as const,
};
