import React from 'react';
import {Text} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

interface DayRangeProps {
  startDate: string;
  endDate: string;
}

dayjs.extend(utc);

const formatDate = (date: string) => {
  const localDateTime = dayjs.utc(date.substring(0, 23)).toString();
  const dateFormat = 'D MMMM, YYYY';
  return `${dayjs(localDateTime).format(dateFormat)}`;
};

const DayRange = ({startDate, endDate}: DayRangeProps): JSX.Element => {
  const dayRange = React.useMemo(
    () => `${formatDate(startDate)} - ${formatDate(endDate)}`,
    [startDate, endDate],
  );
  return <Text>{dayRange}</Text>;
};

export default DayRange;
