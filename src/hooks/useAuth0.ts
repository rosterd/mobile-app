import React from 'react';
import {Auth0Context} from 'contextProviders/Auth0ContextProvider';

interface UseAuth0 {
  token: string;
  name: string;
  logout: () => void;
}

export default function useAuth0(): UseAuth0 {
  return React.useContext(Auth0Context);
}
