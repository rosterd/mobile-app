import * as React from 'react';
import {
  Text as NativeText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import useTheme from 'hooks/useTheme';

interface CardTitleProps {
  style?: StyleProp<TextStyle>;
}

const CardTitle: React.FC<CardTitleProps> = ({children, style}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: theme.typography.cardTitle.fontFamily,
      fontSize: theme.typography.cardTitle.fontSize,
      lineHeight: theme.typography.cardTitle.lineHeight,
      color: theme.colors.primary,
    },
  });
  return <NativeText style={[styles.text, style]}>{children}</NativeText>;
};

export default CardTitle;
