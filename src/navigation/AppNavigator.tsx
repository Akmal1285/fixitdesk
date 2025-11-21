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
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

export type RootStackParamList = {
  Reset: undefined;
  Splash: undefined;
  SignUp: undefined;
  Login: undefined;
  MainTabs: undefined;
  TicketDetails: { ticket: Ticket };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const user = useAuth();

  //To do: loading screen , fix auto navigation bug
  // 1. Still loading user state → show only splash
  if (user === undefined) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // 2. User is null shows auth screen
  if (user === null) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen}/>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Reset" component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // 3. User logged in → main app
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
