import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'components/Modals/Modal';
import BellIcon from 'svgIcons/BellIcon';
import Button, {ButtonVariant} from 'components/Buttons/Button';
import TextButton, {TextButtonVariant} from 'components/Buttons/TextButton';
import useTheme from 'hooks/useTheme';
import {ModalProps} from './Modal';

interface JobApplyModalProps extends ModalProps {
  onApplyPress: () => void;
  onCancelPress: () => void;
}

const JobApplyModal = ({
  isVisible,
  onApplyPress,
  onCancelPress,
}: JobApplyModalProps): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {},
    message: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: theme.spacing(4),
    },
    alertIcon: {
      marginRight: theme.spacing(3),
    },
    messageText: {
      width: 0,
      flexGrow: 1,
    },
    applyButton: {
      flexGrow: 0,
      marginBottom: theme.spacing(2),
    },
    textButton: {
      alignSelf: 'center',
    },
  });

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancelPress}>
      <View style={styles.container}>
        <View style={styles.message}>
          <BellIcon style={styles.alertIcon} color={theme.colors.primary} />
          <Text style={styles.messageText}>
            If you accept this job, you cannot cancel it. Do you wish to
            continue?
          </Text>
        </View>
        <Button
          style={styles.applyButton}
          fullWidth
          variant={ButtonVariant.Primary}
          onPress={onApplyPress}>
          Accept this Job
        </Button>
        <TextButton
          style={styles.textButton}
          variant={TextButtonVariant.Secondary}
          onPress={onCancelPress}>
          Cancel
        </TextButton>
      </View>
    </Modal>
  );
};

export default JobApplyModal;
