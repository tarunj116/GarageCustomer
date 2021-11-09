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
export default class ResetPasswordScreen extends Component {
    
    static navigationOptions = {
        // Sets the title of the Header
        title: 'Home',
    };
    constructor(props) {
      super(props);
      this.state = {
        password:'',
        cpassword:''
    }
     
  }

    resetPassword() {
      const { navigate } = this.props.navigation;
      if(this.state.password==''){
        alert("Please enter New Password");
        return false;
      }
      if(this.state.cpassword==''){
        alert("Please enter Confirm Password");
        return false;
      }
      if(this.state.password!=this.state.cpassword){
        alert("New Password and Confirm Password must be same");
        return false;
      }
      this.setState({ loading: true })
      const url=`${BASE_URL}/customer/resetpassword/${this.props.route.params}`;
      const params = JSON.stringify({
        "password":this.state.password,
        });
        console.log(params);
        
        axios.put(url, params,{

          "headers": {
          
          "content-type": "application/json",
          
          },
          
          })
          .then(function(response) {
            console.log(response);
              if (response.data.success == true) {
                alert(response.data.message);
                navigate("Login");
                return false;
               
               
              }else{
                alert(response);
               
              }
            
            })
            
            .catch(function(error) {
              console.log(error.response);
           //  alert(error.response.data.error)
            //   ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT,ToastAndroid.CENTER);
            alert(error.response.data.error);
           
            
            });
  }
    render () {
      const windowWidth = Dimensions.get('window').width;
      const windowHeight = Dimensions.get('window').height;
      const { navigate } = this.props.navigation;
      console.log(this.props.route.params);
        return (
          <ScrollView style={{width:'100%'}}>
          <ImageBackground
              style={{flex: 1,height:windowHeight,width:"100%"}}
              source={require('../assets/forgotpassword.png')}
              resizeMode={'stretch'}>
                 
               
                <View style={{flex: 1 ,top:80, width: '100%', alignItems: 'center',height:"100%"}}>
                <Text style={{color:'#3F51B5',textAlign: 'center',fontSize:40, fontFamily: 'NexaLight'}}>RESET</Text>
                <Text style={{color:'#3F51B5',textAlign: 'center',fontSize:40, fontFamily: 'NexaLight'}}>PASSWORD</Text>
                 <View style={{marginLeft:6, width: '96%', alignItems: 'center',borderRadius:25,height:"40%",top:'7%'}}>
                  
          
          <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <Text style={styles.headline}>Please enter new password and confirm password to reset your password.</Text>
         
          <TextInput
            style={[styles.inputnew]}
            placeholder={'New Password'}
            placeholderTextColor="#CFD7FF"
            secureTextEntry
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder={'Confirm New Password'}
            placeholderTextColor="#CFD7FF"
            secureTextEntry
            onChangeText={(text) => {
              this.setState({ cpassword: text });
            }}
          />
          </View>
          
       
          
          </View>
          <View style={{flex: 1, width: '100%', alignItems: 'center',top:'10%'}}>
          {/* <FilledButton
            title={'Submit'}
            style={styles.loginButton}
            onPress={() => this.resetPassword()}
          /> */}
          <TouchableOpacity
              style={{
                width: "80%",
                height: "10%",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                marginTop: "5%",
              }}
              onPress={() => this.resetPassword()}
            >
              <Text
                style={{
                  fontFamily:"NexaBold",
                  color: "#3f51b5",
                  fontSize: 16,
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
            </View>
         
          </View>
         
          </ImageBackground>
        </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
  headline: {
    color: 'white', 
    textAlign: 'center',
    justifyContent:'center',
    fontSize: 20,
    marginBottom:10,
    marginLeft:40,
    marginRight:40,
    marginTop:10,
    width:300,
    fontFamily: 'NexaBold'
  },
  headlineDesc: {
    color: 'white', 
    textAlign: 'center', 
    marginLeft:38,
    marginRight:38,
    fontSize: 17,
    marginBottom:10,
    fontFamily: 'NexaLight'
  },
  input: {
    fontFamily:'NexaLight',
    color: '#fff',
    borderColor:'#FFFFFF',
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
  inputnew: {
    fontFamily:'NexaLight',
    color: '#fff',
    borderColor:'#FFFFFF',
    borderWidth: 0.5,
    width: '85%',
    height:50,
    borderRadius: 25,
    borderColor:'#fff',
    paddingLeft: 30,
    fontSize:18,
    marginVertical: 6,
    marginTop:30,
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
