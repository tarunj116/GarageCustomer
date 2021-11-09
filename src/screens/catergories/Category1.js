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
export default class Category1 extends Component {
    
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
  for (let i = 0; i < 10; i++) {
    const element = 'color'+i;
    if(type != element){
      console.log(element);
      this.setState({[element]: "white"});
    }
  }
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
    const { navigate } = this.props.navigation;
    //this.setState({ loading: true })
   if(this.state.vehicle_brand==''){
    Toast.show({
      type: 'error',
      text1: 'Please select brand !'
    });
   }else{
    Toast.show({
      type: 'success',
      text1: 'Brand Updated Successfully'
    });
    var post = [
      {
        vehicle_brand: this.state.vehicle_brand,
      
      }
      ] 
      
      console.log(post);
     
      navigate('Category1');
   }
    
      return false;
  //   formData.append('profile_image',{
  //     uri: Platform.OS === 'android' ? this.state.photoURL : 'file://' + this.state.photoURL,
  //     name: 'test',
  //     type: 'image/jpeg' // or your mime type what you want
  // });
    console.log(formData);
      axios({
        url:`${BASE_URL}/customer/account_setting`,
        method:'POST',
        data:formData,
        headers:{
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (response) => {
          
          this.setState({ loading: false })
          alert(response.data.message)
          this.getProfile()
          this.props.navigate('Profile')
      })
      .catch((erroraa) => {
          this.setState({ loading: false })
          if (erroraa.toJSON().message === 'Network Error') {
              Toast.show('Please check your internet connection')
          }
      });
    console.log(this.state.phone);
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
                    redirect: "Category1",
                    type: "color5",
                  },
                  {
                    key: "Trucks",
                    color: this.state.color6,
                    image: require("../../assets/truck.png"),
                    redirect: "Category1",
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
                    redirect: "Category1",
                    type: "color8",
                  },
                  {
                    key: "Car Interior Clean",
                    color: this.state.color9,
                    image: require("../../assets/inter.png"),
                    redirect: "Category1",
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
              <View style={{flex:0.3,backgroundColor:"white",margin:15,borderRadius:5, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
                <View style={{flexDirection:"row",marginTop:10}}>
                <Text style={{marginLeft:20,color:"#3F51B5",fontSize:12,fontFamily:"NexaLight"}}>RATINGS</Text>
                <TouchableOpacity>
                <Image
                style={{height:20,width:20,marginLeft:10}}
                source={require('../../assets/aeroup.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                style={{height:20,width:20}}
                source={require('../../assets/aerodown.png')}
                />
              </TouchableOpacity>
                <Text style={{marginLeft:10,color:"#3F51B5",fontSize:12,fontFamily:"NexaLight"}}>ALPHABETICAL</Text>
                <TouchableOpacity>
                <Image
                style={{height:20,width:20,marginLeft:10}}
                source={require('../../assets/aeroup.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                style={{height:20,width:20}}
                source={require('../../assets/aerodown.png')}
                />
              </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('CategoryFilter')}>
                <Image
                style={{height:30,width:30,marginLeft:20,marginTop:-5}}
                source={require('../../assets/filterblue.png')}
                />
              </TouchableOpacity>
                </View>
             
                
                        
              </View>
              <View style={styles.middle}>
                <View style={{flex:0.2,backgroundColor:"white"}}>
                <View style={{flex:1,alignContent:"center",backgroundColor:"#CFD7FF",borderTopLeftRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50,alignItems:"center"}}>
              
                  <Text style={{marginLeft:20,marginTop:20,color:"#3F51B5",fontSize:21,fontFamily:"NexaLight"}}>NEARBY GARAGES</Text>
                </View>
                </View>
                <View style={{flex:1,backgroundColor:"#CFD7FF"}}>
                  <View style={{flex:1,backgroundColor:"white",borderTopRightRadius:50,alignItems:"center"}}>
                
         
                  <ScrollView style={styles.list}>
           
                  <FlatList 
            contentContainerStyle={styles.listContainer}
            
            data={this.state.nearbyArray}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
              return item.id;
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.separator}/>
              )
            }}
            renderItem={(post) => {
              const item = post.item;
              return (
                <TouchableOpacity style={styles.card} onPress={() => navigate('Category2detail')}> 
                  
  
                  <Image style={styles.cardImage} source={{ uri: item.profile_image }}/>
                  
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                    
                          <Text style={{color:"#3F51B5",fontSize:11,fontFamily:"NexaBold",padding:1}}>{item.garage_name}</Text>
                          <Text style={{color:"#3F51B5",fontSize:11,fontFamily:"NexaLight",padding:1}}>{`From AED 100 - AED 900,\Al Barsha, Dubai`}</Text>
                          <TouchableOpacity style={{alignItems:'center',left:-5,flexDirection:"row",marginBottom:10}}>
                          <Stars
                            default={item.ratings[0].avgRating}
                            spacing={4}
                            starSize={10}
                            count={5}
                            fullStar={require("../../assets/starFilled.png")}
                            emptyStar={require("../../assets/emptyStar.png")}
                            halfStar={require("../../assets/starFilled.png")}
                          />
      <Text style={{color:"#3F51B5",fontSize:4,fontFamily:"NexaLight"}}>{item.ratings[0].avgRating} Stars ({item.ratings[0].totalReview} ratings)</Text>
      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}/></ScrollView>
                  </View>
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
});
