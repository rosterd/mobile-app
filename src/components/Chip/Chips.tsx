import React from 'react';
import {StyleSheet, View} from 'react-native';
import useTheme from 'hooks/useTheme';

const Chips: React.FC = ({children}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    chips: {
      flexDirection: 'row',
      marginBottom: theme.spacing(2),
    },
  });
  return <View style={styles.chips}>{children}</View>;
};

export default Chips;
