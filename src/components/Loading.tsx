import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ActivityIndicatorProps,
} from 'react-native';
import useTheme from 'hooks/useTheme';

const Loading = ({size = 'large'}: ActivityIndicatorProps): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
    </View>
  );
};

export default Loading;
