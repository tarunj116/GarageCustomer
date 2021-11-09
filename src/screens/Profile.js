import React, { useState, useEffect,Component } from 'react';
import * as RNLocalize from "react-native-localize";
import I18n from 'react-native-i18n';
import memoize from "lodash.memoize"; 
import { I18nManager,FlatList,RefreshControl, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar} from 'react-native';
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
import Spinner from 'react-native-loading-spinner-overlay';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input-view";


const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ar: () => require("../translations/ar.json"),
  en: () => require("../translations/en.json")
};

const translate = memoize(
  (key, config) => I18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  // fallback if no available language fits
  const fallback = { languageTag: "en", isRTL: false };

  const { languageTag, isRTL } =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  I18n.translations = { [languageTag]: translationGetters[languageTag]() };
  I18n.locale = languageTag;
};
export default class Profile extends Component {
    
    static navigationOptions = {
        // Sets the title of the Header
        title: 'Home',
    };
    constructor(props) {
      super(props);
      setI18nConfig(); 
      this.state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        photoURL:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
        response: '',
        loading: false,
        spinner: false,
    }
   
  }

  async componentDidMount() {
    RNLocalize.addEventListener("change", this.handleLocalizationChange);
    this.setState({ userId: await SecureStorage.getItem("user") }, () => {
      this.getProfile();
    });
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getProfile(); // this block will call when user come back
    });
  }
  componentWillUnmount() {
    RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }
  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };
   getProfile() {
    console.log(this.state.userId);
    this.setState({ spinner: true })
    const url = `${BASE_URL}/customer/me`;
    var token = this.state.userId.replace('"','');
     token = token.replace('"','');
    axios
      .get(url, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response)=> {
        this.setState({ spinner: false })
        if (response.data.success == true) {
          
          this.setState({
            firstname: response.data.data.name,
            //     lastname: response.data.response.last_name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            photoURL: response.data.data.profile_image,
            //     response: response.data
          });
         console.log(response.data.data.name);
        } else {
          this.setState({ spinner: false })
          console.log(response);
        }
      })

      .catch(function(error) {
        this.setState({ spinner: false })
        console.log(error);
        //  alert(error.response.data.error)
        //   ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT,ToastAndroid.CENTER);
       // alert(error.response.data.error);
      });
    }
    render () {
      const { navigate } = this.props.navigation;
      
        return (
          <View style={styles.container}>
              <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
          <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
          <View style={styles.header}>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => { navigate('home')    ;}}> 
                  <Image style={{top:11,marginLeft:10}} source={require('../assets/icons/aerosmall.png')}/>
                  </TouchableOpacity>
              <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                <Image
                source={require('../assets/menu.png')}
                style={{top:11,marginLeft:"20%"}}
                />
                  </TouchableOpacity> 
               
               
              </View>
              
              </View>
              <View style={styles.middle}>
              <Image 
               source={{uri:this.state.photoURL}}
              style={{
                width:130,
                height:130,
                marginLeft:3,
                borderRadius:65,  
                borderColor:"#CFD7FF",
                borderWidth:8, 
               marginTop:-40,
               marginBottom:20,
               alignSelf:"center"
              }}
          />
                <ScrollView>
                
              <Text style={{color:"#3F51B5",fontSize:26,fontFamily:"NexaLight",alignSelf:"center"}}>{this.state.firstname}</Text>
              <View
        style={{
          borderBottomColor: '#3F51B5',
          borderBottomWidth: 1.5,
          marginTop:10,
          marginBottom:10,
          margin:10
        }}
      />
      <TouchableOpacity  style={{flexDirection:"row",alignItems:"center",margin:10,borderRadius:30,backgroundColor:"#FFFFFF",shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
         marginVertical: 7}}>
                    <TouchableOpacity><Image 
              source={require('../assets/emailus.png')}
              style={{
                width:120,
                height:180,
                marginLeft:3,
                borderRadius:15,   
                  
              }}
          /></TouchableOpacity>
          <View style={{margin:20}}>
          <Text style={{color:"#3F51B5",fontSize:20,fontFamily:"NexaLight"}}>{`Email:`}</Text>
          <Text style={{color:"#3F51B5",fontSize:12,fontFamily:"NexaBold"}}>{this.state.email}</Text>
      
          
          </View>
         
                    </TouchableOpacity>
              <TouchableOpacity  style={{flexDirection:"row",alignItems:"center",margin:10,borderRadius:30,backgroundColor:"#FFFFFF",shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
         marginVertical: 7}}>
                    <TouchableOpacity><Image 
              source={require('../assets/contactus.png')}
              style={{
                width:120,
                height:180,
                marginLeft:3,
                borderRadius:15,   
                  
              }}
          /></TouchableOpacity>
          <View style={{margin:20}}>
          <Text style={{color:"#3F51B5",fontSize:20,fontFamily:"NexaLight"}}>{translate("Contact")}</Text>
          <Text style={{color:"#3F51B5",fontSize:15,fontFamily:"NexaBold"}}>{this.state.phone}</Text>
      
          
          </View>
         
                    </TouchableOpacity>
                    <View
        style={{
          borderBottomColor: '#3F51B5',
          borderBottomWidth: 1.5,
          marginTop:10,
          marginBottom:10,
          margin:10
        }}
      />
                    <TouchableOpacity
            style={{backgroundColor: '#3F51B5',alignItems: 'center',
            justifyContent: 'center',
            padding: 23,
            height:10,
            marginTop:20,
            borderRadius: 20,
            marginBottom:15,
            width:'70%',alignSelf:"center"}}
            onPress={() => {
              navigate('EditProfile');
            }}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 18}}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{backgroundColor: '#3F51B5',alignItems: 'center',
            justifyContent: 'center',
            padding: 23,
            height:10,
            borderRadius: 20,
            marginBottom:55,
            width:'70%',alignSelf:"center"}}
            onPress={() => {
              navigate('ChangePasswordScreen');
            }}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 18}}>Change Password</Text>
          </TouchableOpacity>
            
          </ScrollView>
              </View>
              
              <View style={styles.footer}>
              <BottomNavigation />
              </View>
      </View>
        )
    }
}
const styles = StyleSheet.create({
  container1: {
     
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height:10,
    margin:10,
    borderRadius: 15,
    width:'45%',
    
  },
  text1: {
    color: '#FFFFFF',
    
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
  header: {
    flex: 0.5,
    backgroundColor: '#3F51B5',borderBottomLeftRadius:40,borderBottomRightRadius:40
},
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
},
middle: {
  
  marginLeft:25,
  marginRight:25,
  flex: 2.4,
  backgroundColor: '#FFFFFF',
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 4,
  zIndex:1
},
footer: {
  flex: 0.1,
  elevation:7
},
text_footer: {
  color: '#05375a',
  fontSize: 18
},
input: {
  flex:1,
  color: '#fff',
  fontFamily:'NexaLight',
  borderColor:'#fff',
  borderWidth: 0.5,
  width: '85%',
  height:40,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 30,
  fontSize:14,
  marginVertical: 1,
},
TabBarMainContainer :{
  justifyContent: 'space-around', 
  height: 50, 
  flexDirection: 'row',
  width: '100%',
  position:"absolute",
  bottom:0
},
 
button: {
  
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1
},
buttonbell: {
  
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1
},
buttonfile: {
  width:"1%",
 
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1,
  zIndex:1
},
button1: {
  
  position:"relative",
  borderTopRightRadius:15,
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1,
},
buttonpurchase: {
  borderTopLeftRadius:15,
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1,
 
},
list: {
    
  shadowColor: '#00000029',
   shadowOffset: {
     width: 2
   },
   
   shadowOpacity: 0.8,
   shadowRadius: 4,
   marginVertical: 8,
   backgroundColor:"white",
   borderRadius:20,
   flexBasis: '80%',
   borderColor:"#00000029",
   marginHorizontal: 5,
 },
 listContainer:{
   alignItems:'center'
 },
 separator: {
   marginTop: 10,
 },
 /******** card **************/
 card:{
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
   backgroundColor:"white",
   borderRadius:20,
   flexBasis: '46%',
   
   marginHorizontal: 9,
 },
 cardHeader: {
   paddingVertical: 17,
   paddingHorizontal: 16,
   borderTopLeftRadius: 1,
   borderTopRightRadius: 1,
   flexDirection: 'row',
   justifyContent: 'space-between',
 },
 cardFooter:{
   
   paddingTop: 12.5,
  
   paddingHorizontal: 16,
   borderBottomLeftRadius: 1,
   borderBottomRightRadius: 1,
 },
 cardContent: {
   paddingVertical: 12.5,
   paddingHorizontal: 16,
 },

 cardImage:{
   flex: 1,
   height: 120,
   width: null,
   borderTopLeftRadius: 10,
   borderTopRightRadius: 10,
 },
 fullname: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
  fontFamily:'NexaLight',
  
  backgroundColor:"white",
  color: '#fff',
  
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "60%",
  height:40,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 28,
  fontSize:14,
  marginVertical: 6,
},
});
