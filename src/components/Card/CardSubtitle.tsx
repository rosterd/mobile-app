import * as React from 'react';
import {
  Text as NativeText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import useTheme from 'hooks/useTheme';

interface CardSubtitleProps {
  style?: StyleProp<TextStyle>;
}

const CardSubtitle: React.FC<CardSubtitleProps> = ({children, style}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: theme.typography.cardSubtitle.fontFamily,
      fontSize: theme.typography.cardSubtitle.fontSize,
      color: theme.colors.primary,
      opacity: 0.6,
      marginBottom: theme.spacing(3),
    },
  });
  return <NativeText style={[styles.text, style]}>{children}</NativeText>;
};

export default CardSubtitle;
