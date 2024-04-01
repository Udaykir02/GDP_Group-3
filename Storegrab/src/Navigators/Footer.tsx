import React from 'react';
import { Icon, useTheme, Text } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';

import HomeContainer from '../Containers/WelcomeContainer/HomeContainer';
import AccountContainer from '../Containers/Account/AccountContainer';
import { AppTheme } from '@/styles/theme/theme';
import Header from './Header';

const Footer: React.FC = () => {
  const Tab = createBottomTabNavigator();
  const { colors }: AppTheme = useTheme();

  const styles = StyleSheet.create({
    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: '600'
    },
    tabBarStyle: {
      backgroundColor: colors.brightWhite,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.58,
      shadowRadius: 10.0,
      elevation: 24,
      zIndex: 0
    }
  });
  const OrdersStack = createNativeStackNavigator();
  const HomesStack = createNativeStackNavigator();
  const DeliveriesStack = createNativeStackNavigator();
  const ResourcesStack = createNativeStackNavigator();
  const AccountStack = createNativeStackNavigator();

  interface TabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
  }

  const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
    return (
      <View
        style={[
          styles.tabBarStyle,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingBottom: Platform.OS === 'ios' ? 34 : 10
            // backgroundColor: colors.brightWhite
          }
        ]}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          let ActiveTintColor = colors.textDarken;

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: false
            });

            if (route.name == 'Orders') {
              navigation.navigate('Orders', { screen: 'Orders' });
            } else {
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            }
          };

          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Orders') {
            iconName = 'shopping-outline';
          } else if (route.name === 'VendorsTab') {
            iconName = 'truck-outline';
          } else if (route.name === 'Resources') {
            iconName = 'briefcase-variant-outline';
          } else if (route.name === 'Account') {
            iconName = 'account-circle-outline';
          }
          if (isFocused) {
            ActiveTintColor = colors.primary;
          }
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
              <Icon source={iconName} size={24} color={ActiveTintColor} />
              <Text style={[styles.tabBarLabelStyle, { color: ActiveTintColor, marginTop: 3 }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: styles.tabBarLabelStyle
        }}
      >
        {() => (
          <HomesStack.Navigator
            screenOptions={{
              headerShown: true,
              header: ({ navigation, route, options, back }) => {
                return <Header {...back} {...navigation} {...route} {...options} />;
              }
            }}
          >
            <HomesStack.Screen name="HomeScreen" component={HomeContainer} />
          </HomesStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Orders"
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Orders',
          tabBarLabelStyle: styles.tabBarLabelStyle
        }}
      >
        {() => (
          <OrdersStack.Navigator
            screenOptions={{
              headerShown: true,
              header: ({ navigation, route, options, back }) => {
                return <Header {...back} {...navigation} {...route} {...options} />;
              }
            }}
          >
            <OrdersStack.Screen name="OrdersScreen" component={HomeContainer} />
          </OrdersStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="VendorsTab"
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Vendors',
          tabBarLabelStyle: styles.tabBarLabelStyle
        }}
      >
        {() => (
          <DeliveriesStack.Navigator
            screenOptions={{
              headerShown: true,
              header: ({ navigation, route, options, back }) => {
                return <Header {...back} {...navigation} {...route} {...options} />;
              }
            }}
          >
            <DeliveriesStack.Screen name="Vendors" component={HomeContainer} />
          </DeliveriesStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Account"
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Account',
          tabBarLabelStyle: styles.tabBarLabelStyle
        }}
      >
        {() => (
          <AccountStack.Navigator
            screenOptions={{
              headerShown: true,
              header: ({ navigation, route, options, back }) => {
                return <Header {...back} {...navigation} {...route} {...options} />;
              }
            }}
          >
            <AccountStack.Screen name="AccountScreen" component={AccountContainer} />
          </AccountStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default Footer;
