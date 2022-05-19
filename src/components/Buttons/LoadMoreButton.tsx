import Loading from 'components/Loading';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Button, {ButtonVariant} from './Button';

interface LoadMoreProps {
  onPress: () => void;
  loading: boolean;
  style?: StyleProp<ViewStyle>;
}

const LoadMoreButton = ({
  onPress,
  style,
  loading,
}: LoadMoreProps): JSX.Element => {
  const styles = StyleSheet.create({
    loadMoreButton: {
      alignItems: 'center',
      alignSelf: 'center',
      width: 200,
    },
  });
  return (
    <View style={style}>
      {!loading && (
        <Button
          style={[styles.loadMoreButton]}
          onPress={onPress}
          variant={ButtonVariant.AccentOutline}>
          Load More
        </Button>
      )}
      {loading && <Loading />}
    </View>
  );
};

export default LoadMoreButton;
