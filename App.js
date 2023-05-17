import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppContainer from './src/AppContainer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignUpScreen } from './src/LoginScreen';
import Listings  from './src/Listings';
import RetailerWebView from './src/RetailerWebview';

const Stack = createNativeStackNavigator();

const App = () => {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={AppContainer} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Listings" component={Listings} />
      <Stack.Screen name='WebView' component={RetailerWebView}/>
    </Stack.Navigator>
  </NavigationContainer>
};

export default App;
