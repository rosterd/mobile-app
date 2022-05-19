import React from 'react';
import useTheme from 'hooks/useTheme';
import {StyleSheet} from 'react-native';
import CalendarIcon from 'svgIcons/CalendarIcon';
import ClockIcon from 'svgIcons/ClockIcon';
import MapPinIcon from 'svgIcons/MapPinIcon';
import {Job as JobType} from 'types/Job';
import CardSubtitle from './Card/CardSubtitle';
import CardTitle from './Card/CardTitle';
import DayRange from './DayRange';
import IconText from './IconText';
import TimeRange from './TimeRange';

type JobProps = Pick<
  JobType,
  'jobTitle' | 'facility' | 'jobEndDateTimeUtc' | 'jobStartDateTimeUtc'
>;

const Job = ({
  jobTitle,
  facility,
  jobEndDateTimeUtc,
  jobStartDateTimeUtc,
}: JobProps): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    dateBox: {
      marginBottom: theme.spacing(2),
    },
    addressBox: {
      marginBottom: theme.spacing(4),
    },
  });

  return (
    <>
      <CardTitle>{jobTitle}</CardTitle>
      {facility && <CardSubtitle>{facility.facilityName}</CardSubtitle>}
      <IconText
        boxStyle={styles.dateBox}
        text={
          <DayRange
            endDate={jobEndDateTimeUtc}
            startDate={jobStartDateTimeUtc}
          />
        }
        Icon={CalendarIcon}
      />
      <IconText
        boxStyle={styles.dateBox}
        text={
          <TimeRange
            endDate={jobEndDateTimeUtc}
            startDate={jobStartDateTimeUtc}
          />
        }
        Icon={ClockIcon}
      />
      {facility?.address && (
        <IconText
          boxStyle={styles.addressBox}
          text={facility.address}
          Icon={MapPinIcon}
        />
      )}
    </>
  );
};

export default Job;
