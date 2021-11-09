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
export default class MyFavourites extends Component {
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
      indoorColor :"#F1F1F1",
      indoorTextColor :"#FFFFFF",
      outdoorColor :"#3F51B5",
      outdoorTextColor :"#CFD7FF",
      photoURL:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
        garage_image:"https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
        favGarageArr:[],
        favSpareArr:[],
        userNewId:""
     
    };
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
        //console.log(response);
        this.setState({ spinner: false });
        if (response.data.success == true) {
          this.setState({
           
            firstname: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            photoURL: response.data.data.profile_image,
          });
         this.getGarageFavoriteList();
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
  getGarageFavoriteList(){
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
    const url_new = `${BASE_URL}/customer/favorite_garage`;
    const params =  {"customer_id":userNewId}
    console.log(params);
   // return false;
    axios.post(url_new,params, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      console.log(response.data.data);
       this.setState({ favGarageArr: response.data.data });
       this.setState({ favSpareArr: [] });
    })
    .catch(function(error) {
      //console.log(error);
    });
  }
  getSpareFavoriteList(){
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
    const url_new = `${BASE_URL}/customer/favorite_spare_parts`;
    const params =  {"customer_id":userNewId}
    console.log(params);
   // return false;
    axios.post(url_new,params, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
     
      console.log(response.data.data);
      this.setState({ favGarageArr: [] });
      this.setState({ favSpareArr: response.data.data });
     
    })

    .catch(function(error) {
      this.setState({ spinner: false })
      //console.log(error);
    });
  }
  updateLike(indexVal=0,type=''){
   
    
    if(type=="garage"){
      const garageList=this.state.favGarageArr;
      this.addToFavourite(garageList[indexVal].garage_detail[0]._id,type);
    }else{
      const favList=this.state.favSpareArr;
      this.addToFavourite(favList[indexVal].spare_part_detail[0]._id,type);
    }
    
    //this.setState({ nearbyArray: garageList });
  }
  addToFavourite(garage_id_val="",type=""){
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
    const url_new = `${BASE_URL}/customer/favorite_unfavorite`;
    const params = {"customer_id": userNewId, fav_id:garage_id_val, "type": type}
   console.log(params);
    //return false;
    axios.post(url_new,params, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      console.log(response);
      this.setState({ spinner: false });
      if(type=="garage"){
        this.getGarageFavoriteList();
      }else{
        this.getSpareFavoriteList();
      }
      
   
     
    })

    .catch(function(error) {
      this.setState({ spinner: false })
      //console.log(error);
    });
  }
  onTabClick = (id)=> {
  
    if(id === 'outdoor_tab'){
      this.setState({outdoorColor : "#3F51B5"});
      this.setState({outdoorTextColor : "#CFD7FF"});
      this.setState({indoorColor : "#F1F1F1"});
      this.setState({indoorTextColor : "#FFFFFF"});
      this.getGarageFavoriteList();
    }
    if(id === 'indoor_tab'){
      this.setState({indoorColor : "#3F51B5"});
      this.setState({indoorTextColor : "#CFD7FF"});
      this.setState({outdoorColor : "#F1F1F1"});
      this.setState({outdoorTextColor : "#FFFFFF"});
      this.getSpareFavoriteList();
    }
    
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
            color: '#fff',
            backgroundColor:'white',
            borderColor:'#fff',
            width: '85%',
           alignSelf:"center",
            borderRadius: 10,
            fontSize:18,
            marginVertical: 6,
            flexDirection: 'row',
          }}>
          <View style={{height: 20, width: 20,top:10,left:10}}>
            <TouchableOpacity>
              <Image
              style={{height: '100%', width: '100%'}}
              source={require('../../assets/loupe.png')}
              />
            </TouchableOpacity>
          </View>
          <TextInput
          style={styles.input}
          placeholder="Search Here"
          placeholderTextColor="#D6D6D6"
          />
          <View style={{height: 30, width: 30,top:5,right:10}}>
            <TouchableOpacity onPress={() => navigate('Filter')}>
            <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../assets/filter.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
          </View>
          <View style={styles.middle}>
            <View style={{flex:0.2,backgroundColor:"white"}}>
            <View style={{flex:1,backgroundColor:"#CFD7FF",borderTopLeftRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50,alignItems:"center"}}><Text style={{marginTop:"8%",color:"#3F51B5",fontSize:19,fontFamily:"NexaLight"}}>
            FAVORITES PAGE</Text>
            
              </View>
              
            </View>
            <View style={{flex:1,backgroundColor:"#CFD7FF"}}>
              <View style={{flex:1,backgroundColor:"white",borderTopRightRadius:50,alignItems:"center"}}>
                
              
      <View>
    
  <View style={{flexDirection: 'row',marginTop:25}}>
  <TouchableOpacity
        style={[styles.container1, {backgroundColor: this.state.outdoorColor,marginTop:"2%"}]}
        onPress={() => this.onTabClick("outdoor_tab")}>
        <Text style={{ color: this.state.outdoorTextColor,fontFamily:"NexaLight",fontSize: 17}}>GARAGE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.container1, {backgroundColor: this.state.indoorColor,marginTop:"2%",left:2}]}
        onPress={() => this.onTabClick("indoor_tab")}>
        <Text style={{ color: this.state.indoorTextColor,fontFamily:"NexaLight",fontSize: 17}}>SPARE PARTS</Text>
      </TouchableOpacity>
  </View>
      </View>
              <ScrollView style={styles.list}>
       
              <FlatList
              contentContainerStyle={styles.listContainer}
              data={this.state.favGarageArr}
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
                console.log("Tardsfds",item);
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
                      source={{ uri: item.garage_detail[0].profile_image }}
                    >
                      
                      
                         <TouchableOpacity   onPress={() => this.updateLike(index,'garage')}>
                      <Image
                        style={{
                          height: 25,
                          width: 25,
                          alignSelf: "flex-end",
                          marginTop: 5,
                          marginRight: 5,
                        }}
                        source={require("../../assets/liked.png")}
                      />
                      </TouchableOpacity>
                    </ImageBackground>

                    <View style={styles.cardFooter}>
                      <TouchableOpacity   onPress={() => {navigate('Homedetail',{garage_id : item.garage_detail[0]._id })}}>
                        <Text
                          style={{
                            color: "#3F51B5",
                            fontSize: 11,
                            fontFamily: "NexaBold",
                            padding: 1,
                          }}
                        >{item.garage_detail[0].garage_name}</Text>
                        <Text
                          style={{
                            color: "#3F51B5",
                            fontSize: 11,
                            fontFamily: "NexaLight",
                            padding: 1,
                          }}
                        >{item.garage_detail[0].location}</Text>
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
                            fullStar={require("../../assets/starFilled.png")}
                            emptyStar={require("../../assets/emptyStar.png")}
                            halfStar={require("../../assets/starFilled.png")}
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
              <FlatList
              contentContainerStyle={styles.listContainer}
              data={this.state.favSpareArr}
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
                console.log("Tardsfds",item);
                var arrayRating=[{"avgRating":"0","totalReview":"0"}];
               
                return (
                  <View
                    style={styles.card}
                  >
                    <ImageBackground
                      style={styles.cardImage}
                      source={{ uri: item.spare_part_detail[0].image }}
                    >
                      
                      
                         <TouchableOpacity   onPress={() => this.updateLike(index,'spare_part')}>
                      <Image
                        style={{
                          height: 25,
                          width: 25,
                          alignSelf: "flex-end",
                          marginTop: 5,
                          marginRight: 5,
                        }}
                        source={require("../../assets/liked.png")}
                      />
                      </TouchableOpacity>
                    </ImageBackground>

                    <View style={styles.cardFooter}>
                      <TouchableOpacity   onPress={() => {navigate('Homedetail',{garage_id : item.spare_part_detail[0]._id })}}>
                        <Text
                          style={{
                            color: "#3F51B5",
                            fontSize: 11,
                            fontFamily: "NexaBold",
                            padding: 1,
                          }}
                        >{item.spare_part_detail[0].name}</Text>
                        <Text
                          style={{
                            color: "#3F51B5",
                            fontSize: 11,
                            fontFamily: "NexaLight",
                            padding: 1,
                          }}
                        >{item.spare_part_detail[0].price}</Text>
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
                            fullStar={require("../../assets/starFilled.png")}
                            emptyStar={require("../../assets/emptyStar.png")}
                            halfStar={require("../../assets/starFilled.png")}
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
    width:'48%',
    marginLeft:3,
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
    height:120,
    backgroundColor: '#3F51B5',borderBottomLeftRadius:40,borderBottomRightRadius:40
},
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30
},
middle: {
  
  margin:20,
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
