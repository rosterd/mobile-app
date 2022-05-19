import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {Colors} from 'styles/theme';

export enum IcontextVariant {
  Text = 'Text',
  Variant = 'CardTitle',
}

interface IconTextProps {
  text: React.ReactNode;
  color?: Colors;
  Icon: React.ComponentType<SvgProps>;
  boxStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
const IconText = ({
  color,
  text,
  Icon,
  boxStyle,
  textStyle,
}: IconTextProps): JSX.Element => {
  const theme = useTheme();
  const textColor = color || theme.colors.primaryText;
  const styles = StyleSheet.create({
    location: {
      paddingRight: theme.spacing(4),
      flexDirection: 'row',
    },
    mapPin: {
      marginRight: 7,
      marginTop: 3,
      width: 16,
    },
  });
  return (
    <View style={[styles.location, boxStyle]}>
      <View style={styles.mapPin}>
        <Icon color={textColor} />
      </View>
      <Text style={textStyle} color={textColor}>
        {text}
      </Text>
    </View>
  );
};

export default IconText;
