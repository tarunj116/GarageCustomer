import React, { useState, useEffect, Component } from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar,ImageBackground} from 'react-native';

import axios from 'axios';
import { HeaderIconButton } from '../components/HeaderIconButton';
import { AuthContext } from '../contexts/AuthContext';
import { Product } from '../components/Product';
import { FilledButton } from '../components/FilledButton';
import { HeaderIconsContainer } from '../components/HeaderIconsContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import SecureStorage from 'react-native-secure-storage';
import Stars from 'react-native-stars';
import { Avatar, RadioButton } from 'react-native-paper';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAuth } from '../hooks/useAuth';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import { Loading } from '../components/Loading';
import { BASE_URL } from '../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Spinner from 'react-native-loading-spinner-overlay';
export default class Contactus extends Component {

  static navigationOptions = {
    // Sets the title of the Header
    title: 'Home',
  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      lat: "",
      lng: "",
      addressArr: [],
      offersArr: [],
      photoURL:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
      userId: "",
      spinner: false,
      full_name: "",
      full_email: "",
      feedback: "",
     

    }

  }
  async componentDidMount() {
    this.setState({ userId: await SecureStorage.getItem("user"), userNewId: await SecureStorage.getItem("userNewId") }, () => {
      this.getProfile();
    });
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getProfile(); // this block will call when user come back
    });
  }

  getProfile() {
    this.setState({
       spinner: true ,
       full_name: "",
      full_email: "",
      feedback: "",
      })
    const url = `${BASE_URL}/customer/me`;
    var token = this.state.userId.replace('"', '');
    token = token.replace('"', '');
    axios
      .get(url, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({ spinner: false })
        if (response.data.success == true) {
          this.setState({
            firstname: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            photoURL: response.data.data.profile_image,
          });
          
        } else {

          console.log(response);
        }
      })
      .catch(function (error) {
        this.setState({ spinner: false })
      });
  }
  submitContactUs() {
    const { navigate } = this.props.navigation;
    var userNewId = this.state.userNewId.replace('"', '');
    userNewId = userNewId.replace('"', '');
    if(this.state.full_name==''){
      alert("Please enter full name");
      return false;
      }
      if(this.state.full_email==''){
      alert("Please enter address");
      return false;
      }
      if(this.state.feedback==''){
      alert("Please enter feedback");
      return false;
      }
        
  
    const url_new = `${BASE_URL}/customer/store_contact`;
    const params = {
      "customer_id":userNewId,
      "name":this.state.full_name,
      "email":this.state.full_email,
      "feedback":this.state.feedback,
      
  }
     console.log(params);
    axios.post(url_new, params, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if(response.data.success == true){
          alert(response.data.msg);
          navigate('home');
        }
        console.log(response.data);
      })
      .catch(function (error) {
        
      });
  }
  onChange = (name, value) => {
    this.setState({ [name]: value })
  }

  render() {
    const { navigate } = this.props.navigation;
    const windowHeight = Dimensions.get('window').height;
    return (
      <ImageBackground
          style={{flex: 1,height:windowHeight,width:"100%"}}
          source={require('../assets/contactusback.png')}
          resizeMode={'stretch'}>
    <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
    <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
 <View style={styles.header}>
          <TouchableOpacity onPress={this.props.navigation.openDrawer}>
            <Image
              source={require('../assets/menu.png')}
              style={{ top: 11, marginLeft: 30 }}
            /></TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Profile")}

          >
            <Image
              source={{ uri: this.state.photoURL }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 65,
                borderColor: "white",
                alignSelf: "flex-end",
                borderWidth: 3,
                marginBottom: 20,
                marginRight: 20
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.middle}>
        <Image 
          source={require('../assets/contactus1.png')}

          style={{top:-90,
          alignSelf:"center",height:100,width:100,borderRadius: 60}}
          />
           <Text style={{marginTop:-100,alignSelf:"center",color:"white",fontSize:25,fontFamily:"NexaBold"}}>Contact Us</Text>
           
           <ScrollView>
           <View
          style={{marginTop:50,flex:0.84,margin:10,borderRadius:20,backgroundColor:"white"}}
         >
           <View style={{margin:20}}>
     <Text style={{color:"#3F51B5",fontFamily:"NexaBold"}}>Full Name</Text>
              <TextInput
        style={styles.fullname}
        placeholder={'Full Name'}
        placeholderTextColor="#AEADAD"
        onChangeText={text => this.onChange("full_name", text)}
      />
      <Text style={{color:"#3F51B5",fontFamily:"NexaBold"}}>Email address</Text>
              <TextInput
        style={styles.fullname}
        placeholder={'Email address'}
        placeholderTextColor="#AEADAD"
        onChangeText={text => this.onChange("full_email", text)}
      />
      
      <Text style={{color:"#3F51B5",fontFamily:"NexaBold",marginTop:10}}>Feedback:</Text>
              
      <TextInput
        style={styles.textarea}
        placeholder={'Email address'}
        placeholderTextColor="#AEADAD"
        onChangeText={text => this.onChange("feedback", text)}
      />
      
     </View>
            
          
         
         </View>
         <TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignSelf: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      marginTop:10,
      borderRadius: 15,
      marginBottom:55,
      width:'70%',zIndex:1}}
      onPress={() => {
       this.submitContactUs();
      }}>
      <Text style={{ alignSelf:"center",color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>Submit Feedback</Text>
    </TouchableOpacity>
         </ScrollView>
        </View>
        
        <View style={styles.footer}>
        <BottomNavigation />
        </View>
</ImageBackground>
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
},
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
},
middle: {
  flex: 2.4,

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
buttonfile: {
  
 
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1,
  
},
button1: {
  borderTopLeftRadius:15,
  position:"relative",
  
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
  marginRight:10,
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "100%",
  padding:4,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 18,
  fontSize:13,
  marginVertical: 6,
},
textarea: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
  fontFamily:'NexaLight',
  
  backgroundColor:"white",
  color: 'black',
  marginRight:10,
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "100%",
  padding:80,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 18,
  fontSize:13,
  marginVertical: 6,
},
address: {
 
  fontFamily:'NexaLight',
  
  backgroundColor:"white",
  color: 'black',
 
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "100%",
  padding:4,
  borderRadius: 10,
  borderColor:'#fff',
  paddingLeft: 18,
  fontSize:13,
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
  color: '#fff',
  
  borderColor:'#fff',
  borderWidth: 0.5,
  width: '76%',
  height:60,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 28,
  fontSize:18,
  marginVertical: 6,
},
});