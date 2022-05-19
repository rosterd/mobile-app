import useTheme from 'hooks/useTheme';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const Dot = (): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: theme.spacing(3),
      right: theme.spacing(3),
      width: 8,
      height: 8,
      borderRadius: 50,
      backgroundColor: theme.colors.accent,
    },
  });

  return <View style={styles.container} />;
};

export default Dot;
