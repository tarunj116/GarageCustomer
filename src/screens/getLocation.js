import React, { useState, useEffect,Component } from 'react';
import {StyleSheet,ImageBackground,View,TextInput,Text,ScrollView,Image,TouchableOpacity,Dimensions,ActivityIndicator,ToastAndroid} from 'react-native';

import axios from 'axios';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {Product} from '../components/Product';
import {FilledButton} from '../components/FilledButton';
import {HeaderIconsContainer} from '../components/HeaderIconsContainer';
import {ThemeContext} from '../contexts/ThemeContext';
import SecureStorage from 'react-native-secure-storage';
import Stars from 'react-native-stars';
import { Avatar, RadioButton } from 'react-native-paper';
import {BottomNavigation} from '../components/BottomNavigation';
import {useAuth} from '../hooks/useAuth';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import {Loading} from '../components/Loading';
import {BASE_URL} from '../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
export default class getLocation extends Component {
    
    static navigationOptions = {
        // Sets the title of the Header
        title: 'Home',
    };
    constructor(props) {
      super(props);
      this.state = {
        otp:'',
        phone:'',
       
    }
     
  }
 
 

   
    render () {
      var locations='';
      if (typeof this.props.route.params !== 'undefined') {
        locations=this.props.route.params.text;
        //this.setState({ location: this.props.route.params.text });
      }
      const windowWidth = Dimensions.get('window').width;
      const windowHeight = Dimensions.get('window').height;
      const { navigate } = this.props.navigation;
     
        return (
          <View  style={{height:"100%",backgroundColor:"#3F51B5"}}>
    <GooglePlacesAutocomplete
      autoFocus={true}
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        //console.log(data.description);
        navigate('Registration',{text: data.description })
      }}
      query={{
        key: 'AIzaSyCcPWHyC2mJjFtCKGRgQHyYO310KRH25tw',
        language: 'en',
      }}
      styles={{
        textInputContainer: {
          backgroundColor: 'white',
          marginTop:40
        },
       
        
      }}
      value={locations}
    />
    </View>
        )
    }
}
const styles = StyleSheet.create({
  container:{
    marginLeft:-40,
    top:-90
},
  headline: {
    color: 'white', 
    textAlign: 'center',
     
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom:10,
    marginLeft:40,
    marginRight:40,
    marginTop:10,
    fontFamily: 'NexaBold'
  },
  headlineDesc: {
    color: 'white', 
    textAlign: 'center', 
    marginLeft:38,
    marginRight:38,
    fontSize: 17,
    marginBottom:10,
    fontFamily: 'NexaLight',
    lineHeight: 20,
  },
  input: {
    fontFamily:'NexaLight',
    color: '#fff',
    borderColor:'#FFFFFF',
    color:'black',
    borderWidth: 0.5,
    width: '85%',
    height:50,
    borderRadius: 25,
    borderColor:'#fff',
    paddingLeft: 30,
    fontSize:18,
    marginVertical: 6,
    top:20
  },
  loginButton: {
   width:'60%',
   marginBottom:'30%',
  },
  closeIcon: {
    
    left: 15,
    top: 15,
  },
  
});
