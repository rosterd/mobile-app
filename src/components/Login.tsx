import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Button, {ButtonVariant} from './Buttons/Button';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
interface Props {
  onLogin: () => void;
}
const Login = ({onLogin}: Props): JSX.Element => {
  const styles = StyleSheet.create({
    container: {
      height: screenHeight - 100,
      width: screenWidth - 24,
      alignSelf: 'center',
    },
    logoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      justifyContent: 'center',
      height: 50,
    },
    buttonText: {
      color: '#fff',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} />
      </View>
      <View>
        <Button
          variant={ButtonVariant.Primary}
          fullWidth
          onPress={onLogin}
          textStyle={styles.buttonText}
          style={styles.button}>
          Login
        </Button>
      </View>
    </View>
  );
};

export default Login;
