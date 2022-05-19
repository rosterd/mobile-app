import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import ChipText from './Chip/ChipText';
import useTheme from 'hooks/useTheme';

export enum AlertVariants {
  Red = 'Red',
  Yellow = 'Yellow',
}

interface AlertBoxProps {
  style?: StyleProp<ViewStyle>;
  variant: AlertVariants;
}

const AlertBox: React.FC<AlertBoxProps> = ({children, style, variant}) => {
  const theme = useTheme();
  const styles = {
    base: StyleSheet.create({
      container: {
        paddingVertical: theme.spacing(2),
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 6,
      },
    }),
    [AlertVariants.Red]: StyleSheet.create({
      container: {
        backgroundColor: theme.colors.redLight,
      },
      text: {
        color: theme.colors.red,
      },
    }),
    [AlertVariants.Yellow]: StyleSheet.create({
      container: {
        backgroundColor: theme.colors.yellowLight,
      },
      text: {
        color: theme.colors.yellow,
      },
    }),
  };

  return (
    <View style={[styles.base.container, styles[variant].container, style]}>
      <ChipText color={styles[variant].text.color}>{children}</ChipText>
    </View>
  );
};

export default AlertBox;
