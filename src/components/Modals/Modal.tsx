import React from 'react';
import {View, StyleSheet} from 'react-native';
import useTheme from 'hooks/useTheme';
import NativeModal from 'react-native-modal';

export interface ModalProps {
  isVisible: boolean;
  onBackdropPress?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  children,
  onBackdropPress,
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    modal: {
      backgroundColor: theme.colors.white,
      padding: theme.spacing(8),
      elevation: 2,
      ...theme.shadow,
      borderRadius: 8,
    },
  });
  return (
    <NativeModal
      backdropColor={theme.colors.primary}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.5}
      isVisible={isVisible}
      useNativeDriver>
      <View style={styles.modal}>{children}</View>
    </NativeModal>
  );
};

export default Modal;
