import React, { useState, useEffect,Component } from 'react';
import {StyleSheet,ImageBackground,View,TextInput,Text,ScrollView,Dimensions,TouchableOpacity,Image} from 'react-native';

import axios from 'axios';
import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {Product} from '../components/Product';

import {HeaderIconsContainer} from '../components/HeaderIconsContainer';
import {ThemeContext} from '../contexts/ThemeContext';
import SecureStorage from 'react-native-secure-storage';
import Stars from 'react-native-stars';
import { Avatar, RadioButton } from 'react-native-paper';
import {BottomNavigation} from '../components/BottomNavigation';
import {useAuth} from '../hooks/useAuth';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';
import { BASE_URL } from "../config";
export default class ChangePasswordScreen extends Component {
    
  static navigationOptions = {
    // Sets the title of the Header
    title: 'Home',
};
constructor(props) {
  super(props);
  this.state = {
    firstname: '',
    available:0,
    lastname: '',
    email: '',
    phone: '',
    photoURL: 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png',
    response: '',
    loading: false,
    user_id:'',
    oldPassword:"",
    NewPassword:'',
    CPassword:'',
   
}
 
}
setModalVisible = (visible) => {
this.setState({ modalVisible: visible });
}
setChecked = (visible) => {
this.setState({ checked: visible });
}

async componentDidMount() {
this.setState({ userId: await SecureStorage.getItem("user") });
this.setState({ userNewId: await SecureStorage.getItem("userNewId") });
}

editInfo() {
if(this.state.oldPassword==''){
alert("Please enter Old Password");
return false;
}
if(this.state.NewPassword==''){
alert("Please enter New Password");
return false;
}
if(this.state.CPassword==''){
alert("Please enter Confirm Password");
return false;
}
if(this.state.NewPassword!=this.state.CPassword){
alert("New Password and Confirm Password must be same");
return false;
}
var userNewId = this.state.userNewId.replace('"','');
userNewId = userNewId.replace('"','');
const url=`${BASE_URL}/provider/updatepassword`;
  const params = JSON.stringify({"user_id":userNewId, "oldPassword":this.state.oldPassword,"newPassword":this.state.NewPassword});
  console.log(params);
    axios.put(url,params,{

      "headers": {
      
      "content-type": "application/json",
      },
      
      })
      .then((response)=> {
         console.log('Updated');
         if (response.data.success == true) {
          alert(response.data.message);
          this.props.navigation.navigate("Profile");

          
        }
        })
        .catch(function(error) {
        console.log(error);
        });
}
    render () {
      const { navigate } = this.props.navigation;
      const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
        return (
          <ScrollView style={{width:'100%'}}>
          <ImageBackground
              style={{flex: 1,height:windowHeight,width:"100%"}}
              source={require('../assets/forgotpassword.png')}
              resizeMode={'stretch'}>
                 
               
                <View style={{flex: 1 ,top:80, width: '100%', alignItems: 'center',height:"100%"}}>
                <Text style={{color:'#3F51B5',textAlign: 'center',fontSize:40, fontFamily: 'NexaLight'}}>CHANGE</Text>
                <Text style={{color:'#3F51B5',textAlign: 'center',fontSize:40, fontFamily: 'NexaLight'}}>PASSWORD</Text>
                 <View style={{marginLeft:6, width: '96%', alignItems: 'center',borderRadius:25,height:"40%",top:'7%'}}>
                  
          
          <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          <Text style={styles.headline}>Please input your old password before entering a new password.</Text>
          <TextInput
            style={styles.input}
            placeholder={'Old Password'}
            placeholderTextColor="#CFD7FF"
            secureTextEntry
            onChangeText={(text) => {
              this.setState({ oldPassword: text });
            }}
          />
          <TextInput
            style={[styles.inputnew]}
            placeholder={'New Password'}
            placeholderTextColor="#CFD7FF"
            secureTextEntry
            onChangeText={(text) => {
              this.setState({NewPassword: text });
              }}
          />
          <TextInput
            style={styles.input}
            placeholder={'Confirm New Password'}
            placeholderTextColor="#CFD7FF"
            secureTextEntry
            onChangeText={(text) => {
              this.setState({CPassword: text });
              }}
          />
          </View>
          
       
          
          </View>
          <View style={{flex: 1, width: '100%', alignItems: 'center',top:'10%'}}>
          <TouchableOpacity
              style={{
                width: "80%",
                height: 45,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                marginTop: "5%",
              }}
              onPress={() => this.editInfo()}
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
  inputnew: {
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
    marginTop:50,
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
