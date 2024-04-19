import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider as MUIThemeProvider } from 'styled-components';
import theme from '../styles/theme';

export type ThemeProviderProps = {
  children: React.ReactNode;
};

const AppThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NavigationContainer theme={theme}>
      <PaperProvider theme={theme}>
        <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default AppThemeProvider;
