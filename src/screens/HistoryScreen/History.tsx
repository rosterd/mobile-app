import {useNavigation} from '@react-navigation/native';
import Job from 'components/Job';
import Ripple from 'components/Ripple';
import useTheme from 'hooks/useTheme';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Job as JobType} from 'types/Job';
import NoData from 'components/NoData';
import NoHistoryIcon from 'svgIcons/NoHistoryIcon';

interface HistoryProps {
  jobs: Array<
    Pick<
      JobType,
      | 'jobTitle'
      | 'jobStartDateTimeUtc'
      | 'jobEndDateTimeUtc'
      | 'jobPostedDateTimeUtc'
      | 'facility'
    >
  >;
}
const History = ({jobs}: HistoryProps): JSX.Element => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = StyleSheet.create({
    job: {
      borderBottomWidth: 1,
      borderColor: theme.colors.borderColor,
      paddingHorizontal: theme.spacing(6),
      paddingVertical: theme.spacing(5),
    },
  });

  if (jobs?.length === 0) {
    return (
      <NoData
        text="You don't have any job history to display"
        icon={NoHistoryIcon}
      />
    );
  }
  return (
    <>
      {jobs.map((job, index) => (
        <Ripple
          rippleSize={400}
          rippleOpacity={0.1}
          rippleColor={theme.colors.primary}
          rippleCentered={false}
          key={`${job.jobTitle}- ${index}`}
          style={styles.job}
          onPress={() => navigation.navigate('Job Details', {job})}>
          <Job {...job} />
        </Ripple>
      ))}
    </>
  );
};

export default History;
