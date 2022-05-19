import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import useTheme from 'hooks/useTheme';

interface CardProps {
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<CardProps> = ({children, style}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    root: {
      backgroundColor: theme.colors.white,
      padding: theme.spacing(4),
      elevation: 1,
      shadowOpacity: theme.shadow.shadowOpacity,
      shadowColor: theme.shadow.shadowColor,
      shadowRadius: theme.shadow.shadowRadius,
      borderRadius: 4,
      marginBottom: theme.spacing(6),
    },
  });
  return <View style={[styles.root, style]}>{children}</View>;
};

export default Card;
