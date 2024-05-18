import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Animated, TouchableOpacity } from 'react-native';

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
import { useStripe } from '@stripe/stripe-react-native';
import { Linking } from 'react-native';
import ProductFilter from '../Components/ProductFilter';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeContainer from '../Containers/WelcomeContainer/HomeContainer';
import InventorySearch from '../Components/WelcomeContainer/InventorySearch';
import VendorSearch from '../Components/Vendors/VendorSearch';
import Header from './Header';
import OrderScreen from '../Components/OrderScreen';
import EditUserProfile from '../Components/EditProfile';
import { argonTheme } from '../constants';

const Tab = createMaterialTopTabNavigator();


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
  ProductFilter: undefined;
  Search: undefined;
  OrderScreen: undefined;
  EditProfile: undefined;
};

const MainContainer = () => {
  return <Footer />;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const [accessToken, setAccessToken] = React.useState('')
  const token = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();

  const { handleURLCallback } = useStripe();

  const handleDeepLink = React.useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );

  React.useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  React.useEffect(() => {
    renewToken()
  }, [])
  React.useEffect(() => {
    getTokenFromStorage()
  }, [token])

  const renewToken = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token !== null) {
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

  // const  MyTabBar = ({ state, descriptors, navigation, position }:any) =>{
  //   return (
  //     <View style={{ flexDirection: 'row' }}>
  //       {state?.routes?.map((route:any, index:any) => {
  //         const { options } = descriptors[route.key];
  //         const label =
  //           options.tabBarLabel !== undefined
  //             ? options.tabBarLabel
  //             : options.title !== undefined
  //             ? options.title
  //             : route.name;

  //         const isFocused = state.index === index;

  //         const onPress = () => {
  //           const event = navigation.emit({
  //             type: 'tabPress',
  //             target: route.key,
  //             canPreventDefault: true,
  //           });

  //           if (!isFocused && !event.defaultPrevented) {
  //             navigation.navigate(route.name, route.params);
  //           }
  //         };

  //         const onLongPress = () => {
  //           navigation.emit({
  //             type: 'tabLongPress',
  //             target: route.key,
  //           });
  //         };

  //         const inputRange = state?.routes?.map((_, i) => i);
  //         const opacity = position.interpolate({
  //           inputRange,
  //           outputRange: inputRange.map(i => (i === index ? 1 : 0)),
  //         });

  //         return (
  //           <TouchableOpacity
  //             accessibilityRole="button"
  //             accessibilityState={isFocused ? { selected: true } : {}}
  //             accessibilityLabel={options.tabBarAccessibilityLabel}
  //             testID={options.tabBarTestID}
  //             onPress={onPress}
  //             onLongPress={onLongPress}
  //             style={{ flex: 1 }}
  //           >
  //             <Animated.Text style={{ opacity }}>
  //               {label}
  //             </Animated.Text>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
  // }


  const MyTopTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: argonTheme.COLORS.PRIMARY,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: '#fff' },
        }}
      >
        <Tab.Screen
          name="InventorySearch"
          component={InventorySearch}
          options={{ tabBarLabel: 'products', }}
        />
        <Tab.Screen
          name="VendorSearch"
          component={VendorSearch}
          options={{ tabBarLabel: 'shops' }}
        />
      </Tab.Navigator>
    );
  }
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
      <Stack.Screen name="Search"
        options={{
          headerShown: true,
          header: ({ navigation, route, options, back }: any) => {
            return <Header {...back} {...navigation} {...route} {...options} />;
          }
        }}
        component={MyTopTabs} />
      <Stack.Screen name="VendorSubscription" component={VendorSubscriptionPage} options={{ headerShown: true, headerBackTitle: 'back', title: 'Subscription' }} />
      <Stack.Screen name="Filter" component={Filters} options={{ headerShown: true, headerBackTitle: 'back', title: 'Vendor Filter' }} />
      <Stack.Screen name="ProductFilter" component={ProductFilter} options={{ headerShown: true, headerBackTitle: 'back', title: 'Product Filter' }} />
      <Stack.Screen name="Vendor" component={VendorScreen} options={{ headerShown: true, headerBackTitle: 'back', title: 'Vendor Details' }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: true, headerBackTitle: 'back', title: "Cart" }} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: true, headerBackTitle: 'back', title: "Order Details" }} />
      <Stack.Screen name="EditProfile" component={EditUserProfile} options={{ headerShown: true, headerBackTitle: 'back', title: "Edit Profile" }} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
