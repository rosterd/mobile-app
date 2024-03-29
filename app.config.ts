import {ExpoConfig, ConfigContext} from '@expo/config';
import 'dotenv/config';

export default ({config}: ConfigContext): Partial<ExpoConfig> => ({
  ...config,
  extra: {
    ...process.env,
  },
});
