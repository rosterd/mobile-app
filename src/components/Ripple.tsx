import React from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  LayoutChangeEvent,
  GestureResponderEvent,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {Colors} from 'styles/theme';
const radius = 10;

interface RippleProps extends TouchableWithoutFeedbackProps {
  rippleColor?: Colors;
  rippleOpacity?: number;
  rippleDuration?: number;
  rippleSize?: number;
  rippleContainerBorderRadius?: number;
  rippleCentered?: boolean;
  rippleFades?: boolean;
}

const Ripple: React.FC<RippleProps> = ({
  rippleColor = Colors.accent,
  rippleOpacity = 0.2,
  rippleDuration = 400,
  rippleSize = 0,
  rippleContainerBorderRadius = radius,
  rippleCentered = true,
  rippleFades = true,
  children,
  ...props
}) => {
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'transparent',
      overflow: 'hidden',
      borderRadius: rippleContainerBorderRadius,
    },

    ripple: {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      overflow: 'hidden',
      position: 'absolute',
    },
  });
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [ripple, setRipple] = React.useState({
    progress: new Animated.Value(0),
    locationY: 0,
    locationX: 0,
    R: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };

  const onPress = (event: GestureResponderEvent) => {
    requestAnimationFrame(() => {
      if (props.onPress) {
        props.onPress(event);
      }
    });
    startRipple(event);
  };

  const onLongPress = (event: GestureResponderEvent) => {
    requestAnimationFrame(() => {
      if (props.onLongPress) {
        props.onLongPress(event);
      }
    });
    startRipple(event);
  };

  const startRipple = (event: GestureResponderEvent) => {
    const w2 = 0.5 * width;
    const h2 = 0.5 * height;

    const {locationX, locationY} = rippleCentered
      ? {locationX: w2, locationY: h2}
      : event.nativeEvent;

    const offsetX = Math.abs(w2 - locationX);
    const offsetY = Math.abs(h2 - locationY);
    const R =
      rippleSize > 0
        ? 0.5 * rippleSize
        : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    Animated.timing(ripple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    }).start(() => {
      setRipple({...ripple, progress: new Animated.Value(0)});
    });
    setRipple({...ripple, locationX, locationY, R});
  };

  const rippleStyle = {
    top: ripple.locationY - radius,
    left: ripple.locationX - radius,
    backgroundColor: rippleColor,
    transform: [
      {
        scale: ripple.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5 / radius, ripple.R / radius],
        }),
      },
    ],

    opacity: rippleFades
      ? ripple.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [rippleOpacity, 0],
        })
      : rippleOpacity,
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onLayout={onLayout}
      onLongPress={onLongPress}>
      <Animated.View {...props} pointerEvents='box-only'>
        {children}
        <View style={[styles.container]}>
          <Animated.View style={[styles.ripple, rippleStyle]} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Ripple;
