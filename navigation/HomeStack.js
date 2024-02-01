import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import SearchResults from '../screens/SearchResults';
import LandingPage from '../screens/LandingPage';
import School from '../screens/School';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import AddSchoolScreen from '../screens/AddSchool';

const HomeStack = createStackNavigator();

export const HomeStackNavigator = () => {
    const theme = useTheme();
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const { t, i18n } = useTranslation();

    const screenOptions = {
        headerStyle: {
            backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
        },
    };

    const handleLanguageChange = () => {
        const newLanguage = selectedLanguage === 'en' ? 'am' : 'en';
        setSelectedLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <HomeStack.Navigator screenOptions={screenOptions}>
            <HomeStack.Screen
                name="GOAL"
                component={LandingPage}
                options={{
                    screenOptions: {
                        headerTitleStyle: {
                            fontSize: 28,
                            fontWeight: 'bold',
                        },
                    },
                    headerRight: () => (
                        <View style={{ marginRight: 16, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => handleLanguageChange()} style={{ padding: 8 }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: "bold", marginRight: 4 }}>{t('common.language')}</Text>
                            </TouchableOpacity>
                        </View>
                    ),
                }}

            />
            <HomeStack.Screen name="Result" component={SearchResults} />
            <HomeStack.Screen name="School" component={School} />
            <HomeStack.Screen name="AddSchool" component={AddSchoolScreen} />
        </HomeStack.Navigator>
    );
};
