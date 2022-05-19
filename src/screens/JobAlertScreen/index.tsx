import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import headerStyles from 'styles/header';
import {useNavigation} from '@react-navigation/native';
import JobDetailsScreen from 'screens/JobDetailsScreen';
import BgContainer from 'components/BgContainer';
import CardTitle from 'components/Card/CardTitle';
import AlertCard, {Alert} from './AlertCard';
import useNotification from 'hooks/useNotification';
import NoData from 'components/NoData';
import NoAlertsIcon from 'svgIcons/NoAlertsIcon';

const Stack = createStackNavigator();

function JobAlertScreen(): JSX.Element {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    title: {
      marginBottom: 16,
      marginTop: 8,
    },
  });
  const {notification} = useNotification();

  const defaultNewAlerts: Alert[] = [
    {
      title: 'Healthcare Assistant',
      description: 'New Position Available for you',
      time: '2021-03-21 09:00',
    },
    {
      title: 'Healthcare Assistant',
      description: 'New Position Available for you',
      time: '2021-03-22 09:00',
    },
    {
      title: 'Healthcare Assistant',
      description: 'New Position Available for you',
      time: '2021-03-22 09:00',
    },
  ];
  const [newAlerts, setNewAlerts] = React.useState(defaultNewAlerts);

  React.useEffect(() => {
    if (notification) {
      setNewAlerts([
        {
          title: notification.request.content?.title,
          description: notification.request.content?.body,
          time: new Date().toString(),
        },
        ...newAlerts,
      ]);
    } else {
      setNewAlerts([]);
    }
  }, [notification]);

  const seenAlerts = [
    {
      title: 'Healthcare Assistant',
      description: 'New Position Available for you',
      time: '2021-03-19 09:00',
    },
    {
      title: 'Healthcare Assistant',
      description: 'New Position Available for you',
      time: '2021-02-21 09:00',
    },
  ];
  const handleCardPress = React.useCallback(() => {
    navigation.navigate('Job Details');
  }, []);

  if (newAlerts.length === 0) {
    return (
      <NoData
        text="You don't have anything to display yet"
        icon={NoAlertsIcon}
      />
    );
  }

  return (
    <ScrollView>
      <BgContainer>
        <View>
          <CardTitle style={styles.title}>NEW FOR YOU</CardTitle>
          {newAlerts.map((alert, index) => (
            <AlertCard
              key={`${alert.title}-${index}`}
              isNew
              {...alert}
              onPress={handleCardPress}
            />
          ))}
        </View>
        <View>
          <CardTitle style={styles.title}>PREVIOUSLY SEEN</CardTitle>
          {seenAlerts.map((alert, index) => (
            <AlertCard
              key={`${alert.title}-${index}`}
              {...alert}
              onPress={handleCardPress}
            />
          ))}
        </View>
      </BgContainer>
    </ScrollView>
  );
}

export default function (): JSX.Element {
  return (
    <Stack.Navigator headerMode={'float'}>
      <Stack.Screen
        name='Job Alert'
        component={JobAlertScreen}
        options={{
          ...headerStyles,
        }}
      />
      <Stack.Screen
        name='Job Details'
        component={JobDetailsScreen}
        options={{
          ...headerStyles,
        }}
      />
    </Stack.Navigator>
  );
}
