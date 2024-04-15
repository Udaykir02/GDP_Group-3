/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import RootNavigation from './src/Navigators/RootNavigation';

import ApplicationNavigator from './src/Navigators/Application';
import store from './store';
import AppThemeProvider from './src/core/AppThemeProvider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};


function App(): React.JSX.Element {

  return (
    <PaperProvider>
      <AppThemeProvider>
        <RootNavigation />
      </AppThemeProvider>
    </PaperProvider>

  );
}


export default App;
