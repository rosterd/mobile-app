import React from 'react';
import {Text} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

interface TimeRangeProps {
  startDate: string;
  endDate: string;
}

dayjs.extend(utc);

const formatDate = (date: string) => {
  const localDateTime = dayjs.utc(date.substring(0, 23)).toString();
  const dateFormat = 'hh:mm A';
  return `${dayjs(localDateTime).format(dateFormat)}`;
};

const TimeRange = ({startDate, endDate}: TimeRangeProps): JSX.Element => {
  const timeRange = React.useMemo(
    () => `${formatDate(startDate)} - ${formatDate(endDate)}`,
    [startDate, endDate],
  );
  return <Text>{timeRange}</Text>;
};

export default TimeRange;
