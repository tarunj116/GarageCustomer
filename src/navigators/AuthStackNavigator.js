import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/LoginScreen';

import RegistrationScreen from '../screens/RegistrationScreen';
import ForgotPassswordScreen from '../screens/ForgotPassswordScreen';
import OtpScreen from '../screens/OtpScreen';
import ForgotOtpScreen from '../screens/ForgotOtpScreen';
import {SliderScreen} from '../screens/SliderScreen';
import {MainScreen} from '../screens/MainScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import getLocation from '../screens/getLocation';
const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}>
         <AuthStack.Screen name={'SliderScreen'} component={SliderScreen} />
         <AuthStack.Screen name={'Login'} component={LoginScreen} />
     
      <AuthStack.Screen name={'MainScreen'} component={MainScreen} />
      <AuthStack.Screen name={'Registration'} component={RegistrationScreen} />
      <AuthStack.Screen name={'ForgotPassswordScreen'} component={ForgotPassswordScreen} />
      <AuthStack.Screen name={'OtpScreen'} component={OtpScreen} />
      <AuthStack.Screen name={'ForgotOtpScreen'} component={ForgotOtpScreen} />
      <AuthStack.Screen name={'ResetPasswordScreen'} component={ResetPasswordScreen} />
      <AuthStack.Screen name={'getLocation'} component={getLocation} />
    </AuthStack.Navigator>
  );
}
