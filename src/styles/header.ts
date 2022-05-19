import theme from './theme';
import {StackNavigationOptions} from '@react-navigation/stack';

const headerOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTitleStyle: {
    fontFamily: theme.typography.h2.fontFamily,
    fontSize: theme.typography.h2.fontSize,
  },
  headerTintColor: theme.colors.accent,
};

export default headerOptions;
