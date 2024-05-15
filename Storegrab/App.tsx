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
    merchantIdentifier="merchant.identifier" // required for Apple Pay
    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
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


export default App;
