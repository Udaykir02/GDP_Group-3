import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeContainer from '../Containers/WelcomeContainer/HomeContainer';
import LoginContainer from '../Containers/LoginContainer/LoginContainer';

const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()
const MainTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginContainer} />
                <Stack.Screen name="Main" component={HomeContainer} />
            </Stack.Navigator>
        </Stack.Navigator>
    );
}

// @refresh reset
const ApplicationNavigator = () => {



    const accessToken = 'password';




    return (
        <NavigationContainer>
            <StatusBar barStyle={'light-content'} />
            {accessToken === '' ? (
                <SafeAreaView>
                    <RootStack.Navigator
                        screenOptions={{
                            headerShown: false,
                            //todo: hieudm recheck
                            // headerStyle: {
                            //   backgroundColor: theme.Colors.Palette.angry,
                            // },
                            // cardStyle: {
                            //   backgroundColor: theme.Colors.transparent,
                            // },
                        }}
                    >
                        <RootStack.Screen name='login' component={LoginContainer} />
                    </RootStack.Navigator>
                </SafeAreaView>
            ) : (
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeContainer} />
                    <Tab.Screen name="Vendors" component={HomeContainer} />
                    <Tab.Screen name="Map" component={HomeContainer} />
                    <Tab.Screen name="Settings" component={HomeContainer} />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    )
}


export default ApplicationNavigator
