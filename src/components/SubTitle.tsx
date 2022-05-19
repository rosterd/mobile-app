import * as React from 'react';
import {Text as NativeText, StyleSheet} from 'react-native';
import useTheme from 'hooks/useTheme';

const SubTitle: React.FC = ({children}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: theme.typography.subtitle.fontFamily,
      fontSize: theme.typography.subtitle.fontSize,
      color: theme.colors.secondaryText,
    },
  });
  return <NativeText style={styles.text}>{children}</NativeText>;
};

export default SubTitle;
