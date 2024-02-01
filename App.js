import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { SchoolsProvider } from './context/SchoolProvider';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import useDatabase from './hooks/useDatabase';
import i18next from './services/i18next'
import { UserRoleProvider } from './context/userRole';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#008080',
    secondary: '#95a5a6',
    background: '#f0f4f8',
    text: '#333',
    accent: '#3498db'
  },
};


const App = () => {

  SplashScreen.preventAutoHideAsync();
  const isDBLoadingComplete = useDatabase();


  if (isDBLoadingComplete) {
    SplashScreen.hideAsync();
    return (
      <PaperProvider theme={theme}>
        <UserRoleProvider>
          <SchoolsProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SchoolsProvider>
        </UserRoleProvider>
      </PaperProvider>
    );
  }
}

export default App