import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import useTheme from 'hooks/useTheme';

interface ContainterProps {
  bgColor?: string;
  style?: StyleProp<ViewStyle>;
}

const BgContainer: React.FC<ContainterProps> = (props) => {
  const theme = useTheme();
  const {children, style, bgColor = theme.colors.greyBg} = props;
  const styles = StyleSheet.create({
    root: {
      paddingVertical: theme.spacing(6),
      paddingHorizontal: theme.spacing(4),
      backgroundColor: bgColor,
    },
  });
  return <View style={[styles.root, style]}>{children}</View>;
};

export default BgContainer;
