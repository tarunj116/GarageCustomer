import React, { useState, useEffect, Component } from "react";
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar,ImageBackground} from 'react-native';

import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {Product} from '../components/Product';
import {useGet} from '../hooks/useGet';
import {HeaderIconsContainer} from '../components/HeaderIconsContainer';
import {ThemeContext} from '../contexts/ThemeContext';
import Stars from 'react-native-stars';
import { Switch } from 'react-native-paper';
import {BottomNavigation} from '../components/BottomNavigation';
import SecureStorage from "react-native-secure-storage";
import { BASE_URL } from "../config";
import axios from "axios";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input-view";
import Spinner from 'react-native-loading-spinner-overlay';
export default class MyCards1 extends Component {
    
    static navigationOptions = {
        // Sets the title of the Header
        title: 'Home',
    };
    constructor(props) {
      super(props);
      this.state = {
        cardData:[],
        spinner: false,
        firstname:""
       
    }
     
  }
  async componentDidMount() {
    this.setState({ userId: await SecureStorage.getItem("user"),userNewId: await SecureStorage.getItem("userNewId") }, () => {
      this.getProfile();
    });
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getProfile(); // this block will call when user come back
    });
  }
  getProfile() {
   
    
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
          this.getCardList();
          this.setState({
            firstname: response.data.data.name,
            photoURL: response.data.data.profile_image,
          });
         console.log(response.data.data.name);
        } else {
          console.log(response);
        }
      })
  
      .catch(function(error) {
       
        console.log(error);
      });
    }
  getCardList() {
    this.setState({ spinner: true })
    const url = `${BASE_URL}/customer/get_customer_cards`;
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
    const params = JSON.stringify({
      user_id: userNewId,
    });
    axios
      .post(url,params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response)=> {
        //console.log(response);
        this.setState({ spinner: false })
        if (response.data.status == 1) {
         
          this.setState({cardData:response.data.data.data})
          
         console.log(response.data);
        } else {
          console.log(response);
        }
      })
  
      .catch(function(error) {
        this.setState({ spinner: false })
        console.log(error);
      });
    }
    render () {
      const { navigate } = this.props.navigation;
      const windowHeight = Dimensions.get('window').height;
        return (
          <ImageBackground
          style={{flex: 1,height:windowHeight,width:"100%"}}
          source={require('../assets/mycard.png')}
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
          style={{top:11,marginLeft:"6%"}}
          /></TouchableOpacity>
          <Image 
          source={require('../assets/profile.png')}

          style={{top:-30,
          alignSelf:"flex-end",height:80,width:80,borderColor: "white",borderRadius: 60,borderColor:"white"}}
          />
        </View>
        <ScrollView style={styles.middle}>
        <Image 
          source={require('../assets/cards.png')}

          style={{alignSelf:"center",height:100,width:100,borderRadius: 60}}
          />
           <Text style={{alignSelf:"center",color:"white",fontSize:25,fontFamily:"NexaBold"}}>My Cards</Text>
           <View
          style={{marginTop:80,flex:1,borderRadius:20,backgroundColor:"white"}}
         >
           <FlatList
           
      horizontal={true}
        data={this.state.cardData}
        keyExtractor={(item, index) => { return String(index) }}   
        renderItem={({item}) => 
          
           
            <View style={{backgroundColor:"#3F51B5",borderRadius:20,margin:10}}>
              <View style={{flexDirection:"row",margin:30,justifyContent:"space-between"}}>
              <Image 
          source={require('../assets/cardicon.png')}

          style={{height:30,width:40}}
          />
          {/* <Image 
          source={require('../assets/toggle.png')}

          style={{marginLeft:10,height:30,width:60}}
          /> */}
          <Text style={{marginLeft:90,color:"white",fontSize:12,fontFamily:"NexaLight"}}>{item.exp_month} / {item.exp_year}</Text>
            </View>
            <Text style={{marginLeft:20,color:"white",fontSize:24,fontFamily:"NexaLight"}}>XXXX XXXX XXXX {item.last_four}</Text>
            <Text style={{marginTop:20,marginLeft:20,color:"white",fontSize:16,fontFamily:"NexaLight"}}>Card Holder</Text>
            <Text style={{marginTop:10,marginBottom:10,marginLeft:20,color:"white",fontSize:22,fontFamily:"NexaLight"}}>{this.state.firstname}</Text>
              </View>}
      />
      <View style={{flexDirection:"row",marginLeft:20,marginBottom:50}}>
          {/* <TouchableOpacity
      style={{backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      padding: 20,
      shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
      height:10,
      marginTop:10,
      margin:10,
      borderRadius: 15,
      width:'45%'}}
      onPress={() => {
        navigate('home');
      }}>
        <View style={{flexDirection:"row"}}>
      
      <Text style={{alignSelf:"center", color: '#3F51B5',fontFamily:"NexaBold",fontSize: 11}}>EDIT CARD</Text>
        </View>
      
    </TouchableOpacity> */}
    {/* <TouchableOpacity
      style={{backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      padding: 20,
      height:10,
      marginTop:10,
      shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
      borderRadius: 15,
      width:'45%'}}
      onPress={() => {
        navigate('home');
      }}>
      <Text style={{alignSelf:"center", color: '#3F51B5',fontFamily:"NexaBold",fontSize: 11}}>DELETE CARD</Text>
    </TouchableOpacity> */}
          </View>
      <TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignSelf: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      marginTop:10,
      borderRadius: 15,
      marginBottom:25,
      width:'50%',zIndex:1}}
      onPress={() => {
        navigate('MyCards');
      }}>
      <Text style={{ alignSelf:"center",color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>Add New Card</Text>
    </TouchableOpacity>
          </View>
      
        </ScrollView>
        
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
    flex: 0.1,
},
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
},
middle: {
  flex: 2.5,

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
  borderRadius: 10,
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
spinnerTextStyle: {
  color: '#FFF'
},
});
