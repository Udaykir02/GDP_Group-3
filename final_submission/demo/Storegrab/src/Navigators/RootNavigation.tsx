import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginContainer from '../Containers/LoginContainer/LoginContainer';
import Footer from './Footer';
import RegisterContainer from '../Containers/RegisterContainer/RegisterContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContainer from '../Containers/AuthContainer/AuthContainer';
import { useSelector } from 'react-redux';

const AuthStack = createNativeStackNavigator();

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
  const [accessToken,setAccessToken] = React.useState('')
  const token = useSelector((state:any) => state.auth.token);
  React.useEffect(()=>{
    getTokenFromStorage()
  },[token])

  
  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token !== null) {
        // Token exists, do something with it (e.g., use it for authentication)
        setAccessToken(token);
        console.log('Retrieved token:', token);
      } else {
        // Token does not exist
        setAccessToken('');
        console.log('Token does not exist');
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
  };
  if (accessToken === '') {
    return (<AuthStack.Navigator
      screenOptions={{
        headerShown: true,
        //todo: hieudm recheck
        // headerStyle: {
        //   backgroundColor: theme.Colors.Palette.angry,
        // },
        // cardStyle: {
        //   backgroundColor: theme.Colors.transparent,
        // },
      }}
    >
      <AuthStack.Screen name='Welcome' component={AuthContainer} />
      <AuthStack.Screen name='Login' component={LoginContainer} />
      <AuthStack.Screen name='Register' component={RegisterContainer} />
    </AuthStack.Navigator>
    )
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Root">
      <Stack.Screen name="Root" component={MainContainer} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
