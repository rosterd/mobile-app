import * as React from 'react';
import {
  Text as NativeText,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';
import {Colors} from 'styles/theme';
import useTheme from 'hooks/useTheme';

interface TextProps {
  color?: Colors;
  style?: StyleProp<TextStyle>;
}

const Text: React.FC<TextProps> = ({children, color, style}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: theme.typography.base.fontFamily,
      fontSize: theme.typography.base.fontSize,
      lineHeight: theme.typography.base.lineHeight,
      color,
    },
  });
  return <NativeText style={[styles.text, style]}>{children}</NativeText>;
};

export default Text;
