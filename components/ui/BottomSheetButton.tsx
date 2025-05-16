import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
import {Theme} from '@/constants/Theme';
import {Colors} from '@/constants/Colors';

type ButtonType = 'primary' | 'danger' | 'text';

interface BottomSheetButtonProps {
  label: string;
  onPress: () => void;
  type?: ButtonType;
  disabled?: boolean;
}

export function BottomSheetButton({
  label,
  onPress,
  type = 'primary',
  disabled = false,
}: BottomSheetButtonProps) {
  if (type === 'text') {
    return (
      <Text
        style={[styles.textButton, disabled && styles.disabledText]}
        onPress={disabled ? undefined : onPress}>
        {label}
      </Text>
    );
  }

  return (
    <Pressable
      style={[
        styles.button,
        type === 'primary' && styles.primaryButton,
        type === 'danger' && styles.dangerButton,
        disabled && styles.disabledButton,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}>
      <Text
        style={[
          styles.buttonText,
          type === 'danger' && styles.dangerButtonText,
          disabled && styles.disabledButtonText,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.borderRadius.medium,
    paddingVertical: Theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: Theme.colors.highlight,
  },
  dangerButton: {
    backgroundColor: Colors.light.transparent,
    borderWidth: 1,
    borderColor: 'rgba(255, 85, 85, 0.3)',
  },
  disabledButton: {
    backgroundColor: Colors.light.buttonDisabled,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.semiBold,
    color: Colors.light.white,
  },
  dangerButtonText: {
    color: '#ff4d4f',
  },
  disabledButtonText: {
    color: Colors.light.gray,
  },
  textButton: {
    fontSize: moderateScale(15),
    fontFamily: Theme.fontFamily.semiBold,
    color: '#ff4d4f',
    marginVertical: moderateScale(10),
    textAlign: 'center',
  },
  disabledText: {
    color: Colors.light.gray,
    opacity: 0.5,
  },
});
