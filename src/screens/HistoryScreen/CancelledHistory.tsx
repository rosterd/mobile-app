import LoadMoreButton from 'components/Buttons/LoadMoreButton';
import Loading from 'components/Loading';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {getCancelledHistory} from 'services/rosterdService';
import {Job} from 'types/Job';
import {PagedItems} from 'types/PagedItems';
import History from './History';
import useTheme from 'hooks/useTheme';

const CancelledHistory = (): JSX.Element => {
  const [loading, setLoading] = React.useState(true);
  const [moreLoading, setMoreLoading] = React.useState(false);

  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
    },
    loadMoreButton: {
      marginVertical: theme.spacing(8),
    },
  });

  const [jobList, setJoblist] = React.useState<PagedItems<Job>>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
    items: [],
  });

  React.useEffect(() => {
    getCancelledHistory().then((result) => {
      setJoblist(result);
      setLoading(false);
    });
  }, []);

  const loadMore = () => {
    setMoreLoading(true);
    getCancelledHistory(jobList.currentPage + 1).then((result) => {
      setJoblist({
        ...result,
        items: [...jobList.items, ...result.items],
      });
      setMoreLoading(false);
    });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView style={styles.container}>
      <History jobs={jobList.items} />
      {jobList?.hasNext && (
        <LoadMoreButton
          loading={moreLoading}
          style={styles.loadMoreButton}
          onPress={loadMore}
        />
      )}
    </ScrollView>
  );
};

export default CancelledHistory;
