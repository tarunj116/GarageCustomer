import React, { useState, useEffect, Component } from "react";
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar,ImageBackground} from 'react-native';

import Modal from 'react-native-modal';
import axios from "axios";
import { HeaderIconButton } from "../../components/HeaderIconButton";
import { AuthContext } from "../../contexts/AuthContext";
import { Product } from "../../components/Product";
import { useGet } from "../../hooks/useGet";
import { HeaderIconsContainer } from "../../components/HeaderIconsContainer";
import { ThemeContext } from "../../contexts/ThemeContext";
import { BottomNavigation } from "../../components/BottomNavigation";
import SecureStorage from "react-native-secure-storage";
import Stars from "react-native-stars";
import { BASE_URL } from "../../config";
import { useAuth } from "../../hooks/useAuth";
import GetLocation from 'react-native-get-location';
import Spinner from 'react-native-loading-spinner-overlay';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import ImagePicker from "react-native-image-picker";
import { CheckBox, Slider } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Avatar, RadioButton } from 'react-native-paper';
import moment from "moment";
export default class Offers2 extends Component {
  static navigationOptions = {
    // Sets the title of the Header
    title: "Home",
  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      lat:"",
      lng:"",
      isModalVisible:false,
      isModalFirstVisible:false,
      photoURL:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
        garage_image:"https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
      response: "",
      loading: false,
      spinner: false,
      garage_name: "",
      location: "",
      avgRating:0,
      totalReview:0,
      timing:"Open from Mondays - Sundays",
      indoorColor :"#F1F1F1",
      indoorTextColor :"#FFFFFF",
      outdoorColor :"#576CE4",
      outdoorTextColor :"#CFD7FF",
      service_name: "",
      service_price: "",
      service_image:"",
      service_desc:"",
      offer_details:[]
    };
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
    this.setState({ spinner: true });
    const url = `${BASE_URL}/customer/me`;
    var token = this.state.userId.replace('"','');
     token = token.replace('"','');
    axios.get(url, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response)=> {
        this.setState({ spinner: false });
        //console.log(response);
        if (response.data.success == true) {
          this.setState({
            firstname: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            photoURL: response.data.data.profile_image,
          });
          this.getGarageDetails();
        } else {
          this.setState({ spinner: false });
          console.log(response);
        }
      })

      .catch(function(error) {
        this.setState({ spinner: false });
        console.log(error);
      });
     

  }
  getGarageDetails(){
    
    const url=`${BASE_URL}/customer/get_garage_detail`;
    const params = JSON.stringify({
      "garage_id":this.props.route.params.garage_id,
    });
    console.log(params);
    axios.post(url,params,{
      "headers": {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      console.log(response.data.data);
      if(response.data.data[0].ratings.length > 0){
        var arrayRating=response.data.data.ratings;
      }else{
        var arrayRating=[{"avgRating":"0","totalReview":"0"}];
      }
       this.setState({
        garage_image: response.data.data[0].profile_image,
        garage_name: response.data.data[0].garage_name,
        location: response.data.data[0].location,
        avgRating:arrayRating[0].avgRating,
        totalReview:arrayRating[0].totalReview,
        })
        this.getServiceDetails();
        this.getOfferDetail();
    })
    .catch(function(error) {
      console.log(error);
      });
  }
  getOfferDetail() {
   
    const url = `${BASE_URL}/customer/get_offer_detail`;
    const params = {
      "offer_id": this.props.route.params.offer_id,
    }
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
          this.setState({'offer_details':response.data.data});
          // this.getGaragebyOffers();
        } else {
          alert("Something Went Wrong !");
        }
        // console.log(response.data);

      })

      .catch(function (error) {
        console.log(error);
      });
  }
  getServiceDetails(){
    
    const url=`${BASE_URL}/customer/get_service_detail`;
    const params = JSON.stringify({
      "service_id":this.props.route.params.service_id,
    });
    console.log(params);
    axios.post(url,params,{
      "headers": {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      console.log(response.data.data);
     
       this.setState({
        service_name: response.data.data.name,
        service_price: response.data.data.price,
        service_image:response.data.data.image,
        service_desc:response.data.data.description,
        })
    })
    .catch(function(error) {
      console.log(error);
      });
  }
  render() {
    const { navigate } = this.props.navigation;


    return (
      <View style={styles.container}>
      <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
      <View style={styles.header}>
          <View style={{ flexDirection: "row", marginTop: "1%" }}>
            <TouchableOpacity onPress={this.props.navigation.openDrawer}>
              <Image
                source={require("../../assets/menu.png")}
                style={{ top: 11, marginLeft: "20%" }}
              />
            </TouchableOpacity>
            <View style={{ width: 200 }}>
              <Text
                style={{
                  color: "white",
                  top: 10,
                  fontSize: 18,
                  textAlign: "right",
                  fontFamily: "NexaBold",
                }}
              >
                {this.state.firstname}
              </Text>

            </View>
            <TouchableOpacity
              onPress={() => navigate("Profile")}
              style={{ marginLeft: 10 }}
            >
              <Image
                source={{ uri: this.state.photoURL }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 65,
                  borderColor: "white",
                  borderWidth: 3,
                  marginBottom: 20,

                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              color: '#fff',
              backgroundColor: 'white',
              borderColor: '#fff',
              width: '85%',
              alignSelf: "center",
              borderRadius: 10,
              fontSize: 18,
              marginVertical: 6,
              flexDirection: 'row',
            }}>
            <View style={{ height: 20, width: 20, top: 10, left: 10 }}>
              <TouchableOpacity>
                <Image
                  style={{ height: '100%', width: '100%' }}
                  source={require('../../assets/loupe.png')}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search Here"
              placeholderTextColor="#D6D6D6"
            />
            <View style={{ height: 30, width: 30, top: 5, right: 10 }}>
              <TouchableOpacity onPress={() => navigate('Filter')}>
                <Image
                  style={{ height: '100%', width: '100%' }}
                  source={require('../../assets/filter.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
          <View style={styles.middle}>
            <View style={{backgroundColor:"white"}}>
            <View style={{height:70,backgroundColor:"#CFD7FF",borderTopLeftRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50,alignItems:"center"}}>
              <Text style={{top:20,color:"#3F51B5",fontSize:19,fontFamily:"NexaLight"}}>
              OFFERS</Text>
            
              </View>
              
            </View>
            <ScrollView style={{}}>
              <View style={{backgroundColor:"white",borderTopRightRadius:50,margin:10}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <TouchableOpacity><Image 
          source={{ uri: this.state.garage_image }}
          style={{
              width:60,
              height:60,
              
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:160/2,
              
          }}
      /></TouchableOpacity>
      <View style={{margin:20}}>
      <Text style={{color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{this.state.garage_name}</Text>
      <Text style={{color:"#3F51B5",fontSize:10,fontFamily:"NexaLight"}}>{this.state.location}</Text>
      <TouchableOpacity style={{alignItems:'center',left:-5,flexDirection:"row"}}>
              <Stars
                            default={this.state.avgRating}
                            spacing={4}
                            starSize={10}
                            count={5}
                            fullStar={require("../../assets/starFilled.png")}
                            emptyStar={require("../../assets/emptyStar.png")}
                            halfStar={require("../../assets/starFilled.png")}
                          />
                          <Text
                            style={{
                              color: "#3F51B5",
                              fontSize: 10,
                              fontFamily: "NexaLight",
                            }}
                          >{this.state.avgRating} Stars ({this.state.totalReview} ratings)</Text>
      </TouchableOpacity>
      </View>
     
                </View>
              
      <View><Text style={{color:"#3F51B5",alignSelf:"center",fontFamily:"NexaLight",fontSize:18,marginBottom:10}}>{this.state.offer_details.name}</Text>
      <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
    
      
    }}
  />
    <View  style={{flexDirection:"row",alignItems:"center"}}>
                <TouchableOpacity><Image 
          source={{uri:this.state.service_image}}
          style={{
              width:100,
              height:60,
              borderRadius:15,
              borderColor:"#CFD7FF",
              borderWidth:2,
              
              
          }}
      /></TouchableOpacity>
      <View style={{margin:20}}>
      <Text style={{color:"#3F51B5",fontSize:15,fontFamily:"NexaLight"}}>{this.state.service_name}</Text>
      <Text style={{color:"#3F51B5",fontSize:12,fontFamily:"NexaLight"}}>PRICE: AED {this.state.service_price}</Text>
      
      </View>
     
                </View>
                <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
     
      marginBottom:10,
      
    }}
  />
  <View><Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>OFFER PRICE: AED {this.state.service_price*(this.state.offer_details.percentage/100)}</Text></View>
  <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10,
      marginBottom:10,
      
    }}
  />
  <View><Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Service info:</Text>
  <Text style={{color:"#CFD7FF",fontSize:17,fontFamily:"NexaLight"}}>{this.state.service_desc}</Text>
  </View>
  <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10,
      marginBottom:10,
      
    }}
  />
  <TouchableOpacity
        style={{backgroundColor: '#576CE4',alignSelf: 'center',
        justifyContent: 'center',
        padding: 20,
        height:10,
        borderRadius: 15,
        marginBottom:35,
        width:'70%'}}
        onPress={() => {
          navigate('Offers3',{garage_id : this.props.route.params.garage_id,offer_id : this.props.route.params.offer_id,service_id:this.props.route.params.service_id });
        }}>
        <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Request Service</Text>
      </TouchableOpacity>
      </View>
              
              </View>
              </ScrollView>
          </View>
          
          <View style={styles.footer}>
          <BottomNavigation />
  
          </View>
  </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
     
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height:10,
    borderRadius: 15,
    width:'50%',
    
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
    height: 120,
    backgroundColor: '#3F51B5', borderBottomLeftRadius: 40, borderBottomRightRadius: 40
  },
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30
},
middle: {
  
  margin:20,
  flex: 2.4,
 // backgroundColor: '#CFD7FF',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  

},
footer: {
  flex: 0.1,
  
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
  borderTopRightRadius:15,
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1
},
buttonfile: {
  borderTopLeftRadius:14,
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1
},
button1: {
  
  position:"relative",
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
});
