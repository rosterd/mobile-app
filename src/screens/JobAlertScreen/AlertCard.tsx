import React from 'react';
import Card from 'components/Card/Card';
import CardTitle from 'components/Card/CardTitle';
import SmallText from 'components/SmallText';
import Text from 'components/Text';

import {StyleSheet} from 'react-native';
import Dot from './Dot';
import useTheme from 'hooks/useTheme';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Ripple from 'components/Ripple';

dayjs.extend(relativeTime);

export interface Alert {
  title: string | null;
  description: string | null;
  time: string;
}

interface AlertCardProps extends Alert {
  onPress: () => void;
  isNew?: boolean;
}

const AlertCard = ({
  title,
  description,
  time,
  onPress,
  isNew,
}: AlertCardProps): JSX.Element => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    card: {
      marginBottom: theme.spacing(4),
      elevation: isNew ? 2 : 0,
      opacity: isNew ? 1 : 0.6,
      padding: 0,
    },
    cardRipple: {
      padding: theme.spacing(4),
    },
  });
  const [notificationTime, setNotificationTime] = React.useState(
    dayjs(time).fromNow(),
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNotificationTime(dayjs(time).fromNow());
    }, 60000);
    return () => clearInterval(interval);
  }, [setNotificationTime, time]);

  return (
    <Card style={styles.card}>
      <Ripple
        style={styles.cardRipple}
        rippleSize={200}
        rippleOpacity={0.1}
        rippleColor={theme.colors.primary}
        rippleCentered={false}
        onPress={onPress}>
        <CardTitle>{title}</CardTitle>
        <Text>{description}</Text>
        <SmallText>{notificationTime}</SmallText>
        {isNew && <Dot />}
      </Ripple>
    </Card>
  );
};

export default AlertCard;
