import React from 'react';
import {Text} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

interface DateTimeProps {
  date: string;
}

dayjs.extend(utc);

const formatDate = (date: string) => {
  const localDateTime = dayjs.utc(date.substring(0, 23)).toString();
  const dateFormat = 'D MMMM, YYYY hh:mm A';
  return `${dayjs(localDateTime).format(dateFormat)}`;
};

const DateTime = ({date}: DateTimeProps): JSX.Element => {
  const dateTime = React.useMemo(() => formatDate(date), [date]);
  return <Text>{dateTime}</Text>;
};

export default DateTime;
