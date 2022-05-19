import AppLoading from 'expo-app-loading';
import React from 'react';
import {getUserInfo, updateUserInfo} from 'services/rosterdService';
import {User} from 'types/User';

type UserContextType = {
  user: User;
  saveUserInfo: (user: User) => void;
};

const defaultUser = {
  email: '',
  idmUserName: '',
  firstName: '',
  middleName: '',
  lastName: '',
  availableDays: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  },
  shift: {
    dayShift: false,
    nightShift: false,
  },
  deviceId: '',
  city: '',
  turnAllNotificationsOff: false,
};

export const UserContext = React.createContext<UserContextType>({
  user: defaultUser,
  saveUserInfo: () => {},
});

export const UserContextProvider: React.FC = ({children}) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(defaultUser);
  React.useEffect(() => {
    getUserInfo().then((result: User) => {
      setUser(result);
      setLoading(false);
    });
  }, []);

  const saveUserInfo = async (user: User) => {
    setUser(user);
    await updateUserInfo(user);
  };

  if (loading) {
    return <AppLoading />;
  }
  return (
    <UserContext.Provider value={{user, saveUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};
