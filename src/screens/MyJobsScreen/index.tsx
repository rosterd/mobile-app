import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BgContainer from 'components/BgContainer';
import {RefreshControl, ScrollView, View} from 'react-native';
import JobDetailsScreen from 'screens/JobDetailsScreen';
import headerOptions from 'styles/header';
import MyJobCard from './MyJobCard';
import Snackbar from 'components/Snackbar';
import {getMyJobs, rejectJob} from 'services/rosterdService';
import {PagedItems} from 'types/PagedItems';
import {Job} from 'types/Job';
import Loading from 'components/Loading';
import LoadMoreButton from 'components/Buttons/LoadMoreButton';
import NoData from 'components/NoData';
import NoJobsIcon from 'svgIcons/NoJobsIcon';

const Stack = createStackNavigator();
function MyJobsScreen(): JSX.Element {
  const [addressSnackbar, setAddressSnackBar] = React.useState(false);
  const [jobList, setJoblist] = React.useState<PagedItems<Job>>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
    items: [],
  });
  const [loading, setLoading] = React.useState(true);
  const [moreLoading, setMoreLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadMore = () => {
    setMoreLoading(true);
    getMyJobs(jobList.currentPage + 1).then((result) => {
      setJoblist({
        ...result,
        items: [...jobList.items, ...result.items],
      });
      setMoreLoading(false);
    });
  };

  const fetchData = () => {
    return getMyJobs().then((result) => {
      setJoblist(result);
      setLoading(false);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => {
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });
    return willFocusSubscription;
  }, []);

  const onReject = async (jobId: number) => {
    if (typeof jobId === 'undefined') return;
    await rejectJob(jobId);
    setJoblist((state) => {
      const jobsList = [...state.items];
      const filteredJobs = jobsList.filter((job) => job.jobId !== jobId);
      return {...state, items: filteredJobs};
    });
  };

  const hideAddressSnackbar = React.useCallback(() => {
    setAddressSnackBar(false);
  }, [setAddressSnackBar]);

  const showAddressSnackbar = React.useCallback(() => {
    setAddressSnackBar(true);
  }, [setAddressSnackBar]);
  const navigation = useNavigation();
  if (loading) {
    return <Loading />;
  }

  if (!jobList || jobList?.items.length === 0) {
    return (
      <NoData text="You don't have any jobs to display" icon={NoJobsIcon} />
    );
  }

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <BgContainer>
          {jobList?.items?.map((job, i) => (
            <MyJobCard
              key={`${job.jobTitle}-${i}`}
              onCopyAddress={showAddressSnackbar}
              jobStatus={job.jobStatus}
              onPress={() =>
                navigation.navigate('Job Details', {
                  job,
                })
              }
              onReject={() => onReject(job.jobId)}
              jobTitle={job.jobTitle}
              isNightShift={job.isNightShift}
              facility={job.facility}
              jobStartDateTimeUtc={job.jobStartDateTimeUtc}
              jobEndDateTimeUtc={job.jobEndDateTimeUtc}
              cancelUntil={
                job.jobGracePeriodEndDateTimeUtc || job.jobStartDateTimeUtc
              }
            />
          ))}
          {jobList?.hasNext && (
            <LoadMoreButton loading={moreLoading} onPress={loadMore} />
          )}
        </BgContainer>
      </ScrollView>
      <Snackbar
        text={'Address copied successfully'}
        hide={hideAddressSnackbar}
        isVisible={addressSnackbar}
      />
    </View>
  );
}

export default function (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='My Jobs'
        component={MyJobsScreen}
        options={{
          ...headerOptions,
        }}
      />
      <Stack.Screen
        name='Job Details'
        component={JobDetailsScreen}
        options={{
          ...headerOptions,
        }}
      />
    </Stack.Navigator>
  );
}
