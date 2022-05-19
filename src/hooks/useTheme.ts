import React from 'react';
import {ThemeContext} from 'contextProviders/ThemeContextProvider';
import theme from 'styles/theme';

export default function useNotification(): typeof theme {
  return React.useContext(ThemeContext);
}
