import AppLoading from 'expo-app-loading';
import React, {useState, useEffect} from 'react';
import Constants from 'expo-constants';
import * as AuthSession from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import {Platform} from 'react-native';
import jwtDecode from 'jwt-decode';
import * as Linking from 'expo-linking';

//import * as Sentry from 'sentry-expo';

import {
  RefreshTokenRequestConfig,
  TokenResponse,
  TokenResponseConfig,
} from 'expo-auth-session';
import Login from 'components/Login';

type Auth0Type = {
  logout: () => void;
};

interface User {
  decoded: any;
  jwtToken: string;
}

export const Auth0Context = React.createContext<Auth0Type>({
  logout: () => {},
});

const clientId = Constants.manifest?.extra?.AUTH0_CLIENT_ID;
const domain = Constants.manifest?.extra?.AUTH0_DOMAIN;
const audience = 'http://localhost:3000/dummy-api';
const tokenEndpoint = `https://${domain}/oauth/token`;

const useProxy = Platform.select({web: false, default: true});
const redirectUri = AuthSession.makeRedirectUri({useProxy});

export const Auth0ContextProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | undefined>();
  const authorizationEndpoint = `https://${domain}/authorize`;

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: clientId,
      prompt: AuthSession.Prompt.Login,
      scopes: ['openid', 'profile', 'offline_access'],
      extraParams: {
        audience,
        access_type: 'offline',
      },
    },
    {authorizationEndpoint} as AuthSession.DiscoveryDocument,
  );

  const readTokenFromStorage = async (): Promise<string | null> => {
    // get the cached token config
    const tokenString = await SecureStore.getItemAsync('jwtToken');

    if (tokenString) {
      const tokenConfig: TokenResponseConfig =
        !!tokenString && JSON.parse(tokenString || '');
      // instantiate a new token response object which will allow us to refresh
      let tokenResponse = new AuthSession.TokenResponse(tokenConfig);

      // shouldRefresh checks the expiration and makes sure there is a refresh token
      if (tokenResponse.shouldRefresh()) {
        // All we need here is the clientID and refreshToken because the function handles setting our grant type based on
        // the type of request configuration (refreshtokenrequestconfig in our example)
        const refreshConfig: RefreshTokenRequestConfig = {
          clientId: clientId,
          refreshToken: tokenConfig.refreshToken,
        };
        const endpointConfig: Pick<
          AuthSession.DiscoveryDocument,
          'tokenEndpoint'
        > = {tokenEndpoint};

        // pass our refresh token and get a new access token and new refresh token
        tokenResponse = await tokenResponse.refreshAsync(
          refreshConfig,
          endpointConfig,
        );
        // cache the token for next time
        await SecureStore.setItemAsync(
          'jwtToken',
          JSON.stringify(tokenResponse.getRequestConfig()),
        );
      }

      // decode the jwt for getting profile information
      const decoded = jwtDecode(tokenResponse.idToken || '');
      // storing token in state
      setUser({jwtToken: tokenResponse.accessToken, decoded});
    }
    return tokenString;
  };

  useEffect(() => {
    readTokenFromStorage();
  }, [request, result, user]);

  useEffect(() => {
    if (result?.type === 'success') {
      // we are using auth code flow, so get the response auth code
      const code = result.params.code;
      if (code) {
        // function for retrieving the access token and refresh token from our code
        const getToken = async () => {
          const codeRes: TokenResponse = await AuthSession.exchangeCodeAsync(
            {
              code,
              redirectUri,
              clientId,
              extraParams: {
                code_verifier: request?.codeVerifier || '',
              },
            },
            {tokenEndpoint},
          );
          // get the config from our response to cache for later refresh
          const tokenConfig: TokenResponseConfig = codeRes?.getRequestConfig();

          // get the access token to use
          const jwtToken = tokenConfig.accessToken;

          // caching the token for later
          await SecureStore.setItemAsync(
            'jwtToken',
            JSON.stringify(tokenConfig),
          );

          // decoding the token for getting user profile information
          const decoded = jwtDecode(jwtToken);
          setUser({jwtToken, decoded});
        };
        getToken();
      }
    }
  }, [result]);

  const logoutClearState = async () => {
    setUser(undefined);
  };

  const logout = async () => {
    // const returnTo = AuthSession.makeRedirectUri({useProxy});
    const returnTo = Linking.createURL('/');
    await WebBrowser.openAuthSessionAsync(
      `https://${Constants.manifest?.extra?.AUTH0_DOMAIN}/v2/logout?client_id=${clientId}&returnTo=${returnTo}`,
      'redirectUrl',
    );

    await SecureStore.deleteItemAsync('jwtToken');
    await logoutClearState();
  };

  if (!user && request) {
    return <Login onLogin={() => promptAsync({useProxy})} />;
  }
  if (!user) {
    return <AppLoading />;
  }

  return (
    <Auth0Context.Provider value={{logout}}>{children}</Auth0Context.Provider>
  );
};
