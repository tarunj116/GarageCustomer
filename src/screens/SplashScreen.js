import React from 'react';
import {View, StyleSheet,ImageBackground} from 'react-native';
import {useTheme} from '@react-navigation/native';

export function SplashScreen() {
  const {colors} = useTheme();
  return  <ImageBackground
  style={{flex: 1,height:"100%",width:"100%"}}
  source={require('../assets/Images/Garage_Provider/splash.png')}
  resizeMode={'stretch'}></ImageBackground>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
