import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import headerOptions from 'styles/header';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AcceptedHistory from './AcceptedHistory';
import CancelledHistory from './CancelledHistory';
import useTheme from 'hooks/useTheme';
import {StyleSheet} from 'react-native';
import JobDetailsScreen from 'screens/JobDetailsScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
function HistoryScreen(): JSX.Element {
  const theme = useTheme();
  const styles = StyleSheet.create({
    labelStyle: {
      fontFamily: theme.typography.cardTitle.fontFamily,
      fontSize: theme.typography.cardTitle.fontSize,
      textTransform: 'capitalize',
    },
    indicatorStyle: {
      backgroundColor: theme.colors.accent,
    },
    tabStyle: {
      paddingVertical: theme.spacing(3),
    },
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.accent,
        inactiveTintColor: theme.colors.secondaryText,
        labelStyle: styles.labelStyle,
        indicatorStyle: styles.indicatorStyle,
        tabStyle: styles.tabStyle,
      }}>
      <Tab.Screen name='Completed' component={AcceptedHistory} />
      <Tab.Screen name='Cancelled' component={CancelledHistory} />
    </Tab.Navigator>
  );
}

export default function (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='History'
        component={HistoryScreen}
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
