import * as React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import useTheme from 'hooks/useTheme';
import BgContainer from 'components/BgContainer';
import Text from 'components/Text';

interface IconProps {
  style: StyleProp<ViewStyle>;
}

interface PropTypes {
  text: string;
  icon: React.ComponentType<IconProps>;
}

function NoAlerts({text, icon: Icon}: PropTypes): JSX.Element {
  // const handleButtonPress = () => {
  //   console.log('pressed');
  // };

  const theme = useTheme();

  const styles = StyleSheet.create({
    view: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%',
    },
    icon: {
      marginTop: theme.spacing(30),
    },
    text: {
      marginTop: theme.spacing(7.5),
    },
    button: {
      marginTop: theme.spacing(10),
    },
  });
  return (
    <BgContainer bgColor={theme.colors.white} style={styles.view}>
      <Icon style={styles.icon} />
      <Text color={theme.colors.black} style={styles.text}>
        {text}
      </Text>
      {/* <Button
        variant={ButtonVariant.AccentOutline}
        onPress={handleButtonPress}
        style={styles.button}>
        Find New Job
      </Button> */}
    </BgContainer>
  );
}

export default NoAlerts;
