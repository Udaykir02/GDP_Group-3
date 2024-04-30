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
import { StripeProvider } from '@stripe/stripe-react-native';

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
    <Provider store={store}>
      <StripeProvider
        publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
        <PaperProvider>
          <AppThemeProvider>
            <RootNavigation />
          </AppThemeProvider>
        </PaperProvider>
      </StripeProvider>
    </Provider>

  );
}


export default App;
