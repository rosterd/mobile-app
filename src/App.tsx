import React from 'react';
import {ThemeContextProvider} from 'contextProviders/ThemeContextProvider';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import {NotificationContextProvider} from 'contextProviders/NotificationContextProvider';
import Navigation from 'components/Navigation';
import {UserContextProvider} from 'contextProviders/UserContextProvider';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import {Auth0ContextProvider} from 'contextProviders/Auth0ContextProvider';
import {enableScreens} from 'react-native-screens';

enableScreens(true);

Sentry.init({
  dsn: Constants.manifest?.extra?.SENTRY_DSN,
  enableInExpoDevelopment: true,
  debug: true,
});

const App = (): JSX.Element => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Auth0ContextProvider>
      <UserContextProvider>
        <NotificationContextProvider>
          <ThemeContextProvider>
            <Navigation />
          </ThemeContextProvider>
        </NotificationContextProvider>
      </UserContextProvider>
    </Auth0ContextProvider>
  );
};

export default App;
