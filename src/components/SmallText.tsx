import * as React from 'react';
import {Text as NativeText, StyleSheet} from 'react-native';
import {Colors} from 'styles/theme';
import useTheme from 'hooks/useTheme';

interface TextProps {
  color?: Colors;
}

const SmallText: React.FC<TextProps> = ({
  children,
  color = Colors.secondaryText,
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: theme.typography.smallText.fontFamily,
      fontSize: theme.typography.smallText.fontSize,
      color,
    },
  });
  return <NativeText style={styles.text}>{children}</NativeText>;
};

export default SmallText;
