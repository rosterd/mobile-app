import * as React from 'react';
import {Text as NativeText, StyleSheet} from 'react-native';
import useTheme from 'hooks/useTheme';

const Title: React.FC = ({children}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: theme.typography.h1.fontFamily,
      fontSize: theme.typography.h1.fontSize,
      lineHeight: theme.typography.h1.lineHeight,
      color: theme.colors.primary,
    },
  });
  return <NativeText style={styles.text}>{children}</NativeText>;
};

export default Title;
