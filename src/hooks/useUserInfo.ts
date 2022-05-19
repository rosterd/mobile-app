import {UserContext} from 'contextProviders/UserContextProvider';
import React from 'react';
import {User} from 'types/User';

interface UserInfo {
  user: User;
  saveUserInfo: (user: User) => void;
}

export default function useUserInfo(): UserInfo {
  return React.useContext(UserContext);
}
