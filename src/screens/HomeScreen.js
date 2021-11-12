import React, { useState, useEffect, Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
  Alert
} from "react-native";
import axios from "axios";
import { HeaderIconButton } from "../components/HeaderIconButton";
import { AuthContext } from "../contexts/AuthContext";
import { Product } from "../components/Product";
import { useGet } from "../hooks/useGet";
import { HeaderIconsContainer } from "../components/HeaderIconsContainer";
import { ThemeContext } from "../contexts/ThemeContext";
import { BottomNavigation } from "../components/BottomNavigation";
import SecureStorage from "react-native-secure-storage";
import Stars from "react-native-stars";
import { BASE_URL } from "../config";
import { useAuth } from "../hooks/useAuth";
import GetLocation from 'react-native-get-location';
import Spinner from 'react-native-loading-spinner-overlay';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import firebase from "react-native-firebase";
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
export default class HomeScreen extends Component {
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
      nearbyArray:[],
      offersArr:[],
      photoURL:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
      response: "",
      loading: false,
      spinner: false,
      refreshing: false,
      color1:"white",
      color2:"white",
      color3:"white",
      color4:"white",
      color5:"white",
      color6:"white",
      color7:"white",
      color8:"white",
      color9:"white",
    };
  }

  async componentDidMount() {
    this.setState({ userId: await SecureStorage.getItem("user"),userNewId: await SecureStorage.getItem("userNewId") }, () => {
      this.getProfile();
      
      this.requestUserPermission();
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        PushNotification.localNotification({
          message: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          bigPictureUrl: remoteMessage.notification.android.imageUrl,
          smallIcon: remoteMessage.notification.android.imageUrl,
          channelId: "channel-id",
        });
      });
     
      
      return unsubscribe;
   

    });
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getProfile(); // this block will call when user come back
    });
  }
  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  }
  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
     console.log(fcmToken);
     this.UpdateDeviceToken(fcmToken);
     console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }
  getProfile() {
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
   this.setState({ spinner: true })
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {
      //console.log(location);
      const url_new = `${BASE_URL}/customer/get_near_by_garage`;
      const params = {"lat": 26.8490526, "long": 75.8043754,"customer_id":userNewId}
     // console.log(params);
      axios.post(url_new,params, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response)=> {
        this.setState({ spinner: false });
        console.log(response.data.data);
       this.getOffersList();
        this.setState({ nearbyArray: response.data.data });
       
      })

      .catch(function(error) {
        this.setState({ spinner: false })
        //console.log(error);
      });
      this.setState({ lat: location.latitude });
      this.setState({ lng: location.longitude });
  })
  .catch(error => {
    this.setState({ spinner: false })
      const { code, message } = error;
  })
    this.setState({ loading: true });
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
        //console.log(response);
       
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

      .catch(function(error) {
        console.log(error);
      });
     

  }
  UpdateDeviceToken = (device_token) => {
    console.log(device_token+"dsaasd");
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
    const url_new = `${BASE_URL}/customer/update_device_token`;
    const params = {"user_id": userNewId, "device_token": device_token}
   // console.log(params);
    axios.post(url_new,params, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      console.log(response);
      this.setState({ spinner: false })
   
   
     
    })

    .catch(function(error) {
      this.setState({ spinner: false })
      //console.log(error);
    });
  }
  updateLike(indexVal=0,statusVal=''){
    console.log(indexVal);
    const garageList=this.state.nearbyArray;
    if(statusVal=='like'){
      garageList[indexVal].favorite_status = 1;
    }
    if(statusVal=='unlike'){
      garageList[indexVal].favorite_status = 0;
    }
    this.addToFavourite(garageList[indexVal]._id);
    this.setState({ nearbyArray: garageList });
  }
  addToFavourite(garage_id_val=""){
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
    const url_new = `${BASE_URL}/customer/favorite_unfavorite`;
    const params = {"customer_id": userNewId, fav_id:garage_id_val, "type": "garage"}
   console.log(params);
  //  return false;
    axios.post(url_new,params, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      console.log(response);
      this.setState({ spinner: false })
   
   
     
    })

    .catch(function(error) {
      this.setState({ spinner: false })
      //console.log(error);
    });
  }
  getOffersList(){
    const url=`${BASE_URL}/customer/get_offers`;
    axios.post(url, {
      "headers": {
      "content-type": "application/json",
      },
      })
      .then((response)=> {
      //  this.setState({ spinner: false })
         //console.log(response);
        // return false;
          if (response.data.success == true) {
            this.setState({offersArr : response.data.data})
          //  this.setState({image : response.data.data.image})
          }else{
            console.log(response);
           
          }
        
        })
        .catch(function(error) {
        console.log(error);
        });
       
  }
  render() {
    const { navigate } = this.props.navigation;
      
    return (
      <View style={styles.container}>
         <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={()=>this.getProfile()}
          />
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
                source={require("../assets/menu.png")}
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
                  source={require("../assets/loupe.png")}
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
                  source={require("../assets/filter.png")}
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
                    image: require("../assets/car_picture3x.png"),
                    redirect: "Category",
                    type: "color1",
                  },
                  {
                    key: "Indoor Service",
                    color: this.state.color2,
                    image: require("../assets/indoor.png"),
                    redirect: "Category2",
                    type: "color2",
                  },
                  {
                    key: "Spare Parts",
                    color: this.state.color3,
                    image: require("../assets/sparepart.png"),
                    redirect: "Category2",
                    type: "color3",
                  },
                  {
                    key: "Tires Service",
                    color: this.state.color4,
                    image: require("../assets/tire.png"),
                    redirect: "Category2",
                    type: "color4",
                  },
                  {
                    key: "Motors",
                    color: this.state.color5,
                    image: require("../assets/motors.png"),
                    redirect: "Category",
                    type: "color5",
                  },
                  {
                    key: "Trucks",
                    color: this.state.color6,
                    image: require("../assets/truck.png"),
                    redirect: "Category",
                    type: "color6",
                  },
                  {
                    key: "Vehicle Wash",
                    color: this.state.color7,
                    image: require("../assets/wash.png"),
                    redirect: "Category2",
                    type: "color7",
                  },
                  {
                    key: "Car Accessories",
                    color: this.state.color8,
                    image: require("../assets/assess.png"),
                    redirect: "Category",
                    type: "color8",
                  },
                  {
                    key: "Car Interior Clean",
                    color: this.state.color9,
                    image: require("../assets/inter.png"),
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
                      onPress={() => navigate(item.redirect,{type: item.type,cat_name:item.key })}
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
        <View style={{ backgroundColor: "#F8F8F8" }}>
          <Text
            style={{
             margin:10,
              fontSize: 16,
              color: "#3F51B5",
              fontFamily: "NexaLight",
            }}
          >
            OFFERS
          </Text>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <FlatList
              horizontal={true}
              data={this.state.offersArr}
              keyExtractor={(item, index) => {
                return String(index);
              }}
              renderItem={({ item }) => (
                <TouchableOpacity style={{margin:5}} onPress={() => navigate("Offers",{offer_id:item._id})}>
                  <Image
                      source={{ uri: item.image }}
                    style={{
                      width: 120,
                      height: 120,
                     
                      resizeMode: "contain",
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
        <View style={{ backgroundColor: "#F8F8F8" }}>
          <ScrollView style={styles.list} refreshControl={
         <RefreshControl
         refreshing={this.state.refreshing}
         onRefresh={()=>this.getProfile()}
       />}>
            <Text
              style={{
                top: 10,
                marginTop: "2%",
                left: "7%",
                
                fontSize: 16,
                color: "#3F51B5",
                fontFamily: "NexaLight",
              }}
            >
              Nearby Garages:
            </Text>
            <Text
              style={{
                right: 10,
                textAlign: "right",
                fontSize: 10,
                color: "#3F51B5",
                fontFamily: "NexaLight",
              }}
            >
              VIEW ALL
            </Text>
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={this.state.nearbyArray}
              horizontal={false}
              numColumns={2}
              keyExtractor={(item) => {
                return item.id;
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={(post) => {
          
                const index=post.index;
                const item = post.item;
                if(item.ratings.length > 0){
                  var arrayRating=item.ratings;
                }else{
                  var arrayRating=[{"avgRating":"0","totalReview":"0"}];
                }
               
                return (
                  <View
                    style={styles.card}
                  >
                    <ImageBackground
                      style={styles.cardImage}
                      source={{ uri: item.profile_image }}
                    >
                       {item.favorite_status==0 ?(
                           <TouchableOpacity   onPress={() => this.updateLike(index,'like')}>
                       <Image
                        style={{
                          height: 25,
                          width: 25,
                          alignSelf: "flex-end",
                          marginTop: 5,
                          marginRight: 5,
                        }}
                        source={require("../assets/love.png")}
                      />
                      </TouchableOpacity>
                      ) : null}
                       {item.favorite_status==1 ?(
                         <TouchableOpacity   onPress={() => this.updateLike(index,'unlike')}>
                      <Image
                        style={{
                          height: 25,
                          width: 25,
                          alignSelf: "flex-end",
                          marginTop: 5,
                          marginRight: 5,
                        }}
                        source={require("../assets/liked.png")}
                      />
                      </TouchableOpacity>
                      ) : null}
                    </ImageBackground>

                    <View style={styles.cardFooter}>
                      <TouchableOpacity   onPress={() => {navigate('Homedetail',{garage_id : item._id })}}>
                        <Text
                          style={{
                            color: "#3F51B5",
                            fontSize: 11,
                            fontFamily: "NexaBold",
                            padding: 1,
                          }}
                        >{item.garage_name}</Text>
                        <Text
                          style={{
                            color: "#3F51B5",
                            fontSize: 11,
                            fontFamily: "NexaLight",
                            padding: 1,
                          }}
                        >{item.location}</Text>
                        <View
                          style={{
                            alignItems: "center",
                            left: -5,
                            flexDirection: "row",
                            marginBottom: 10,
                          }}
                        >
                          <Stars
                            default={arrayRating[0].avgRating}
                            spacing={4}
                            starSize={10}
                            count={5}
                            fullStar={require("../assets/starFilled.png")}
                            emptyStar={require("../assets/emptyStar.png")}
                            halfStar={require("../assets/starFilled.png")}
                          />
                          <Text
                            style={{
                              color: "#3F51B5",
                              fontSize: 5,
                              fontFamily: "NexaLight",
                            }}
                          >{arrayRating[0].avgRating} Stars ({arrayRating[0].totalReview} ratings)</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </ScrollView>
        </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <BottomNavigation />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  closeIcon: {
    left: 15,
    top: 15,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  input: {
    color: "black",
    fontFamily: "NexaLight",
    borderColor: "#fff",
    borderWidth: 0.5,
    width: "85%",
    height: 40,
    borderRadius: 25,
    borderColor: "#fff",
    paddingLeft: 30,
    fontSize: 14,
    marginVertical: 6,
  },
  menu: {
    left: 305,
  },
  drawer: {
    top: 555,
  },
  container: {
    flex: 1, 
  },
  header: {
    height:230,
    backgroundColor: '#3F51B5',borderBottomLeftRadius:40,borderBottomRightRadius:40
},
middle: {
  
  margin:20,
 
 flex:2.4,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
},
  list: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 7,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    flexBasis: "80%",
    borderColor: "#00000029",
    marginHorizontal: 5,
    marginBottom: 30,
  },
  listContainer: {
    alignItems: "center",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 7,
    shadowColor: "#00000029",
    shadowOffset: {
      width: 2,
    },

    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginVertical: 7,
    backgroundColor: "white",
    borderRadius: 20,
    flexBasis: "40%",

    marginHorizontal: 9,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardFooter: {
    paddingTop: 12.5,

    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },

  cardImage: {
    height: 80,
    width: null,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },

  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  TabBarMainContainer: {
    justifyContent: "space-around",
    height: 50,
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
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
    zIndex:5
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
