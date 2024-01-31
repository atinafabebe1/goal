import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AboutPage from '../screens/About';

import { HomeStackNavigator } from './HomeStack';
import { SchoolsStackNavigator } from './SchoolStack';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    const theme = useTheme();
    const { t } = useTranslation()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === t('Menu.home')) {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === t('Menu.schools')) {
                        iconName = focused ? 'school' : 'school-outline';
                    } else if (route.name === t("Menu.about")) {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarStyle: {
                    backgroundColor: theme.colors.primary,
                },
                tabBarHideOnKeyboard: true
            })}
        >
            <Tab.Screen name={t("Menu.home")} component={HomeStackNavigator} options={{ headerShown: false }} />
            <Tab.Screen name={t("Menu.schools")} component={SchoolsStackNavigator} options={{ headerShown: false }} />
            <Tab.Screen name={t("Menu.about")} component={AboutPage} options={{
                headerShown: true, headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: 'bold',
                },
            }} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
