import React, { useState, useEffect,Component } from 'react';
import {FlatList,RefreshControl,Platform, StyleSheet, View,Text,Button,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar} from 'react-native';
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
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import mime from "mime";
export default class EditProfile extends Component {
    
    static navigationOptions = {
        // Sets the title of the Header
        title: 'Home',
    };
    constructor(props) {
      super(props);
      this.state = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        photoURL: 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png',
        response: '',
        photoData: [],
        loading: false,
        spinner: false,
        user_id:'',
        photo:''
    }
     
  }

  async componentDidMount() {
    this.setState({ userId: await SecureStorage.getItem("user") }, () => {
      this.getProfile();
    });
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getProfile(); // this block will call when user come back
    });
  }
onChange = (name, value) => {
  this.setState({ [name]: value })
}
getProfile() {
  console.log(this.state.userId);
  this.setState({ loading: true });
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
      console.log(response);
      if (response.data.success == true) {
        
        this.setState({
          firstname: response.data.data.name,
          //     lastname: response.data.response.last_name,
          email: response.data.data.email,
          phone: response.data.data.phone,
          user_id:response.data.data._id,
          photoURL: response.data.data.profile_image,
          //     response: response.data
        });
       console.log(response.data.data.name);
      } else {
        console.log(response);
      }
    })

    .catch(function(error) {
      console.log(error);
      //  alert(error.response.data.error)
      //   ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT,ToastAndroid.CENTER);
     // alert(error.response.data.error);
    });
  }

    editInfo() {
      const os = Platform.OS;
      console.log(os);
      this.setState({ spinner: true })
     
      const formData = new FormData();
      formData.append('user_id',this.state.user_id);
      formData.append('name',this.state.firstname);
      formData.append('email',this.state.email);
      formData.append('phone',this.state.phone);
        axios({
          url:`${BASE_URL}/customer/account_setting`,
          method:'POST',
          data:formData,
          headers:{
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(async (response) => {
            
          this.setState({ spinner: false })
            alert(response.data.message)
            this.getProfile()
            this.props.navigation.navigate('Profile')
        })
        .catch((erroraa) => {
          console.log(erroraa);
          this.setState({ spinner: false })
            if (erroraa.toJSON().message === 'Network Error') {
                alert('Please check your internet connection')
            }
        });
      console.log(this.state.phone);
  }
  chooseImage = () => {
    let options = {
        title: 'Select Image',
        maxWidth: 100,
        maxHeight: 100,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            this.uploadImageOnserver(response);
             this.setState({ photoURL: response.uri });
        }
    });
}
uploadImageOnserver = (result = null) => {
  const formData = new FormData();
   formData.append('user_id',this.state.user_id);
  formData.append('name',this.state.firstname);
   formData.append('email',this.state.email);
   formData.append('phone',this.state.phone);

  if (result) {
    const newImageUri = "file:///" + result.uri?.split("file:/").join("");
    let selectedImageData = {
      uri: Platform.OS == 'android' ? newImageUri : result.uri.replace('file://', ""),
      type: result.type,
      size: result.fileSize,
      name: result.fileName,
    };
    console.log(selectedImageData);
      formData.append(`profile_image`, selectedImageData);
  } else {
      formData.append(`profile_image`, "");
  }
  console.log(formData);
  axios({
    url:`${BASE_URL}/customer/account_setting`,
    method:'POST',
    data:formData,
    headers:{
      'Accept': '*/*',
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => {
    if (response.data.success == true) {
     // alert(response.data.message);
    }
     
  }).catch((erroraa) => {
     
      console.log("Image upload Error --->", erroraa);
      if (erroraa.toJSON().message === 'Network Error') {
          alert('Please check your internet connection')
      }
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
            <TouchableOpacity onPress={() => { navigate('Offers1')    ;}}> 
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
                  <TouchableOpacity onPress={() => {this.chooseImage()}}>
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
            </TouchableOpacity>
                  <ScrollView>
                 
                <Text style={{color:"#3F51B5",fontSize:26,fontFamily:"NexaLight",alignSelf:"center"}}> {this.state.firstname}</Text>
             
                <View
          style={{
            borderBottomColor: '#3F51B5',
            borderBottomWidth: 1.5,
            marginTop:10,
            marginBottom:10,
            margin:10
          }}
        />
        <View style={{padding:20,borderRadius:10}}>
        <Text style={{color:"#3F51B5",fontFamily:"NexaBold",fontSize:20}}>Full name</Text>
        <View style={{flexDirection: 'row'}}>
               <TextInput
                style={styles.fullname}
                placeholder={'Enter text'}
                onChangeText={text => this.onChange("firstname", text)}                 
                placeholderTextColor="#576CE4"
              >{this.state.firstname}</TextInput>
              
              </View>
        <Text style={{marginTop:20,color:"#3F51B5",fontFamily:"NexaBold",fontSize:20}}>Email address</Text>
        <View style={{flexDirection: 'row'}}>
               <TextInput
                style={styles.fullname}
                placeholder={'Enter text'}
                placeholderTextColor="#576CE4"
                editable={false}
                onChangeText={text => this.onChange("email", text)} 
                >{this.state.email}</TextInput>
              
              </View>
        <Text style={{marginTop:20,color:"#3F51B5",fontFamily:"NexaBold",fontSize:20}}>Contact Number</Text>
        <View style={{flexDirection: 'row',}}>
          
              <TextInput
                style={styles.mobilecountry}
                placeholder={'+971'}
                placeholderTextColor="#576CE4"
                keyboardType={'numeric'}
              />
               <TextInput
                style={styles.mobile}
                placeholder={'Mobile Number'}
                placeholderTextColor="#576CE4"
                onChangeText={text => this.onChange("phone", text)} 
                keyboardType={'numeric'}
                >{this.state.phone}</TextInput>
              
              </View>
              
          </View>
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
              marginBottom:55,
              width:'70%',alignSelf:"center"}}
              onPress={() => this.editInfo()}>
              <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 20}}>Save Changes</Text>
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
  color: 'black',
  
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "100%",
  height:60,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 28,
  fontSize:20,
  marginVertical: 6,
},
mobilecountry: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
  fontFamily:'NexaLight',
  backgroundColor:"white",
  color: '#fff',
  left:-6,
  borderColor:'#fff',
  borderWidth: 0.5,
  width: '24%',
  height:60,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 20,
  fontSize:18,
  marginVertical: 6,
},
mobile: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
  fontFamily:'NexaLight',
  backgroundColor:"white",
  paddingLeft:20,
  width: '74%',
  fontSize:18,
  borderRadius: 25,
  

 
},
});
