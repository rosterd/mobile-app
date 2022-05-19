import useTheme from 'hooks/useTheme';
import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
} from 'react-native';

export enum TextButtonVariant {
  Accent = 'accent',
  Secondary = 'secondary',
}

interface TextButton {
  onPress?: () => void;
  variant?: TextButtonVariant;
  style?: StyleProp<TextStyle>;
  activeOpacity?: number;
}

const TextButton: React.FC<TextButton> = ({
  onPress,
  children,
  variant = TextButtonVariant.Accent,
  style,
  activeOpacity = 0.3,
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    button: {
      fontSize: theme.typography.base.fontSize,
      fontFamily: theme.typography.medium.fontFamily,
      padding: theme.spacing(1),
    },
    [TextButtonVariant.Accent]: {
      color: theme.colors.accent,
    },
    [TextButtonVariant.Secondary]: {
      color: theme.colors.secondaryText,
    },
  });

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
      <Text style={[styles.button, styles[variant], style]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
