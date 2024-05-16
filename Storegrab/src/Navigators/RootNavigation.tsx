import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginContainer from '../Containers/LoginContainer/LoginContainer';
import Footer from './Footer';
import RegisterContainer from '../Containers/RegisterContainer/RegisterContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContainer from '../Containers/AuthContainer/AuthContainer';
import { useDispatch, useSelector } from 'react-redux';
import RegionContainer from '../Components/Region';
import VendorSubscriptionPage from '../Components/Subscription';
import ResetPasswordScreen from '../Components/ResetPasswordScreen';
import Filters from '../Components/Filters';
import VendorScreen from '../Components/VendorScreen';
import Cart from '../Components/Cart';
import { renewTokenRequest } from '../../actions/userActions';

const AuthStack = createNativeStackNavigator();

export type RootStackParamList = {
  Root: undefined;
  Login: undefined;
  Location: undefined;
  Region: undefined;
  VendorSubscription: undefined;
  Filter: undefined;
  Vendor: undefined;
  Cart: undefined;
};

const MainContainer = () => {
  return <Footer />;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const [accessToken,setAccessToken] = React.useState('')
  const token = useSelector((state:any) => state.auth.token);
  const dispatch = useDispatch();
  React.useEffect(()=>{
    renewToken()
  },[])
  React.useEffect(()=>{
    getTokenFromStorage()
  },[token])

  const renewToken = async ()=>{
    const token = await AsyncStorage.getItem('auth_token');
    if(token !== null){
      dispatch(renewTokenRequest(token))
    }
  }

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
      <AuthStack.Screen name='Reset' component={ResetPasswordScreen} />
    </AuthStack.Navigator>
    )
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Root">
      <Stack.Screen name="Root" component={MainContainer} />
      <Stack.Screen name="Region" component={RegionContainer} />
      <Stack.Screen name="VendorSubscription" component={VendorSubscriptionPage} />
      <Stack.Screen name="Filter" component={Filters} options={{headerShown: true, headerBackTitle: 'back'}}/>
      <Stack.Screen name="Vendor" component={VendorScreen} options={{headerShown: true, headerBackTitle: 'back'}}/>
      <Stack.Screen name="Cart" component={Cart} options={{headerShown: true, headerBackTitle: 'back'}}/>
    </Stack.Navigator>
  );
};

export default RootNavigation;
