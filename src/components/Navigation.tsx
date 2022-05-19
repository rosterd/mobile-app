import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import JobListScreen from 'screens/JobListScreen';
import SettingsScreen from 'screens/SettingsScreen';
import MyJobsScreen from 'screens/MyJobsScreen';
import HistoryScreen from 'screens/HistoryScreen';
// import JobAlertScreen from 'screens/JobAlertScreen';
import {StyleSheet} from 'react-native';
import useTheme from 'hooks/useTheme';
import JobListIcon from 'svgIcons/JobListIcon';
import HistoryIcon from 'svgIcons/HistoryIcon';
// import BellIcon from 'svgIcons/BellIcon';
import MyJobsIcon from 'svgIcons/MyJobsIcon';
import SettingsIcon from 'svgIcons/SettingsIcon';
import {StatusBar} from 'react-native';
import {useNavigationRef} from 'hooks/useNavigationRef';
// import useNotification from 'hooks/useNotification';
import Ripple from './Ripple';
import * as Linking from 'expo-linking';

const Tab = createBottomTabNavigator();

const prefix = Linking.createURL('/');
const linking = {
  prefixes: [prefix],
};

const Navigation = (): JSX.Element => {
  const theme = useTheme();
  const navigationRef = useNavigationRef();
  // const {badgeCount, updateBadge} = useNotification();
  const iconSize = {
    width: theme.icons.navIconSize,
    height: theme.icons.navIconSize,
  };

  const styles = StyleSheet.create({
    labelStyle: {
      fontSize: theme.typography.nav.fontSize,
      fontFamily: theme.typography.base.fontFamily,
    },
    tabBarBadgeStyle: {
      backgroundColor: theme.colors.redDark,
      color: theme.colors.white,
      top: -1,
      left: 0,
    },
    tabBarStyle: {
      minHeight: 65,
      backgroundColor: theme.colors.primary,
    },
  });

  const naviationTheme = {
    ...DefaultTheme,
    dark: true,
  };

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle='light-content'
      />
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        theme={naviationTheme}>
        <Tab.Navigator
          tabBarOptions={{
            style: styles.tabBarStyle,
            activeTintColor: theme.colors.accent,
            inactiveTintColor: theme.colors.secondaryLight,
            labelStyle: styles.labelStyle,
            tabStyle: {
              paddingBottom: theme.spacing(2),
              paddingTop: theme.spacing(2),
              minHeight: 65,
            },
          }}>
          <Tab.Screen
            name='Job List'
            component={JobListScreen}
            options={{
              tabBarIcon: ({color}) => (
                <JobListIcon color={color} {...iconSize} />
              ),
              tabBarButton: (props) => <Ripple {...props} />,
            }}
          />
          <Tab.Screen
            name='My Jobs'
            component={MyJobsScreen}
            options={{
              tabBarIcon: ({color}) => (
                <MyJobsIcon color={color} {...iconSize} />
              ),
              tabBarButton: (props) => <Ripple {...props} />,
            }}
          />
          {/* <Tab.Screen
            name='Job Alert'
            component={JobAlertScreen}
            listeners={{
              focus: () => {
                updateBadge(0);
              },
            }}
            options={{
              tabBarBadge: badgeCount ? badgeCount : undefined,
              tabBarIcon: ({color}) => <BellIcon color={color} {...iconSize} />,
              tabBarBadgeStyle: styles.tabBarBadgeStyle,
              tabBarButton: (props) => <Ripple {...props} />,
            }}
          /> */}
          <Tab.Screen
            name='History'
            component={HistoryScreen}
            options={{
              tabBarIcon: ({color}) => (
                <HistoryIcon color={color} {...iconSize} />
              ),
              tabBarButton: (props) => <Ripple {...props} />,
            }}
          />
          <Tab.Screen
            name='Settings'
            component={SettingsScreen}
            options={{
              tabBarIcon: ({color}) => (
                <SettingsIcon color={color} {...iconSize} />
              ),
              tabBarButton: (props) => <Ripple {...props} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
