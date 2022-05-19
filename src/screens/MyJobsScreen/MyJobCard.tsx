import Card from 'components/Card/Card';
import {Job as JobType} from 'types/Job';
import React from 'react';
import DayShiftChip from 'components/Chip/DayShift';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import NightShift from 'components/Chip/NightShift';
import Chips from 'components/Chip/Chips';
import dayjs from 'dayjs';
import AlertBox, {AlertVariants} from 'components/AlertBox';
import TextButton, {TextButtonVariant} from 'components/Buttons/TextButton';
import Button, {ButtonVariant} from 'components/Buttons/Button';
import relativeTime from 'dayjs/plugin/relativeTime';
import * as Clipboard from 'expo-clipboard';
import JobStatusChip from 'components/Chip/JobStatusChip';
import {JobStatus} from 'types/JobStatus';
import Job from 'components/Job';
import useTheme from 'hooks/useTheme';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(utc);

interface JobCardProps
  extends Pick<
    JobType,
    | 'jobTitle'
    | 'jobStartDateTimeUtc'
    | 'jobEndDateTimeUtc'
    | 'facility'
    | 'cancelUntil'
    | 'isNightShift'
  > {
  onPress: () => void;
  jobStatus: JobStatus;
  onCopyAddress?: () => void;
  onReject: () => void;
}
const MyJobCard = ({
  jobTitle,
  facility,
  jobStartDateTimeUtc,
  jobEndDateTimeUtc,
  onPress,
  cancelUntil,
  jobStatus,
  isNightShift,
  onCopyAddress = () => {},
  onReject = () => {},
}: JobCardProps): JSX.Element => {
  const [currentJobStatus, setCurrentJobStatus] = React.useState(jobStatus);

  const getLocalTime = (date: string) => dayjs.utc(date.substring(0, 23));

  const calculateTimeFromNow = (date: string) =>
    dayjs(getLocalTime(date)).fromNow(true);

  const getTimeDiff = (date: dayjs.Dayjs) => {
    const now = dayjs();
    return dayjs(date).diff(now);
  };

  const getIsJobCancellable = () =>
    jobStatus === JobStatus.Accepted &&
    getTimeDiff(getLocalTime(cancelUntil)) > 0;

  const [timeLeft, setTimeLeft] = React.useState(
    calculateTimeFromNow(cancelUntil),
  );
  const [timeUntilEnd, setTimeUntilEnd] = React.useState(
    calculateTimeFromNow(jobEndDateTimeUtc),
  );

  const [isCancellable, setIsCancellable] = React.useState(
    getIsJobCancellable(),
  );

  // timer for changing status from accepted to in progress
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      // once job status changed to progress we dont need this timer

      if (getTimeDiff(getLocalTime(jobStartDateTimeUtc)) < 0) {
        setCurrentJobStatus(JobStatus.InProgress);
        clearInterval(intervalId);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [jobStartDateTimeUtc, currentJobStatus]);

  // timer for time left to cancel job
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeFromNow(cancelUntil));
      if (getTimeDiff(getLocalTime(cancelUntil)) < 0) {
        setIsCancellable(false);
        // once job is not cancellable we dont need this timer
        clearInterval(intervalId);
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [setIsCancellable, cancelUntil]);

  // timer for job ending time
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentJobStatus !== JobStatus.InProgress) return;
      setTimeUntilEnd(calculateTimeFromNow(jobEndDateTimeUtc));
      if (getTimeDiff(getLocalTime(jobEndDateTimeUtc)) < 0) {
        setCurrentJobStatus(JobStatus.Ended);
        // once job is ended we dont need this timer
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [setTimeUntilEnd, jobEndDateTimeUtc, currentJobStatus]);

  const onCopyAddressPress = () => {
    Clipboard.setString(facility.address);
    onCopyAddress();
  };

  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    alertBox: {
      marginBottom: theme.spacing(4),
    },
    buttonContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    cancelButton: {
      marginRight: theme.spacing(5),
    },
  });

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Card>
        <View style={styles.container}>
          <Chips>
            <JobStatusChip jobStatus={currentJobStatus} />
            {isNightShift ? <NightShift /> : <DayShiftChip />}
          </Chips>
          <Job
            jobTitle={jobTitle}
            jobStartDateTimeUtc={jobStartDateTimeUtc}
            jobEndDateTimeUtc={jobEndDateTimeUtc}
            facility={facility}
          />
          {isCancellable && (
            <AlertBox variant={AlertVariants.Red} style={styles.alertBox}>
              Time Left to Cancel Job: {timeLeft}
            </AlertBox>
          )}
          {currentJobStatus === JobStatus.InProgress && (
            <AlertBox variant={AlertVariants.Yellow} style={styles.alertBox}>
              Job ends in – {timeUntilEnd}
            </AlertBox>
          )}
          {currentJobStatus === JobStatus.Ended && (
            <AlertBox variant={AlertVariants.Red} style={styles.alertBox}>
              Job ended
            </AlertBox>
          )}
          <View style={styles.buttonContainer}>
            {isCancellable && (
              <TextButton
                style={styles.cancelButton}
                onPress={onReject}
                variant={TextButtonVariant.Secondary}>
                Cancel
              </TextButton>
            )}
            <Button
              onPress={onCopyAddressPress}
              variant={ButtonVariant.AccentOutline}>
              Copy Address
            </Button>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default MyJobCard;
