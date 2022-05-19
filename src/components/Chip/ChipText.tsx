import * as React from 'react';
import {Text as NativeText, StyleSheet} from 'react-native';
import useTheme from 'hooks/useTheme';
import {Colors} from 'styles/theme';

interface ChipTextProps {
  color: Colors;
}

const ChipText: React.FC<ChipTextProps> = ({children, color}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    text: {
      fontFamily: theme.typography.chipText.fontFamily,
      fontSize: theme.typography.chipText.fontSize,
      color,
    },
  });
  return <NativeText style={styles.text}>{children}</NativeText>;
};

export default ChipText;
