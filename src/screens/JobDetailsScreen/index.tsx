import Button, {ButtonVariant} from 'components/Buttons/Button';
import CardTitle from 'components/Card/CardTitle';
import IconText from 'components/IconText';
import TitleCard from 'components/TitleCard';
import * as React from 'react';
import {ScrollView, Dimensions, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import HTML from 'react-native-render-html';
import CalendarIcon from 'svgIcons/CalendarIcon';
import MapPinIcon from 'svgIcons/MapPinIcon';
import * as Clipboard from 'expo-clipboard';
import {useNavigation} from '@react-navigation/native';
import JobApplyModal from 'components/Modals/JobApplyModal';
import useTheme from 'hooks/useTheme';
import MapLink from 'components/MapLink';
import Snackbar from 'components/Snackbar';
import {StackScreenProps} from '@react-navigation/stack';
import {Job} from 'types/Job';
import DateTime from 'components/DateTime';
import {acceptJob} from 'services/rosterdService';
import {useState} from 'react';

type RootStackParamList = {
  JobDetails: {job: Job; showActions: boolean};
};

type Props = StackScreenProps<RootStackParamList, 'JobDetails'>;

function JobDetailsScreen({route}: Props): JSX.Element {
  const job = route.params.job;
  const [showActions, setShowActions] = useState(
    route.params.showActions || false,
  );
  const actionButtonsHeight = 85;
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      paddingBottom: actionButtonsHeight,
    },
    leftButton: {
      marginRight: theme.spacing(3),
    },
    map: {
      width: Dimensions.get('window').width,
      height: 250,
    },
    infoRow: {
      borderBottomColor: theme.colors.borderColor,
      paddingVertical: theme.spacing(6),
      borderBottomWidth: 1,
      paddingHorizontal: theme.spacing(4),
    },
    jobInfo: {
      marginBottom: theme.spacing(6),
    },
    description: {
      paddingHorizontal: theme.spacing(6),
      marginBottom: theme.spacing(3),
    },
    copyAddress: {
      marginBottom: theme.spacing(4),
      marginRight: theme.spacing(4),
      alignSelf: 'flex-end',
    },
    snackbar: {
      zIndex: 21,
      elevation: 21,
    },
    actions: {
      height: actionButtonsHeight,
      alignItems: 'center',
      elevation: 20,
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      shadowOpacity: 0.15,
      shadowColor: theme.colors.black,
      shadowRadius: 25,
      shadowOffset: {width: 0, height: 4},
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      paddingHorizontal: theme.spacing(5),
      position: 'absolute',
      width: Dimensions.get('window').width,
      bottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    descriptionTitle: {
      marginBottom: 8,
    },
    mapIconTextStyle: {
      textDecorationLine: 'underline',
    },
  });
  const tagStyles = {
    p: {
      fontFamily: theme.typography.base.fontFamily,
      fontSize: theme.typography.base.fontSize,
      lineHeight: theme.typography.base.lineHeight,
      marginBottom: 8,
    },
    li: {
      fontFamily: theme.typography.base.fontFamily,
      fontSize: theme.typography.base.fontSize,
    },
  };

  const [addressSnackbar, setAddressSnackBar] = React.useState(false);

  const hideAddressSnackbar = React.useCallback(() => {
    setAddressSnackBar(false);
  }, [setAddressSnackBar]);

  const showAddressSnackbar = React.useCallback(() => {
    setAddressSnackBar(true);
  }, [setAddressSnackBar]);

  const onCopyAddressPress = () => {
    Clipboard.setString(job.facility.address);
    showAddressSnackbar();
  };

  const navigation = useNavigation();
  const [applyModal, toggleApplyModal] = React.useState(false);

  const onApplyPress = React.useCallback(async () => {
    if (typeof job === 'undefined') return;
    const jobId = job.jobId;
    await acceptJob(jobId);
    setShowActions(false);
    toggleApplyModal(false);
  }, [job.jobId]);

  const openApplyModal = () => {
    toggleApplyModal(true);
  };
  const onCancelPress = React.useCallback(() => {
    toggleApplyModal(false);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TitleCard title={job.jobTitle} subTitle={job.facility.facilityName} />
        <MapView
          region={{
            latitude: job.facility.latitude,
            longitude: job.facility.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0721,
          }}
          style={styles.map}>
          <Marker
            coordinate={{
              latitude: job.facility.latitude,
              longitude: job.facility.longitude,
            }}
            title={job.facility.facilityName}
          />
        </MapView>
        <View style={styles.jobInfo}>
          <IconText
            boxStyle={styles.infoRow}
            text={<DateTime date={job.jobStartDateTimeUtc} />}
            Icon={CalendarIcon}
          />
          <IconText
            boxStyle={styles.infoRow}
            text={<DateTime date={job.jobEndDateTimeUtc} />}
            Icon={CalendarIcon}
          />
          <View>
            <MapLink
              lat={job.facility.latitude}
              long={job.facility.longitude}
              location={job.facility.address}>
              <IconText
                textStyle={styles.mapIconTextStyle}
                color={theme.colors.primary}
                boxStyle={[styles.infoRow]}
                text={job.facility.address}
                Icon={MapPinIcon}
              />
            </MapLink>
          </View>
        </View>
        <Button
          style={styles.copyAddress}
          onPress={onCopyAddressPress}
          variant={ButtonVariant.AccentOutline}>
          Copy Address
        </Button>
        <View style={styles.description}>
          {!!job.responsibilities && (
            <>
              <CardTitle style={styles.descriptionTitle}>
                Responsibilities
              </CardTitle>
              <HTML
                tagsStyles={tagStyles}
                source={{html: job.responsibilities}}
              />
            </>
          )}
        </View>
        <View style={styles.description}>
          {!!job.experience && (
            <>
              <CardTitle style={styles.descriptionTitle}>Experience</CardTitle>
              <HTML tagsStyles={tagStyles} source={{html: job.experience}} />
            </>
          )}
        </View>
        <View style={styles.description}>
          {!!job.experience && (
            <View>
              <CardTitle style={styles.descriptionTitle}>Description</CardTitle>
              <HTML tagsStyles={tagStyles} source={{html: job.description}} />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.snackbar}>
        <Snackbar
          text={'Address copied successfully'}
          hide={hideAddressSnackbar}
          isVisible={addressSnackbar}
        />
      </View>

      {showActions && (
        <View style={styles.actions}>
          <Button
            style={styles.leftButton}
            fullWidth
            onPress={() => navigation.goBack()}
            variant={ButtonVariant.Secondary}>
            Not Interested
          </Button>
          <Button
            fullWidth
            onPress={openApplyModal}
            variant={ButtonVariant.Accent}>
            Accept this job
          </Button>
        </View>
      )}

      <JobApplyModal
        isVisible={applyModal}
        onApplyPress={onApplyPress}
        onCancelPress={onCancelPress}
      />
    </View>
  );
}

export default JobDetailsScreen;
