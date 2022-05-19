import * as React from 'react';
import {View, StyleSheet, ScrollView, Switch} from 'react-native';
import GoogleAutoComplete from 'components/Inputs/GoogleAutoComplete';
import {createStackNavigator} from '@react-navigation/stack';
import headerOptions from 'styles/header';
import CardTitle from 'components/Card/CardTitle';
import CardSubtitle from 'components/Card/CardSubtitle';
import ButtonOptions from 'components/ButtonOptions';
import useTheme from 'hooks/useTheme';
import useUserInfo from 'hooks/useUserInfo';
import {User} from 'types/User';
import Button, {ButtonVariant} from 'components/Buttons/Button';
import {AvailableDays} from 'types/AvailableDays';
import Snackbar from 'components/Snackbar';
import useAuth0 from 'hooks/useAuth0';
import TextButton, {TextButtonVariant} from 'components/Buttons/TextButton';

const weekDayOptions = [
  {
    value: 'monday',
    label: 'Monday',
  },
  {
    value: 'tuesday',
    label: 'Tuesday',
  },
  {
    value: 'wednesday',
    label: 'Wednesday',
  },
  {
    value: 'thursday',
    label: 'Thursday',
  },
  {
    value: 'friday',
    label: 'Friday',
  },
  {
    value: 'saturday',
    label: 'Saturday',
  },
  {
    value: 'sunday',
    label: 'Sunday',
  },
];

const shiftOptions = [
  {
    value: 'dayShift',
    label: 'Day Time',
  },
  {
    value: 'nightShift',
    label: 'Night Time',
  },
];
const Stack = createStackNavigator();
function SettingsScreen() {
  const theme = useTheme();
  const {user, saveUserInfo} = useUserInfo();
  const [preferences, setPreferences] = React.useState(user);
  const [showSnackbar, setshowSnackbar] = React.useState(false);

  const styles = StyleSheet.create({
    container: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(10),
      backgroundColor: '#ecf0f1',
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    subTitle: {
      color: theme.colors.secondaryText,
      marginTop: theme.spacing(1),
    },
    switchContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(8),
    },
    button: {
      width: 162,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    field: {
      marginBottom: theme.spacing(2),
    },
    snackbar: {
      zIndex: 21,
      elevation: 21,
    },
  });

  const hideSnackbar = React.useCallback(() => {
    setshowSnackbar(false);
  }, [setshowSnackbar]);

  const showAddressSnackbar = React.useCallback(() => {
    setshowSnackbar(true);
  }, [setshowSnackbar]);

  const savePreferences = async () => {
    await saveUserInfo({...preferences});
    showAddressSnackbar();
  };

  const updatePreferredDays = (availableDays: unknown) =>
    setPreferences((state) => ({
      ...state,
      availableDays: availableDays as AvailableDays,
    }));

  const updateNotifications = (turnAllNotificationsOff: boolean) =>
    setPreferences((state) => ({
      ...state,
      turnAllNotificationsOff,
    }));

  const updateCity = (city: string) => {
    setPreferences((state) => ({
      ...state,
      city,
    }));
  };

  const updatePreferredShift = (shift: unknown) =>
    setPreferences((state) => ({
      ...state,
      shift: shift as User['shift'],
    }));

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps={'handled'}
      nestedScrollEnabled={true}>
      <View style={styles.field}>
        <CardTitle style={styles.title}>City preference</CardTitle>
        <GoogleAutoComplete
          placeholder='Type city'
          onPress={(data) => {
            const selectedCity = data.structured_formatting.main_text;
            updateCity(selectedCity);
          }}
          styles={{
            textInput: {
              backgroundColor: 'white',
              borderColor: theme.colors.border,
              borderWidth: 1,
            },
            listView: {
              position: 'absolute',
              top: 45,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            },
            row: {
              backgroundColor: 'white',
            },
          }}
          textInputProps={{
            value: preferences.city,
            placeholder: 'Type city name..',
            onChange: ({nativeEvent: {text}}) => {
              updateCity(text);
            },
          }}
        />
      </View>

      <View style={{width: '100%', marginBottom: 6, zIndex: -1, elevation: -1}}>
        <View style={styles.field}>
          <CardTitle>Preferred days to work</CardTitle>
          <CardSubtitle style={styles.subTitle}>
            Select time and days that are suitable for you
          </CardSubtitle>
          <ButtonOptions
            options={weekDayOptions}
            selectedValues={preferences?.availableDays}
            onUpdateValues={updatePreferredDays}
          />
        </View>

        <View style={styles.field}>
          <CardTitle>Preferred time to work</CardTitle>
          <CardSubtitle style={styles.subTitle}>
            You can select one or both options
          </CardSubtitle>
          <ButtonOptions
            options={shiftOptions}
            selectedValues={preferences?.shift}
            onUpdateValues={updatePreferredShift}
          />
        </View>

        <View style={styles.switchContainer}>
          <CardTitle style={styles.title}>Turn Notifications On/Off</CardTitle>
          <Switch
            trackColor={{
              false: theme.colors.inputText,
              true: theme.colors.accent,
            }}
            thumbColor={theme.colors.white}
            ios_backgroundColor={theme.colors.inputText}
            onValueChange={updateNotifications}
            value={preferences?.turnAllNotificationsOff}
          />
        </View>
        <View style={styles.field}>
          <Button
            variant={ButtonVariant.AccentOutline}
            onPress={savePreferences}
            style={styles.button}>
            Save all changes
          </Button>
        </View>
        <View style={styles.snackbar}>
          <Snackbar
            text={'Successfully saved'}
            hide={hideSnackbar}
            isVisible={showSnackbar}
          />
        </View>
      </View>
    </ScrollView>
  );
}
// export default SettingsScreen;

export default function (): JSX.Element {
  const {logout} = useAuth0();
  const theme = useTheme();

  const styles = StyleSheet.create({
    button: {
      color: '#fff',
      marginRight: theme.spacing(3),
    },
  });
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          ...headerOptions,
          headerRight: () => (
            <TextButton
              style={styles.button}
              variant={TextButtonVariant.Secondary}
              onPress={logout}>
              Logout
            </TextButton>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
