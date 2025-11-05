import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import TicketDetailsScreen from '../screens/TicketDetailsScreen';
import MainTabs from './MainTabs';
import { Ticket } from '../redux/slice/ticketSlice';


export type RootStackParamList = {
    Login: undefined;
    MainTabs: undefined;
    TicketDetails: { ticket: Ticket }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}
            >
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="MainTabs" component={MainTabs}/>
                <Stack.Screen name="TicketDetails" component={TicketDetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;