import useTheme from 'hooks/useTheme';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

export enum ButtonVariant {
  Primary = 'primary',
  Accent = 'accent',
  AccentOutline = 'accentOutline',
  Secondary = 'secondary',
  Disabled = 'disabled',
}

interface ButtonProps {
  variant: ButtonVariant;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  fullWidth,
  style,
  textStyle,
  onPress,
}) => {
  const theme = useTheme();

  const genericStyles = StyleSheet.create({
    button: {
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(2),
      borderRadius: 6,
    },
    fullWidthStyle: fullWidth
      ? {
          alignItems: 'center',
          flexGrow: 1,
        }
      : {},
    buttonText: {
      fontSize: theme.typography.base.fontSize,
      fontFamily: theme.typography.medium.fontFamily,
      lineHeight: theme.typography.base.lineHeight,
    },
  });

  const styles = {
    [ButtonVariant.Primary]: StyleSheet.create({
      button: {
        backgroundColor: theme.colors.primary,
      },
      buttonText: {
        color: theme.colors.accent,
      },
    }),
    [ButtonVariant.Accent]: StyleSheet.create({
      button: {
        backgroundColor: theme.colors.accent,
      },
      buttonText: {
        color: theme.colors.white,
      },
    }),
    [ButtonVariant.AccentOutline]: StyleSheet.create({
      button: {
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.accent,
        borderWidth: 1,
      },
      buttonText: {
        color: theme.colors.accent,
      },
    }),
    [ButtonVariant.Secondary]: StyleSheet.create({
      button: {
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.secondaryText,
        borderWidth: 1,
      },
      buttonText: {
        color: theme.colors.secondaryText,
      },
    }),
    [ButtonVariant.Disabled]: StyleSheet.create({
      button: {
        backgroundColor: theme.colors.disabledBg,
      },
      buttonText: {
        color: theme.colors.disabledText,
      },
    }),
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles[variant].button,
        genericStyles.button,
        genericStyles.fullWidthStyle,
        style,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles[variant].buttonText,
          genericStyles.buttonText,
          textStyle,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
