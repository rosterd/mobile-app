import * as React from 'react';
import {RefreshControl, ScrollView, View, StyleSheet, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import headerOptions from 'styles/header';
import {useNavigation} from '@react-navigation/native';
import JobDetailsScreen from 'screens/JobDetailsScreen';
import TitleCard from 'components/TitleCard';
import JobCard from './JobCard';
import BgContainer from 'components/BgContainer';
import {Shift} from 'types/Shift';
import JobApplyModal from 'components/Modals/JobApplyModal';
import {acceptJob, getJobList} from 'services/rosterdService';
import {Job} from 'types/Job';
import {PagedItems} from 'types/PagedItems';
import Loading from 'components/Loading';
import LoadMoreButton from 'components/Buttons/LoadMoreButton';
import useUserInfo from 'hooks/useUserInfo';
import GoogleAutoComplete from 'components/Inputs/GoogleAutoComplete';
import theme from 'styles/theme';
import NoData from 'components/NoData';
import NoJobsIcon from 'svgIcons/NoJobsIcon';
import Snackbar from 'components/Snackbar';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing(4),
    height: '100%',
  },
  text: {
    fontFamily: theme.typography.subtitle.fontFamily,
    fontSize: theme.typography.subtitle.fontSize,
    color: theme.colors.black,
    marginBottom: theme.spacing(3),
  },
  snackbar: {
    zIndex: 21,
    elevation: 21,
  },
});
function JobListScreen(): JSX.Element {
  const navigation = useNavigation();
  const {user, saveUserInfo} = useUserInfo();
  const [showSnackbar, setshowSnackbar] = React.useState(false);
  const [applyModal, toggleApplyModal] = React.useState(false);
  const [activeJobId, setActiveJobId] = React.useState<number | undefined>(
    undefined,
  );
  const [loading, setLoading] = React.useState(false);
  const [moreLoading, setMoreLoading] = React.useState(false);

  const [jobList, setJoblist] = React.useState<PagedItems<Job>>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
    items: [],
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const hasCity = typeof user?.city !== 'undefined';

  const fetchData = () => {
    setLoading(true);
    return getJobList().then((result) => {
      setJoblist(result);
      setLoading(false);
    });
  };
  React.useEffect(() => {
    if (hasCity) {
      fetchData();
    }
  }, [hasCity]);

  React.useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getJobList().then((result) => {
      setJoblist(result);
      setRefreshing(false);
    });
  }, []);

  const loadMore = () => {
    setMoreLoading(true);
    getJobList(jobList.currentPage + 1).then((result) => {
      setJoblist({
        ...result,
        items: [...jobList.items, ...result.items],
      });
      setMoreLoading(false);
    });
  };

  const updateCity = React.useCallback(
    (city) => {
      saveUserInfo({
        ...user,
        city,
      });
    },
    [user],
  );

  const onApplyPress = React.useCallback(async () => {
    if (typeof activeJobId === 'undefined') return;
    await acceptJob(activeJobId);
    setshowSnackbar(true);
    setJoblist((state) => {
      const jobsList = [...state.items];
      const filteredJobs = jobsList.filter((job) => job.jobId !== activeJobId);
      return {...state, items: filteredJobs};
    });

    toggleApplyModal(false);
  }, [activeJobId]);

  const onCancelPress = React.useCallback(() => {
    toggleApplyModal(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!hasCity) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Select your preferred city where you want to work:
        </Text>
        <GoogleAutoComplete
          placeholder='Type city name ..'
          onPress={(data) => {
            const selectedCity = data.structured_formatting.main_text;
            updateCity(selectedCity);
          }}
          styles={{
            textInput: {
              backgroundColor: 'white',
              borderColor: theme.colors.border,
              borderWidth: 1,
            },
            listView: {
              position: 'absolute',
              top: 45,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            },
            row: {
              backgroundColor: 'white',
            },
          }}
          textInputProps={{}}
        />
      </View>
    );
  }

  if (!jobList || jobList?.items.length === 0) {
    return (
      <NoData
        text="You don't have any matched jobs to display"
        icon={NoJobsIcon}
      />
    );
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TitleCard
          title={`Hello, ${user.firstName}`}
          subTitle={'See some of the latest opportunities for you'}
        />
        <BgContainer>
          {jobList?.items?.map((job, i) => (
            <JobCard
              key={`${job.jobTitle}-${i}`}
              shift={job.isNightShift ? Shift.NightShift : Shift.DayShift}
              onPressApply={() => {
                setActiveJobId(job.jobId);
                toggleApplyModal(true);
              }}
              onPress={() =>
                navigation.navigate('Job Details', {job, showActions: true})
              }
              jobTitle={job.jobTitle}
              description={job.description}
              facility={job.facility}
              jobPostedDateTimeUtc={job.jobPostedDateTimeUtc}
            />
          ))}
          {jobList?.hasNext && (
            <LoadMoreButton loading={moreLoading} onPress={loadMore} />
          )}
        </BgContainer>
      </ScrollView>
      <JobApplyModal
        isVisible={applyModal}
        onApplyPress={onApplyPress}
        onCancelPress={onCancelPress}
      />
      <View style={styles.snackbar}>
        <Snackbar
          text={'Job has been moved to "My Jobs"'}
          buttonLabel='View'
          cta={() => {
            setshowSnackbar(false);
            navigation.navigate('My Jobs');
          }}
          hide={() => setshowSnackbar(false)}
          isVisible={showSnackbar}
        />
      </View>
    </>
  );
}

export default function (): JSX.Element {
  return (
    <Stack.Navigator headerMode={'float'}>
      <Stack.Screen
        name='Job List'
        component={JobListScreen}
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
