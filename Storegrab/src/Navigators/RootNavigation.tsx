import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginContainer from '../Containers/LoginContainer/LoginContainer';
import Footer from './Footer';

export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  Location: undefined;
};

const MainContainer = () => {
  return <Footer />;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Root">
      <Stack.Screen name="Login" component={LoginContainer} />
      <Stack.Screen name="Root" component={MainContainer} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
