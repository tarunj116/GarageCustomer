import React, { useState, useEffect, Component } from "react";
import { FlatList, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions, TextInput, SafeAreaView, StatusBar, ImageBackground } from 'react-native';

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
export default class Offers5 extends Component {
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
      garage_service_arr:[],
      arrayRating:[{"avgRating":"0","totalReview":"0"}],
      cartValue:1,
      originalAmount:20,
      cartAmount:20,
      sellerName:"",
      offer_details:[],
      isModalSpareParts:false
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
            isModalSpareParts:false,
          });
          this.getGarageDetails();
        } else {
          console.log(response);
        }
      })

      .catch(function(error) {
        console.log(error);
      });
     

  }

  getGarageDetails() {

    const url = `${BASE_URL}/customer/get_garage_detail`;
    const params = JSON.stringify({
      "garage_id": this.props.route.params.garage_id,
    });
    console.log(params);
    axios.post(url, params, {
      "headers": {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data.data);
        if (response.data.data[0].ratings.length > 0) {
          var arrayRating = response.data.data.ratings;
        } else {
          var arrayRating = [{ "avgRating": "0", "totalReview": "0" }];
        }
        this.setState({
          garage_image: response.data.data[0].profile_image,
          garage_name: response.data.data[0].garage_name,
          location: response.data.data[0].location,
          avgRating: arrayRating[0].avgRating,
          totalReview: arrayRating[0].totalReview,
        })
        this.getGarageService();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
     getGarageService(){
     // console.log(this.props.route.params.main_cat_id);
      const url=`${BASE_URL}/customer/get_spare_part_detail`;
      const params_garage = JSON.stringify({
        "spare_part_id":this.props.route.params.spare_part_id
        });
      console.log(params_garage);
     // return false;
      axios.post(url,params_garage,{
        "headers": {
          "content-type": "application/json",
        },
      })
      .then((response)=> {
        console.log(response.data.data);
        if(response.data.data.length > 0){
          this.setState({garage_service_arr : response.data.data[0]});
          this.setState({originalAmount : response.data.data[0].price});
          this.setState({cartAmount : response.data.data[0].price});
          this.setState({sellerName : this.state.garage_service_arr.user_detail[0].name});
          
          var ratings = response.data.data[0].ratings;
          this.getOfferDetail();
          if(ratings.length > 0){
            var ratingData=ratings;
            this.setState({
              arrayRating: ratingData,
            });
          }
        }
       
      
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
      cartValue = (type) => {
        var cartValue = this.state.cartValue;
        var cartAmount = this.state.originalAmount;
      if(type == "plus"){
        var newValue = cartValue + 1;
        var newcartAmount = cartAmount * newValue;
        this.setState({
          cartValue: newValue,
          cartAmount: newcartAmount,
        });
      }
      if(type == "minus" && cartValue > 1){
        var newValue = cartValue - 1;
        var newcartAmount = cartAmount * newValue;
        this.setState({
          cartValue: newValue,
          cartAmount: newcartAmount,
        });
      }
      }
      
      addToCart(){
        // console.log(this.props.route.params.main_cat_id);
        var userNewId = this.state.userNewId.replace('"','');
        userNewId = userNewId.replace('"','');
         const url=`${BASE_URL}/customer/add_cart_product`;
         const params_garage = JSON.stringify( {
           "garage_id":this.props.route.params.garage_id,
           "spare_part_id":this.props.route.params.spare_part_id,
           "customer_id":userNewId,
           "quantity":this.state.cartValue
          });
         console.log(params_garage);
        // return false;
         axios.post(url,params_garage,{
           "headers": {
             "content-type": "application/json",
           },
         })
         .then((response)=> {
          if (response.data.success == true) {
            this.props.navigation.navigate('MyCart');
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
            <ScrollView style={{backgroundColor:"#CFD7FF"}}>
              <View style={{backgroundColor:"white",borderTopRightRadius:50}}>
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
    <View  style={{alignItems:"center"}}>
                <TouchableOpacity><Image 
           source={{ uri: this.state.garage_service_arr.image }}
          style={{
            
              width:320,
              height:150,
              borderTopLeftRadius:15,
              borderTopRightRadius:15,
             
              margin:10
              
          }}
      /></TouchableOpacity>
     
     
                </View>
                
  <View style={{backgroundColor:"white",borderTopRightRadius:50}}>
  
  
  <Text style={{color:"#3F51B5",fontSize:31,fontFamily:"NexaLight"}}>{this.state.garage_service_arr.name}</Text>
  <TouchableOpacity style={{alignItems:'center',flexDirection:"row"}}>
  <Stars
  half={true}
  default={this.state.arrayRating[0].avgRating}
  
  spacing={4}
  starSize={20}
  count={5}
  fullStar={require("../../assets/starFilled.png")}
  emptyStar={require("../../assets/emptyStar.png")}
  halfStar={require("../../assets/starFilled.png")}/>
 <Text
                            style={{
                              color: "#3F51B5",
                              fontSize: 5,
                              fontFamily: "NexaLight",
                            }}
                          >{this.state.arrayRating[0].avgRating} Stars ({this.state.arrayRating[0].totalReview} ratings)</Text>
  </TouchableOpacity>
  
  
  </View>
  
  <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10,
      marginBottom:10,
      
    }}
  />
  <View style={{marginLeft:"5%"}}><Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Product info:</Text>
  <Text style={{color:"#CFD7FF",fontSize:9,fontFamily:"NexaLight"}}>{this.state.garage_service_arr.description}</Text>
  </View>
  <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10,
      marginBottom:10,
      
    }}
  />
   <Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Compatible Models:</Text>
  <View style={{top:4,padding:20,borderRadius:20,backgroundColor:"#CFD7FF"}}>
  
         <TextInput
          style={styles.fullname}
          placeholder={'Toyota Civic'}
          placeholderTextColor="#636363"
         
        />
    <TextInput
          style={styles.fullname}
          placeholder={'Honda City'}
          placeholderTextColor="#636363"
         
        />
        <TextInput
          style={styles.fullname}
          placeholder={'Tesla Model X'}
          placeholderTextColor="#636363"
         
        />
        <TextInput
          style={styles.fullname}
          placeholder={'Tesla 2021'}
          placeholderTextColor="#636363"
         
        />
  
    </View>
    <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:20,
      marginBottom:10,
      
    }}
  />
    <Text style={{alignSelf:"center",fontSize:18,color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>RATINGS AND REVIEWS:</Text>
  <View style={{marginLeft:"5%",flexDirection:"row",alignItems:"center"}}>
                <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:60,
              height:60,
              
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:16,
              
          }}
      /></TouchableOpacity>
      <View style={{margin:20}}>
      <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>{`User Name`}</Text>
      <TouchableOpacity style={{alignItems:'center',left:-5,flexDirection:"row"}}>
              <Stars
      half={true}
      default={2.5}
      
      spacing={4}
      starSize={12}
      count={5}
      fullStar={require('../../assets/starFilled.png')}
      emptyStar={require('../../assets/starFilled.png')}
      halfStar={require('../../assets/starFilled.png')}/>
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight"}}>5 Stars</Text>
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight",marginLeft:"30%"}}>March 1, 2021</Text>
      </TouchableOpacity>
      </View>
     
                </View>
                <View style={{marginLeft:"5%",flexDirection:"row",alignItems:"center"}}>
                <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:60,
              height:60,
              
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:16,
              
          }}
      /></TouchableOpacity>
      <View style={{margin:20}}>
      <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>{`User Name`}</Text>
      <TouchableOpacity style={{alignItems:'center',left:-5,flexDirection:"row"}}>
              <Stars
      half={true}
      default={2.5}
      
      spacing={4}
      starSize={12}
      count={5}
      fullStar={require('../../assets/starFilled.png')}
      emptyStar={require('../../assets/starFilled.png')}
      halfStar={require('../../assets/starFilled.png')}/>
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight"}}>5 Stars</Text>
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight",marginLeft:"30%"}}>March 1, 2021</Text>
      </TouchableOpacity>
      </View>
     
                </View>
                <View style={{marginLeft:"5%",flexDirection:"row",alignItems:"center"}}>
                <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:60,
              height:60,
              
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:16,
              
          }}
      /></TouchableOpacity>
      <View style={{margin:20}}>
      <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>{`User Name`}</Text>
      <TouchableOpacity style={{alignItems:'center',left:-5,flexDirection:"row"}}>
              <Stars
      half={true}
      default={2.5}
      
      spacing={4}
      starSize={12}
      count={5}
      fullStar={require('../../assets/starFilled.png')}
      emptyStar={require('../../assets/starFilled.png')}
      halfStar={require('../../assets/starFilled.png')}/>
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight"}}>5 Stars</Text>
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight",marginLeft:"30%"}}>March 1, 2021</Text>
      </TouchableOpacity>
      </View>
     
                </View>
                

      <Modal
          animationType="slide"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
            
            </View>
          </View>
        </Modal>
      </View>
              
              </View>
              </ScrollView>
              <View style={{backgroundColor:"#3F51B5",bottom:"10%", 
    height: 60, 
    flexDirection: 'row',
    width: '100%',
    position:"absolute",borderRadius:10,padding:10}}>
      <View style={{flexDirection:"row",marginTop:10}}>
                 <TouchableOpacity onPress={() => {
                  this.cartValue('minus');
                }}>
              <Image 
        source={require('../../assets/whiteminus.png')}
        style={{
         
            width:20,
            height:20,
            
            
        }}
    /></TouchableOpacity>
              <Text style={{color:"white",fontSize:18,fontFamily:"NexaBold",marginLeft:5,marginRight:5}}>{this.state.cartValue}</Text>
              <TouchableOpacity onPress={() => {
                  this.cartValue('plus');
                }}>
              <Image 
        source={require('../../assets/whiteplus.png')}
        style={{
         
            width:20,
            height:20,
        }}
    /></TouchableOpacity></View>
     <Text style={{color:"white",fontSize:18,fontFamily:"NexaBold",marginLeft:16,marginRight:5,marginTop:10}}>AED {this.state.cartAmount}</Text>
                <TouchableOpacity
        style={{backgroundColor: '#FFFFFF',alignItems: 'center',
        justifyContent: 'center',
        
        padding: 20,
        height:10,
        marginBottom:40,
        borderRadius: 15,
        flexDirection:"row",
        width:'45%',marginLeft:6}}
        onPress={() => this.addToCart()}>
          <Image 
          source={require('../../assets/carticon.png')}
          style={{
              width:20,
              height:20,
              
          }}
      />
        <Text style={{ color: '#636363',fontFamily:"NexaLight",fontSize: 15}}>Add to cart</Text>
      </TouchableOpacity>
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
    height: 10,
    borderRadius: 15,
    width: '50%',

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

    margin: 20,
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
    flex: 1,
    color: '#fff',
    fontFamily: 'NexaLight',
    borderColor: '#fff',
    borderWidth: 0.5,
    width: '85%',
    height: 40,
    borderRadius: 25,
    borderColor: '#fff',
    paddingLeft: 30,
    fontSize: 14,
    marginVertical: 1,
  },
  TabBarMainContainer: {
    justifyContent: 'space-around',
    height: 50,
    flexDirection: 'row',
    width: '100%',
    position: "absolute",
    bottom: 0
  },

  button: {

    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  buttonbell: {
    borderTopRightRadius: 15,
    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  buttonfile: {
    borderTopLeftRadius: 14,
    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  button1: {

    position: "relative",
    width: "1%",
    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    zIndex: 1
  },
  list: {

    shadowColor: '#00000029',
    shadowOffset: {
      width: 2
    },

    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 20,
    flexBasis: '80%',
    borderColor: "#00000029",
    marginHorizontal: 5,
  },
  listContainer: {
    alignItems: 'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 7,
    backgroundColor: "white",
    borderRadius: 20,
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
    flex: 1,
    height: 120,
    width: null,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});