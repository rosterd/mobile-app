import React from 'react';
import {Animated, StyleSheet} from 'react-native';

import TextButton, {TextButtonVariant} from './Buttons/TextButton';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';

interface SnackbarProps {
  isVisible: boolean;
  text: React.ReactNode;
  hide: () => void;
  cta?: () => void;
  buttonLabel?: string;
}

const Snackbar = ({
  isVisible,
  hide,
  text,
  cta,
  buttonLabel = 'OK',
}: SnackbarProps): JSX.Element => {
  const theme = useTheme();
  const fadeAnimation = React.useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;
  React.useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation, isVisible]);

  React.useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        if (cta) {
          cta();
        } else {
          hide();
        }
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, hide]);

  const animatingStyles = {
    opacity: fadeAnimation,
  };
  const styles = StyleSheet.create({
    container: {
      borderRadius: 2,
      position: 'absolute',
      bottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.colors.primaryText,
      marginHorizontal: 10,
    },
    textStyle: {
      flexGrow: 1,
    },
  });

  return (
    <>
      {isVisible && (
        <Animated.View style={[styles.container, animatingStyles]}>
          <Text color={theme.colors.white} style={styles.textStyle}>
            {text}
          </Text>
          <TextButton
            activeOpacity={0.8}
            onPress={cta || hide}
            variant={TextButtonVariant.Accent}>
            {buttonLabel}
          </TextButton>
        </Animated.View>
      )}
    </>
  );
};

export default Snackbar;
