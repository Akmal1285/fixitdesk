import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import TicketDetailsScreen from '../screens/TicketDetailsScreen';
import MainTabs from './MainTabs';
import { Ticket } from '../redux/slice/ticketSlice';
import SignUpScreen from '../screens/SignUpScreen';
import useAuth from '../hooks/useAuth';
import SplashScreen from '../screens/SplashScreen';


export type RootStackParamList = {
    Splash: undefined;
    SignUp:  undefined;
    Login: undefined;
    MainTabs: undefined;
    TicketDetails: { ticket: Ticket }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator = () => {
    const user = useAuth();

     if (user === undefined || user === null) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="TicketDetails" component={TicketDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default AppNavigator;