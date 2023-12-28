import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LandingPage from '../screens/LandingPage';
import SchoolList from '../screens/SchoolList';
import AboutPage from '../screens/About';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Schools') {
                        iconName = focused ? 'school' : 'school-outline';
                    } else if (route.name === 'About') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={LandingPage} />
            <Tab.Screen name="Schools" component={SchoolList} />
            <Tab.Screen name="About" component={AboutPage} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
