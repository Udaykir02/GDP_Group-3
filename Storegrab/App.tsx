/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React, { useEffect } from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import RootNavigation from './src/Navigators/RootNavigation';

import ApplicationNavigator from './src/Navigators/Application';
import store from './store';
import AppThemeProvider from './src/core/AppThemeProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import { hasExpectedRequestMetadata } from '@reduxjs/toolkit/dist/matchers';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};


function App(): React.JSX.Element {

  // const fetchPublishableKey = async () => {
  //   const key =  ""// fetch key from your server here
  //   setPublishableKey(key);
  // };

  // useEffect(() => {
  //   fetchPublishableKey();
  // }, []);


  return (
    <StripeProvider
    publishableKey={"pk_test_51OzvLoI9X94W95wYlv93WNVV36Yue6aXop1QuiLwpSc9CgSJyusa9IwidvNsxuJ3otfvjTalLrwBzwRogHRvWWZ900BfxC74LG"}
    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.{{Storegrab}}" // required for Apple Pay
    >
    <Provider store={store}>
    <PaperProvider>
      <AppThemeProvider>
        <RootNavigation />
      </AppThemeProvider>
    </PaperProvider>
    </Provider>
    </StripeProvider>

  );
}

// End of the App component test                        
  

  

export default App;
