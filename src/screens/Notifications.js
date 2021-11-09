import React, { useState, useEffect,Component } from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar,ImageBackground} from 'react-native';
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
export default class Notifications extends Component {
    
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
        photoURL:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
        response: '',
        loading: false,
        spinner: false,
        notificationArr:[]
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
          this.getNotificationsList();
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
    getNotificationsList(){
      var userNewId = this.state.userNewId.replace('"','');
      userNewId = userNewId.replace('"','');
      const url = `${BASE_URL}/customer/get_notification_list`;
      const params = {
        "customer_id": userNewId,
      }
      console.log(params);
      axios
        .post(url, params, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success == true) {
            //console.log(response.data.data[0].data[0]); 
            // navigate('home');
            this.setState({'notificationArr':response.data.data});
          } else {
            alert("Something Went Wrong !");
          }
          // console.log(response.data);
  
        })
  
        .catch(function (error) {
          console.log(error);
        });
    }
    render () {
      const { navigate } = this.props.navigation;
      const windowHeight = Dimensions.get('window').height;
        return (
          <ImageBackground
          style={{flex: 1,height:windowHeight,width:"100%"}}
          source={require('../assets/notiback.png')}
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
          style={{top:11,marginLeft:30}}
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
                  alignSelf:"flex-end",
                  borderWidth: 3,
                  marginBottom: 20,
                  marginRight:20
                }}
              />
            </TouchableOpacity>
        </View>
        <View style={styles.middle}>
        <Image 
          source={require('../assets/notificationbell.png')}

          style={{top:-105,
          alignSelf:"center",height:110,width:110,borderRadius: 60}}
          />
          <ScrollView style={{marginTop:-100}}>
          {this.state.notificationArr == 0 ?(
            <View
            style={{
              width: "100%",
              
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5%",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                margin: 5,
                borderRadius: 40,
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
                marginVertical: 7,
              }}
            >
              <TouchableOpacity>
                <Image
                  style={{ height: 60, width: 60, right: 20 }}
                  source={require("../assets/settings.png")}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "column" }}>
                <TouchableOpacity
                  onPress={() => navigate("ContactUs")}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "#3F51B5",
                    }}
                  >
                    No Data Found
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 10,
                      color: "#3F51B5",
                    }}
                  >
                    
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
            ) : null}
          <FlatList
                data={this.state.notificationArr}
                // style={{ flex: 1, margin:"5%"}}

                keyExtractor={(item, index) => {
                  return String(index);
                }}
                renderItem={({ item, index }) => {
                  return (
          <View
            style={{
              width: "100%",
              
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5%",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                margin: 5,
                borderRadius: 40,
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
                marginVertical: 7,
              }}
            >
              <TouchableOpacity>
                <Image
                  style={{ height: 60, width: 60, right: 20 }}
                  source={require("../assets/settings.png")}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "column" }}>
                <TouchableOpacity
                  onPress={() => navigate("ContactUs")}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "#3F51B5",
                    }}
                  >
                   {item.title}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 10,
                      color: "#3F51B5",
                    }}
                  >
                     {item.description}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

                  )
                }}
              />
        
          </ScrollView>
        </View>
        
        <View style={styles.footer}>
        <View style={styles.TabBarMainContainer} >
 
 <TouchableOpacity onPress={() => navigate('MyCart')}  activeOpacity={0.6} style={styles.button} >
 
 <Image
   style={{height:24,width:24}}
   source={require('../assets/cart.png')}
   />

 </TouchableOpacity>

 

 <TouchableOpacity onPress={() => navigate('Notifications')}  activeOpacity={0.6} style={styles.buttonbell} >
 
 <Image
   style={{height:70,width:70,bottom:20}}
   source={require('../assets/bellbottom.png')}
   />

 </TouchableOpacity>

 

 <TouchableOpacity onPress={() => navigate('home')} activeOpacity={0.6} style={styles.button1} >

 <Image
   style={{height:24,width:24}}
   source={require('../assets/home2.png')}
   />

 </TouchableOpacity>

 

<TouchableOpacity onPress={() => navigate('MyQuotations')}  activeOpacity={0.6} style={styles.buttonfile} >

<Image
   style={{height:24,width:24}}
   source={require('../assets/file.png')}
   />

</TouchableOpacity>


<TouchableOpacity onPress={() => navigate('MyPurchases')} activeOpacity={0.6} style={styles.button} >

<Image
   style={{height:24,width:24}}
   source={require('../assets/shopping.png')}
   />

</TouchableOpacity>

</View>
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
