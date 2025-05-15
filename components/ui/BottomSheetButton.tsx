import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {Theme} from '@/constants/Theme';

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
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 85, 85, 0.3)',
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.semiBold,
    color: '#fff',
  },
  dangerButtonText: {
    color: '#ff4d4f',
  },
  disabledButtonText: {
    color: '#999',
  },
  textButton: {
    fontSize: Theme.fontSize.small,
    fontFamily: Theme.fontFamily.semiBold,
    color: '#ff4d4f',
    marginVertical: Theme.spacing.medium,
    textAlign: 'center',
  },
  disabledText: {
    color: '#999',
    opacity: 0.5,
  },
});
