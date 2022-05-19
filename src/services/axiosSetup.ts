import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const axiosCustom = axios.create();

axiosCustom.interceptors.request.use(
  async (config) => {
    const tokenString = await SecureStore.getItemAsync('jwtToken');
    const tokenInfo = !!tokenString && JSON.parse(tokenString || '');
    config.headers.Authorization = `Bearer ${tokenInfo.accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosCustom.interceptors.response.use(
  (response) => ({...response, error: undefined}),
  (error) => {
    let errorMessages: string[] = [];
    if (error.response) {
      const {data} = error.response;

      if (typeof data !== 'string') {
        errorMessages = Object.values<string>(data).flat();
      } else {
        errorMessages.push(data);
      }
    }
    return Promise.resolve({data: undefined, error: errorMessages});
  },
);

export type CustomResponse<T> = {
  data: T;
  error: string[] | undefined;
};

export default axiosCustom;
