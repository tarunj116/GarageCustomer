import React, { useState, useEffect,Component } from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar,ImageBackground} from 'react-native';

import axios from 'axios';
import {HeaderIconButton} from '../../components/HeaderIconButton';
import {AuthContext} from '../../contexts/AuthContext';
import {Product} from '../../components/Product';

import {HeaderIconsContainer} from '../../components/HeaderIconsContainer';
import {ThemeContext} from '../../contexts/ThemeContext';
import SecureStorage from 'react-native-secure-storage';
import Stars from 'react-native-stars';
import { Avatar, RadioButton } from 'react-native-paper';
import {BottomNavigation} from '../../components/BottomNavigation';
import { BASE_URL } from "../../config";
import Toast from 'react-native-toast-message';
import Spinner from 'react-native-loading-spinner-overlay';
export default class Category2 extends Component {
    
    static navigationOptions = {
        // Sets the title of the Header
        title: 'Home',
    };
    constructor(props) {
      super(props);
      this.state = {
        firstname: '',
        modalVisible: false,
        lastname: '',
        email: '',
        phone: '',
        photoURL: 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png',
        vehicle_brand:"",
        color1:"white",
        color2:"white",
        color3:"white",
        color4:"white",
        color5:"white",
        color6:"white",
        color7:"white",
        color8:"white",
        color9:"white",
        cat_img:"",
        cat_name:"None",
        Spinner:false,
        nearbyArray:[
          {
              "_id": "61498910ef8d983682e7a00f",
              "garage_name": "fdfdf",
              "name": "klk",
              "profile_image": "https://garage.devtechnosys.tech:17302/public/images/IMAGE-1628848591931.jpg",
              "phone": "77633081172",
              "location": "bani park",
              "lat": "26.931865",
              "long": "75.798454",
              "country_code": null,
              "resetPasswordToken": null,
              "term_condition": "1",
              "available": "1",
              "role": "provider",
              "facebook_link": null,
              "twitter_link": null,
              "status": 1,
              "otp": "1234",
              "email_verified": false,
              "verify_link": null,
              "email": "ark67@mailinator.com",
              "password": "$2a$10$PamlxFWHmdBWg/1LxJAOzuU0uP.HDlwddAArrBTSMMDFqc/vPppme",
              "loc": {
                  "type": "Point",
                  "coordinates": [
                      75.798454,
                      26.931865
                  ]
              },
              "createdAt": "2021-09-21T07:26:08.211Z",
              "modefiedAt": "2021-09-21T07:26:08.211Z",
              "__v": 0,
              "distance": 1474.56051140359,
              "ratings": [
                  {
                      "_id": "61498910ef8d983682e7a00f",
                      "avgRating": 3.5,
                      "totalReview": 2
                  }
              ]
          },
          {
              "_id": "614988d4ef8d983682e7a00b",
              "garage_name": "fdfdf",
              "name": "klk",
              "profile_image": "https://garage.devtechnosys.tech:17302/public/images/IMAGE-1628848591931.jpg",
              "phone": "7763308771172",
              "location": "hasanpura",
              "lat": "26.919009",
              "long": "75.788498",
              "country_code": null,
              "resetPasswordToken": null,
              "term_condition": "1",
              "available": "1",
              "role": "provider",
              "facebook_link": null,
              "twitter_link": null,
              "status": 1,
              "otp": "1234",
              "email_verified": false,
              "verify_link": null,
              "email": "ak67@mailinator.com",
              "password": "$2a$10$jDM6c1pNAYszIlI9NA6oY./MFXcS4mRIgXgSNZxNYV3ysFq2ACOq2",
              "loc": {
                  "type": "Point",
                  "coordinates": [
                      75.788498,
                      26.919009
                  ]
              },
              "createdAt": "2021-09-21T07:25:08.878Z",
              "modefiedAt": "2021-09-21T07:25:08.879Z",
              "__v": 0,
              "distance": 2261.5265449647673,
              "ratings": [
                  {
                      "_id": "614988d4ef8d983682e7a00b",
                      "avgRating": 4,
                      "totalReview": 1
                  }
              ]
          }
      ],
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

getProfile(name="",value="") {
  console.log(value);
 // return false;
  var type="";
  if(name === ""){
     type =this.props.route.params.type;
  this.setState({[type]: "#7A8BE5"});
  this.setState({cat_name: this.props.route.params.cat_name});
  }else{
    type =value;
    this.setState({[value]: "#7A8BE5"});
  this.setState({cat_name: name});
  }
  
  if(type == 'color1'){
    this.setState({cat_img: require("../../assets/car_picture3x.png")});
    this.setState({main_cat_id: '61276618fe2ba4589156d75c'});
   }
   if(type == 'color2'){
    this.setState({cat_img: require('../../assets/indoor1.png')});
    this.setState({main_cat_id: '61276660fe2ba4589156d768'});
   }
   if(type == 'color3'){
    this.setState({cat_img: require('../../assets/spare.png')});
    this.setState({main_cat_id: '6127664ffe2ba4589156d762'});
   }
   if(type == 'color4'){
    this.setState({cat_img: require('../../assets/tire1.png')});
    this.setState({main_cat_id: '612a213655afa55c49bb640f'});
   }
   if(type == 'color5'){
    this.setState({cat_img: require('../../assets/motors.png')});
    this.setState({main_cat_id: '6140543d952c2378c059a86c'});
   }
   if(type == 'color6'){
    this.setState({cat_img: require('../../assets/truck1.png')});
    this.setState({main_cat_id: '6140546e952c2378c059a86d'});
   }
   if(type == 'color7'){
    this.setState({cat_img: require('../../assets/wash1.png')});
    this.setState({main_cat_id: '6140543d952c2378c059a86c'});
   }
   if(type == 'color8'){
    this.setState({cat_img: require('../../assets/assess.png')});
    this.setState({main_cat_id: '6140546e952c2378c059a86d'});
   }
   if(type == 'color9'){
    this.setState({cat_img: require('../../assets/inter1.png')});
    this.setState({main_cat_id: '61276618fe2ba4589156d75c'});
   }
   //return false;
   for (let i = 0; i < 10; i++) {
     const element = 'color'+i;
     if(type != element){
       console.log(element);
       this.setState({[element]: "white"});
     }
   }
  for (let i = 0; i < 10; i++) {
    const element = 'color'+i;
    if(type != element){
      console.log(element);
      this.setState({[element]: "white"});
    }
  }
  this.setState({ spinner: true });
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
        this.setState({ spinner: false });
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
        this.setState({ spinner: false });
        console.log(response);
      }
    })

    .catch(function(error) {
      this.setState({ spinner: false });
      console.log(error);
      //  alert(error.response.data.error)
      //   ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT,ToastAndroid.CENTER);
     // alert(error.response.data.error);
    });
  }
  onRedirect = (name, value,redirect) => {
    console.log(this.props.route.name);
    const { navigate } = this.props.navigation;
    if(this.props.route.name == redirect){
      this.getProfile(name,value);
    }else{
      navigate(redirect,{type: value,cat_name:name })
    }
  }
    render () {
    
      const { navigate } = this.props.navigation;
     
        return (
          <View style={styles.container}>
          <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
          <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
          <View
         style={styles.header}
        >
       
           <View style={{ flexDirection: "row", marginTop: "1%" }}>
            <TouchableOpacity onPress={this.props.navigation.openDrawer}>
              <Image
                source={require("../../assets/menu.png")}
                style={{ top: 11, marginLeft: "20%" }}
              />
            </TouchableOpacity>
            <View style={{ width:200 }}>
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
              color: "#fff",
              backgroundColor: "white",
              borderColor: "#fff",
              borderWidth: 0.5,
              width: "85%",
              height: 50,
              alignSelf: "center",
              borderRadius: 10,
              borderColor: "#fff",

              fontSize: 18,
              marginVertical: 6,
              flexDirection: "row",
            }}
          >
            <View style={{ height: 20, width: 20, top: 15, left: 10 }}>
              <TouchableOpacity>
                <Image
                  style={{ height: "100%", width: "100%" }}
                  source={require("../../assets/loupe.png")}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search Here"
              placeholderTextColor="#D6D6D6"
            />
            <View style={{ height: 30, width: 30, top: 10, right: 10 }}>
              <TouchableOpacity onPress={() => navigate("Filter")}>
                <Image
                  style={{ height: "100%", width: "100%" }}
                  source={require("../../assets/filter.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ top: 10, width: "100%", flexDirection: "column" }}>
            <Text
              style={{
                left: "7%",
                fontSize: 16,
                color: "white",
                fontFamily: "NexaLight",
              }}
            >
              CATEGORIES
            </Text>

            <View style={{ marginLeft: "5%", width: "100%" }}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={[
                  {
                    key: "Car Maintenance",
                    color: this.state.color1,
                    image: require("../../assets/car_picture3x.png"),
                    redirect: "Category",
                    type: "color1",
                  },
                  {
                    key: "Indoor Service",
                    color: this.state.color2,
                    image: require("../../assets/indoor.png"),
                    redirect: "Category2",
                    type: "color2",
                  },
                  {
                    key: "Spare Parts",
                    color: this.state.color3,
                    image: require("../../assets/sparepart.png"),
                    redirect: "Category2",
                    type: "color3",
                  },
                  {
                    key: "Tires Service",
                    color: this.state.color4,
                    image: require("../../assets/tire.png"),
                    redirect: "Category2",
                    type: "color4",
                  },
                  {
                    key: "Motors",
                    color: this.state.color5,
                    image: require("../../assets/motors.png"),
                    redirect: "Category",
                    type: "color5",
                  },
                  {
                    key: "Trucks",
                    color: this.state.color6,
                    image: require("../../assets/truck.png"),
                    redirect: "Category",
                    type: "color6",
                  },
                  {
                    key: "Vehicle Wash",
                    color: this.state.color7,
                    image: require("../../assets/wash.png"),
                    redirect: "Category2",
                    type: "color7",
                  },
                  {
                    key: "Car Accessories",
                    color: this.state.color8,
                    image: require("../../assets/assess.png"),
                    redirect: "Category",
                    type: "color8",
                  },
                  {
                    key: "Car Interior Clean",
                    color: this.state.color9,
                    image: require("../../assets/inter.png"),
                    redirect: "Category",
                    type: "color9",
                  },
                ]}
                // style={{ flex: 1, margin:"5%"}}

                keyExtractor={(item, index) => {
                  return String(index);
                }}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: 90,
                        backgroundColor: item.color,
                        borderColor: "#F6F6F6",
                        borderRadius: 8,
                        height: 60,
                        margin: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                      }}
                      onPress={() => this.onRedirect(item.key,item.type,item.redirect)}
                    >
                      <Image
                        style={{
                          height: "100%",
                          width: "100%",
                          resizeMode: "center",
                        }}
                        source={item.image}
                      />
                      <Text
                        style={{
                          color: "white",
                          fontSize: 8,
                          fontFamily: "NexaLight",
                        }}
                      >
                        {item.key}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </View>
              <View style={styles.middle}>
                <View style={{flex:0.2,backgroundColor:"white"}}>
                <View style={{flex:1,flexDirection:"row",backgroundColor:"#CFD7FF",borderTopLeftRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50,alignItems:"center"}}>
                <Image 
              source={this.state.cat_img}
              style={{
                  width:90,
                  height:40,
                  marginLeft:15,
                  
                  borderRadius:10,
                  
              }}
          />
                  <Text style={{marginLeft:20,marginTop:"3%",color:"#3F51B5",fontSize:19,fontFamily:"NexaLight"}}>{this.state.cat_name}</Text>
                </View>
                </View>
                <View style={{flex:1,backgroundColor:"#CFD7FF"}}>
                  <ScrollView style={{flex:1,backgroundColor:"white",borderTopRightRadius:50}}>
                  <View style={{margin:10}}>
                  <Text style={{color:"#3F51B5",fontFamily:"NexaLight",fontSize:15,marginBottom:10,marginTop:10}}>Select vehicle type:</Text>
                  <View
        style={{
          borderBottomColor: '#3F51B5',
          borderBottomWidth: 1.5,
          marginTop:10
        }}
      />
      <TouchableOpacity  onPress={() => navigate('Category2Filter',{vehicle_type:'Car',type:this.props.route.params.type,cat_name: this.props.route.params.cat_name,main_cat_id:this.state.main_cat_id})} style={{height:80,width:"60%",marginTop:30,flexDirection:"row",backgroundColor:"#576CE4",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20,alignSelf:"center", shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
                <Image 
              source={require('../../assets/car_picture3x.png')}
              style={{
                  width:90,
                  height:40,
                  marginLeft:15,
                  top:20,
                  borderRadius:10,
                  
              }}
          />
                  <Text style={{marginLeft:20,marginTop:24,color:"#FFFFFF",fontSize:19,fontFamily:"NexaLight"}}>Cars</Text>
                </TouchableOpacity>
      
                <TouchableOpacity onPress={() => navigate('Category2Filter',{vehicle_type:'Motors',type:this.props.route.params.type,cat_name: this.props.route.params.cat_name,main_cat_id:this.state.main_cat_id})} style={{height:80,width:"60%",marginTop:30,flexDirection:"row",backgroundColor:"#FFFFFF",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20,alignSelf:"center", shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
                <Image 
              source={require('../../assets/bike.png')}
              style={{
                  width:90,
                  height:40,
                  marginLeft:15,
                  top:20,
                  borderRadius:10,
                  
              }}
          />
                  <Text style={{marginLeft:20,marginTop:24,color:"#3F51B5",fontSize:19,fontFamily:"NexaLight"}}>Motors</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Category2Filter',{vehicle_type:'Truck',type:this.props.route.params.type,cat_name: this.props.route.params.cat_name,main_cat_id:this.state.main_cat_id})} style={{marginBottom:50,height:80,width:"60%",marginTop:30,flexDirection:"row",backgroundColor:"#FFFFFF",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20,alignSelf:"center", shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
                <Image 
              source={require('../../assets/truck1.png')}
              style={{
                  width:90,
                  height:40,
                  marginLeft:15,
                  top:20,
                  borderRadius:10,
                  
              }}
          />
                  <Text style={{marginLeft:20,marginTop:24,color:"#3F51B5",fontSize:19,fontFamily:"NexaLight"}}>Trucks</Text>
                </TouchableOpacity>
                  </View>
      
         
      
                  </ScrollView>
                  </View>
              </View>
              
              <View style={styles.footer}>
              <BottomNavigation />
              </View>
      </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F8F8F8'
  },
  header: {
    height:230,
    backgroundColor: '#3F51B5',borderBottomLeftRadius:40,borderBottomRightRadius:40
},
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30
},
middle: {
  margin:10,
  flex: 2.4,
  backgroundColor: '#CFD7FF',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,


},
footer: {
  flex: 0.2,
  
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
   flexBasis: '40%',
   
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
 spinnerTextStyle: {
  color: '#FFF'
},
});
