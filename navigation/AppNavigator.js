import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {

    return (
        <Stack.Navigator initialRouteName="App" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="App" component={MainTabNavigator} screenOptions={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
