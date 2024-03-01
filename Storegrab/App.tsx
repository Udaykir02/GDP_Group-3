/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import ApplicationNavigator from './src/Navigators/Application';
import store from './store';

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
      <Provider store={store}>
        <ApplicationNavigator />
      </Provider>
    </PaperProvider>

  );
}


export default App;
