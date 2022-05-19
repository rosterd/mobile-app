import React from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {Platform} from 'react-native';
import {useNavigationRef} from 'hooks/useNavigationRef';
import useUserInfo from 'hooks/useUserInfo';
import {updateUserInfo} from 'services/rosterdService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

type PushToken = string | undefined;

export type NotificationType = {
  expoPushToken?: PushToken;
  notification?: Notifications.Notification;
  badgeCount?: number;
  updateBadge: (count: number) => void;
};

const NotificationContext = React.createContext<NotificationType>({
  updateBadge: () => {
    return;
  },
});

export const NotificationContextProvider: React.FC = ({children}) => {
  const [expoPushToken, setExpoPushToken] = React.useState<PushToken>('');
  const [badgeCount, setBadgeCount] = React.useState(0);
  const navigationRef = useNavigationRef();
  const {user} = useUserInfo();

  React.useEffect(() => {
    Notifications.getBadgeCountAsync().then((count) => {
      setBadgeCount(count);
    });
  }, [setBadgeCount]);

  const [notification, setNotification] =
    React.useState<Notifications.Notification>();

  const updateBadge = React.useCallback(
    (count) => {
      Notifications.setBadgeCountAsync(count).then((res) => {
        if (res) {
          setBadgeCount(count);
        }
      });
    },
    [setBadgeCount],
  );

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      if (!user?.deviceId) {
        updateUserInfo({...user, deviceId: token});
      }
    });

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener(() => {
        navigationRef.current?.navigate('Job List');
      });

    return () => {
      Notifications.removeNotificationSubscription(responseSubscription);
    };
  }, [user]);

  React.useEffect(() => {
    const reaceivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
        updateBadge(badgeCount + 1);
      },
    );
    return () => {
      Notifications.removeNotificationSubscription(reaceivedSubscription);
    };
  }, [badgeCount, setNotification]);

  return (
    <NotificationContext.Provider
      value={{notification, expoPushToken, badgeCount, updateBadge}}>
      {children}
    </NotificationContext.Provider>
  );
};

export {NotificationContext};

async function registerForPushNotificationsAsync() {
  let token = '';
  if (Device.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('jobAlert', {
      name: 'jobAlert',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
