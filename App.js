import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { SchoolsProvider } from './context/SchoolProvider';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';

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


  let customFonts = {
    'OpenSans-Regular': require('./assets/fonts/static/OpenSans-Regular.ttf')
  };
  const [isLoaded] = useFonts(customFonts);

  if (!isLoaded) {
    return null
  }

  return (
    <PaperProvider theme={theme}>
      <SchoolsProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SchoolsProvider>
    </PaperProvider>
  );
}

export default App
