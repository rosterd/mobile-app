import React from 'react';
import theme from 'styles/theme';

const ThemeContext = React.createContext(theme);

export const ThemeContextProvider: React.FC = ({children}) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export {ThemeContext};
