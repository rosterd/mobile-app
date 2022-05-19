import ChipText from 'components/Chip/ChipText';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from 'styles/theme';

interface ChipContainerProps {
  color: Colors;
  backgroundColor: Colors;
  name: string;
  icon?: React.ReactNode;
}

const ChipContainer = ({
  color,
  backgroundColor,
  icon,
  name,
}: ChipContainerProps): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    icon: {
      marginRight: theme.spacing(1),
    },
    root: {
      marginRight: theme.spacing(2),
      backgroundColor,
      color,
      paddingVertical: theme.spacing(0.5),
      paddingHorizontal: theme.spacing(2),
      borderRadius: 4,
      fontSize: theme.typography.chipText.fontSize,
      fontFamily: theme.typography.chipText.fontFamily,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.root}>
      <View style={styles.icon}>{icon}</View>
      <ChipText color={color}>{name}</ChipText>
    </View>
  );
};

export default ChipContainer;
