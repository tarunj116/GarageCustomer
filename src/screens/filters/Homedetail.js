import React, { useState, useEffect, Component } from "react";
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,Picker,StatusBar,Button,ImageBackground} from 'react-native';
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
export default class Homedetail extends Component {
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
      service_category_arr:[],
      spare_part_arr:[],
      tires_arr:[],
      favorite_status:0,
      isModalSpareParts:false
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
  getGarageDetails(){
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
    this.setState({ spinner: true });
    const url=`${BASE_URL}/customer/get_garage_detail`;
    const params = JSON.stringify({
      "garage_id":this.props.route.params.garage_id,
      "customer_id":userNewId
    });
    console.log(params);
    axios.post(url,params,{
      "headers": {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      this.setState({ spinner: false });
      if(response.data.success == true){
      this.getCategoryData('service_category_arr');
      this.getCategoryData('spare_part_arr');
      this.getCategoryData('tires_arr');
      console.log(response.data.data);
      if(response.data.data[0].ratings.length > 0){
        var arrayRating=response.data.data.ratings;
      }else{
        var arrayRating=[{"avgRating":"0","totalReview":"0"}];
      }
     
       this.setState({
        garage_image: response.data.data[0].profile_image,
        favorite_status: response.data.data[0].favorite_status,
        garage_name: response.data.data[0].garage_name,
        location: response.data.data[0].location,
        avgRating:arrayRating[0].avgRating,
        totalReview:arrayRating[0].totalReview,
        })
      }
    })
    .catch(function(error) {
      this.setState({ spinner: false });
      console.log(error);
      });
  }
  getCategoryData(type = ""){
   
    var type_value ="";
    if(type == 'service_category_arr'){
      type_value = "Service"
    }
    if(type == 'spare_part_arr'){
      type_value = "Spare Part"
    }
    if(type == 'tires_arr'){
      type_value = "Tire"
    }
    //return false;
    // var userNewId = this.state.userNewId.replace('"','');
    // userNewId = userNewId.replace('"','');
    
    
    const url=`${BASE_URL}/customer/get_garage_categories`;
    const params = JSON.stringify({
      "user_id":this.props.route.params.garage_id,
      "type": type_value
    });
    console.log(params);
    axios.post(url,params,{
      "headers": {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      console.log(type);
      this.setState({[type] : response.data.data});
    
    })
    .catch(function(error) {
      console.log(error);
      });
    }
    onChange = (name, value) => {
      this.setState({ [name]: value });
     
    }
   
    addToCart = (garage_id,spare_part_id) => {
      const { navigate } = this.props.navigation;
      this.setState({isModalSpareParts : false});
      navigate('AddToCart',{garage_id:garage_id,spare_part_id : spare_part_id });
    }
    getSparePartDetail = (spare_part_detail_id) =>{
      var userNewId = this.state.userNewId.replace('"','');
      userNewId = userNewId.replace('"','');
      console.log(spare_part_detail_id);
      this.setState({isModalSpareParts : true});
      const url_spare=`${BASE_URL}/customer/get_spare_parts`;
      const params_spare = JSON.stringify({
        "user_id":this.props.route.params.garage_id,
        "cat_id":spare_part_detail_id,
        "customer_id":userNewId
      });
      console.log(params_spare);
      axios.post(url_spare,params_spare,{
        "headers": {
          "content-type": "application/json",
        },
      })
      .then((response)=> {
        console.log(response);
        this.setState({nearbyArray : response.data.data});
      
      })
      .catch(function(error) {
        console.log(error);
        });
      }
      updateLike(statusVal=''){
      
        if(statusVal=='like'){
          this.setState({ favorite_status: 1 });
        }
        if(statusVal=='unlike'){
          this.setState({ favorite_status: 0 });
        }
        this.addToFavourite();
        
      }
      addToFavourite(){
        var userNewId = this.state.userNewId.replace('"','');
        userNewId = userNewId.replace('"','');
        const url_new = `${BASE_URL}/customer/favorite_unfavorite`;
        const params = {"customer_id": userNewId, fav_id:this.props.route.params.garage_id, "type": "garage"}
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
      updateLikeGarage(indexVal=0,statusVal=''){
        console.log(indexVal);
        const garageList=this.state.nearbyArray;
        if(statusVal=='like'){
          garageList[indexVal].favorite_status = 1;
        }
        if(statusVal=='unlike'){
          garageList[indexVal].favorite_status = 0;
        }
        this.addToFavouriteGarage(garageList[indexVal]._id);
        this.setState({ nearbyArray: garageList });
      }
      addToFavouriteGarage(garage_id_val=""){
        var userNewId = this.state.userNewId.replace('"','');
        userNewId = userNewId.replace('"','');
        const url_new = `${BASE_URL}/customer/favorite_unfavorite`;
        const params = {"customer_id": userNewId, fav_id:garage_id_val, "type": "spare_part"}
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
  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state.service_category_arr);
    console.log(this.state.spare_part_arr);
    console.log(this.state.tires_arr);
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
      <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
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
          <ScrollView style={styles.middle}>
           
          <Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:"100%",
              height:130,
              
              borderColor:"#CFD7FF",
              borderWidth:2,
             
              
          }}
      />
      <View style={{flexDirection:"row"}}>
      <Image 
          source={{ uri: this.state.garage_image }}
          style={{
            marginTop:-50,
            marginLeft:10,
              width:100,
              height:100,
              borderRadius:200,
              borderColor:"#CFD7FF",
              borderWidth:2,
             
              
          }}
      />
      <View style={{margin:5}}>
      <View style={{flexDirection:"row"}}>
      <Text style={{color:"#3F51B5",fontSize:22,fontFamily:"NexaLight"}}>{this.state.garage_name}</Text>
     
      {this.state.favorite_status==0 ?(
                           <TouchableOpacity   onPress={() => this.updateLike('like')}>
                       <Image
                        style={{
                          marginLeft:30,
                          height: 25,
                          width: 25,
                          alignSelf: "flex-end",
                        }}
                        source={require("../../assets/love.png")}
                      />
                      </TouchableOpacity>
                      ) : null}
                       {this.state.favorite_status==1 ?(
                         <TouchableOpacity   onPress={() => this.updateLike('unlike')}>
                      <Image
                        style={{
                          marginLeft:30,
                          height: 25,
                          width: 25,
                          alignSelf: "flex-end",
                        }}
                        source={require("../../assets/liked.png")}
                      />
                      </TouchableOpacity>
                      ) : null}
      </View>
      <Text style={{color:"#3F51B5",fontSize:13,fontFamily:"NexaLight"}}>{this.state.location}</Text>
      <View style={{flexDirection:"row",width:"30%"}}>
      <TouchableOpacity style={{alignItems:'center',left:-10,flexDirection:"row"}}>
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
      <TouchableOpacity>
      <Text style={{marginLeft:10,color:"#3F51B5",fontSize:10,fontFamily:"NexaBold",textDecorationLine: 'underline'}}>VIEW RATING</Text></TouchableOpacity>
      </View>
      </View>
    
      </View>
      <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10
    }}
  />
  <View style={{flexDirection:"row"}}>
  <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Garage Timings:</Text>
  <Text style={{marginLeft:30,color:"#3F51B5",fontSize:11,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>{this.state.timing}</Text>
  
  </View>
  <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10
    }}
  />
  <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Garage service categories:</Text>
  
  <TouchableOpacity
        onPress={() => {
          navigate('Homedetail2');
        }}>
  {/* <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaBold",textDecorationLine: 'underline',alignSelf:"flex-end",marginRight:10,marginTop:10}}>VIEW ALL</Text> */}
  </TouchableOpacity>
  <ScrollView style={styles.list}>
        <FlatList 
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            data={this.state.service_category_arr}
            horizontal={false}
            numColumns={3}
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
                <TouchableOpacity style={styles.card} onPress={() => {
                  navigate('Homedetail3',{garage_id : this.props.route.params.garage_id,main_cat_id : item.main_cat_id,cat_id : item._id});
                }}>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                    
                          
                          <Text style={{color:"#636363",fontSize:13,fontFamily:"NexaBold",alignSelf:"center"}}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                
              )
            }}/></ScrollView>
            <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10
    }}
  />
    <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Garage spare parts:</Text>
  
  <TouchableOpacity
        onPress={() => {
          navigate('Homedetail2');
        }}>
  {/* <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaBold",textDecorationLine: 'underline',alignSelf:"flex-end",marginRight:10,marginTop:10}}>VIEW ALL</Text> */}
  </TouchableOpacity>
  <ScrollView style={styles.list}>
        <FlatList 
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            data={this.state.spare_part_arr}
            horizontal={false}
            numColumns={3}
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
                <TouchableOpacity style={styles.card} onPress={() => {
                  this.getSparePartDetail(item._id);
                }}>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                    
                          
                          <Text style={{color:"#636363",fontSize:13,fontFamily:"NexaBold",alignSelf:"center"}}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                
              )
            }}/></ScrollView>
            <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10
    }}
  />
   <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Garage Tires:</Text>
  {/* <View style={{flexDirection: 'row'}}>
  <TouchableOpacity
        style={[styles.container1, {backgroundColor: this.state.outdoorColor,marginTop:"2%"}]}
        onPress={() => this.onTabClick("outdoor_tab")}>
        <Text style={{ color: this.state.outdoorTextColor,fontFamily:"NexaLight",fontSize: 17}}>OUTDOOR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.container1, {backgroundColor: this.state.indoorColor,marginTop:"2%",left:2}]}
        onPress={() => this.onTabClick("indoor_tab")}>
        <Text style={{ color: this.state.indoorTextColor,fontFamily:"NexaLight",fontSize: 17}}>INDOOR</Text>
      </TouchableOpacity>
  </View> */}
  <TouchableOpacity
        onPress={() => {
          navigate('Homedetail2');
        }}>
  {/* <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaBold",textDecorationLine: 'underline',alignSelf:"flex-end",marginRight:10,marginTop:10}}>VIEW ALL</Text> */}
  </TouchableOpacity>
  <ScrollView style={styles.list}>
        <FlatList 
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            data={this.state.tires_arr}
            horizontal={false}
            numColumns={3}
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
                <TouchableOpacity style={styles.card}  onPress={() => {
                  navigate('Homedetail3',{garage_id : this.props.route.params.garage_id,main_cat_id : item.main_cat_id,cat_id : item._id});
                }}>
                  <View style={styles.cardFooter}>
                    <View style={styles.socialBarContainer}>
                    
                          
                          <Text style={{color:"#636363",fontSize:13,fontFamily:"NexaBold",alignSelf:"center"}}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                
              )
            }}/></ScrollView>
            <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10
    }}
  />
  <View>
    
  </View>
  <Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginTop:10}}>Supported vehicle models:</Text>
  {/* <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaBold",textDecorationLine: 'underline',alignSelf:"flex-end",marginRight:10}}>VIEW ALL</Text> */}
  <View style={{top:4,padding:10}}>
  
  <TouchableOpacity style={{ shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
   backgroundColor:"white",
   borderRadius:15,
   flexBasis: '18%',
   marginHorizontal: 9,}}>
               
  <Text style={{color:"#636363",fontSize:13,fontFamily:"NexaBold",margin:15}}>Honda</Text>
                 
                </TouchableOpacity>
                <TouchableOpacity style={{ shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
   backgroundColor:"white",
   borderRadius:15,
   flexBasis: '18%',
   marginHorizontal: 9,}}>
               
  <Text style={{color:"#636363",fontSize:13,fontFamily:"NexaBold",margin:15}}>Toyota</Text>
                 
                </TouchableOpacity>
                <TouchableOpacity style={{ shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
   backgroundColor:"white",
   borderRadius:15,
   flexBasis: '18%',
   marginHorizontal: 9,}}>
               
  <Text style={{color:"#636363",fontSize:13,fontFamily:"NexaBold",margin:15}}>Ferrari</Text>
                 
                </TouchableOpacity>
                <TouchableOpacity style={{ shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
   backgroundColor:"white",
   borderRadius:15,
   flexBasis: '18%',
   marginHorizontal: 9,}}>
               
  <Text style={{color:"#636363",fontSize:13,fontFamily:"NexaBold",margin:15}}>Tesla</Text>
                 
                </TouchableOpacity>
  
    </View>
  
             <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10
    }}
  />
  <TouchableOpacity
        style={{backgroundColor: '#576CE4',alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height:10,
        marginTop:10,
        borderRadius: 15,
        marginBottom:30,
        width:'70%',marginLeft:"12%"}}
        onPress={() => {navigate('RequestQuotations',{garage_id : this.props.route.params.garage_id })}}
        >
        <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Request a Quotation</Text>
      </TouchableOpacity>
          </ScrollView>
          
          <View style={styles.footer}>
          <BottomNavigation />
          <View style={{flex: 1}}>
  
  
      <Modal isVisible={this.state.isModalSpareParts} style={{backgroundColor:"white",borderRadius:24}}>
      <View
  style={{
    height:60,
    backgroundColor:"#CFD7FF",
    borderBottomLeftRadius:30,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  }}
><Text style={{marginTop:20,color:"#3F51B5",alignSelf:"center",fontSize:16,fontFamily:"NexaLight"}}>SPARE PARTS DETAILS</Text></View>
        <ScrollView style={{flex: 1}}>
        <FlatList
              contentContainerStyle={styles.listContainer}
              data={this.state.nearbyArray}
              horizontal={false}
              numColumns={2}
              keyExtractor={(item) => {
                return item.id;
              }}
              ItemSeparatorComponent={() => {
                return <View />;
              }}
              renderItem={(post) => {
                const index=post.index;
                const item = post.item;
                var arrayRating=[{"avgRating":"0","totalReview":"0"}];
               
                return (
                  <View
                 
                    style={styles.card_new}
                  >
                    <ImageBackground
                      style={styles.cardImage}
                      source={{ uri: item.image }}
                    >
                        {item.favorite_status==0 ?(
                           <TouchableOpacity   onPress={() => this.updateLikeGarage(index,'like')}>
                       <Image
                        style={{
                          height: 25,
                          width: 25,
                          alignSelf: "flex-end",
                          marginTop: 5,
                          marginRight: 5,
                        }}
                        source={require("../../assets/love.png")}
                      />
                      </TouchableOpacity>
                      ) : null}
                       {item.favorite_status==1 ?(
                         <TouchableOpacity   onPress={() => this.updateLikeGarage(index,'unlike')}>
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
                      ) : null}
                       <TouchableOpacity
                  onPress={() => this.addToCart(this.props.route.params.garage_id,item._id)}
                  >
                      <Image
                        style={{
                          height: 25,
                          width: 25,
                          alignSelf: "flex-end",
                          marginTop: 5,
                          marginRight: 5,
                        }}
                        source={require("../../assets/cart2.png")}
                      />
                      </TouchableOpacity>
                    </ImageBackground>

                    <View style={styles.cardFooter}>
                      <View style={styles.socialBarContainer}>
                        <Text
                          style={{
                            color: "#3F51B5",
                            fontSize: 11,
                            fontFamily: "NexaBold",
                            padding: 1,
                          }}
                        >{item.name}</Text>
                        <Text
                          style={{
                            color: "#3F51B5",
                            fontSize: 11,
                            fontFamily: "NexaLight",
                            padding: 1,
                          }}
                        >{item.price} AED {item.description}</Text>
                        <TouchableOpacity
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
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
        </ScrollView>
        <TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      borderRadius: 25,
      marginBottom:15,
      width:'40%',alignSelf:"center"}}
      onPress={() => this.setState({isModalSpareParts: false})}>
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>Close</Text>
    </TouchableOpacity>
      </Modal>
    </View>
  <View style={{flex: 1}}>
  
  
      <Modal isVisible={this.state.isModalVisible} style={{backgroundColor:"white",borderRadius:24}}>
        <ScrollView style={{flex: 1}}>
          <View style={{backgroundColor:"white",borderRadius:24}}>
            <View style={{backgroundColor:"#CFD7FF",borderTopLeftRadius:30,borderTopRightRadius:30,borderBottomLeftRadius:30}}>
            <View style={{flexDirection:"row",marginBottom:30}}>
            <Image 
          source={require('../../assets/offers1.png')}
          style={{
            
              width:60,
              height:60,
              marginLeft:20,
              marginTop:-10,
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:80,
              
          }}
      />
      <Text style={{alignSelf:"center",marginLeft:10,fontSize:18,color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Ratings and Reviews</Text>
      
            </View>
            <TouchableOpacity style={{top:-40,marginLeft:90,alignItems:'center',left:-5,flexDirection:"row"}}>
              <Stars
      half={true}
      default={2.5}
      
      spacing={4}
      starSize={12}
      count={5}
      fullStar={require('../../assets/starFilled.png')}
      emptyStar={require('../../assets/starFilled.png')}
      halfStar={require('../../assets/starFilled.png')}/>
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight"}}>4 Stars ( 1.2k ratings )</Text>
      </TouchableOpacity>
      </View>
        <View style={{marginTop:20,backgroundColor:"white",borderTopRightRadius:30}}>
  <View style={{width:"90%",marginBottom:20,marginLeft:"5%",flexDirection:"row",alignItems:"center",backgroundColor:"white",borderRadius:20,shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
     marginVertical: 7}}>
                <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:60,
              height:60,
              marginTop:-80,
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:16,
              
          }}
      /></TouchableOpacity>
      <View style={{margin:10}}>
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
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight",marginLeft:"20%"}}>March 1, 2021</Text>
      </TouchableOpacity>
      <Text style={{width:200,color:"#CFD7FF",fontSize:8,fontFamily:"NexaLight",justifyContent:"center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>
     
                </View>
                <View style={{width:"90%",marginBottom:20,marginLeft:"5%",flexDirection:"row",alignItems:"center",backgroundColor:"white",borderRadius:20,shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
     marginVertical: 7}}>
                <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:60,
              height:60,
              marginTop:-80,
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:16,
              
          }}
      /></TouchableOpacity>
      <View style={{margin:10}}>
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
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight",marginLeft:"20%"}}>March 1, 2021</Text>
      </TouchableOpacity>
      <Text style={{width:200,color:"#CFD7FF",fontSize:8,fontFamily:"NexaLight",justifyContent:"center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>
     
                </View>
                <View style={{width:"90%",marginBottom:20,marginBottom:20,marginLeft:"5%",flexDirection:"row",alignItems:"center",backgroundColor:"white",borderRadius:20,shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
     marginVertical: 7}}>
                <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:60,
              height:60,
              marginTop:-80,
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:16,
              
          }}
      /></TouchableOpacity>
      <View style={{margin:10}}>
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
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight",marginLeft:"20%"}}>March 1, 2021</Text>
      </TouchableOpacity>
      <Text style={{width:200,color:"#CFD7FF",fontSize:8,fontFamily:"NexaLight",justifyContent:"center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>
     
                </View>
                <View style={{width:"90%",marginLeft:"5%",flexDirection:"row",alignItems:"center",backgroundColor:"white",borderRadius:20,shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
     marginVertical: 7}}>
                <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:60,
              height:60,
              marginTop:-80,
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:16,
              
          }}
      /></TouchableOpacity>
      <View style={{margin:10}}>
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
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight",marginLeft:"20%"}}>March 1, 2021</Text>
      </TouchableOpacity>
      <Text style={{width:200,color:"#CFD7FF",fontSize:8,fontFamily:"NexaLight",justifyContent:"center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
      </View>
     
                </View>
                <TouchableOpacity
        style={{backgroundColor: '#576CE4',alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height:10,
        marginTop:10,
        borderRadius: 15,
        marginBottom:10,
        width:'70%',marginLeft:"15%"}}
       >
        <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>ADD REVIEW</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{backgroundColor: '#576CE4',alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height:10,
        marginTop:10,
        borderRadius: 15,
        marginBottom:10,
        width:'70%',marginLeft:"15%"}}
        >
        <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>Close</Text>
      </TouchableOpacity>
      </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
    <View style={{flex: 1}}>
  
  
      <Modal isVisible={this.state.isModalFirstVisible} style={{backgroundColor:"white",borderRadius:24}}>
        <ScrollView style={{flex: 1}}>
          <View style={{backgroundColor:"white",borderRadius:24}}>
            <View style={{backgroundColor:"#CFD7FF",borderTopLeftRadius:30,borderTopRightRadius:30,borderBottomLeftRadius:30}}>
            <View style={{flexDirection:"row",marginBottom:30}}>
            <Image 
          source={require('../../assets/offers1.png')}
          style={{
            
              width:60,
              height:60,
              marginLeft:20,
              marginTop:-10,
              borderColor:"#CFD7FF",
              borderWidth:2,
              borderRadius:80,
              
          }}
      />
      <Text style={{alignSelf:"center",marginLeft:10,fontSize:18,color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Ratings and Reviews</Text>
      
            </View>
            <TouchableOpacity style={{top:-40,marginLeft:90,alignItems:'center',left:-5,flexDirection:"row"}}>
              <Stars
      half={true}
      default={2.5}
      
      spacing={4}
      starSize={12}
      count={5}
      fullStar={require('../../assets/starFilled.png')}
      emptyStar={require('../../assets/starFilled.png')}
      halfStar={require('../../assets/starFilled.png')}/>
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight"}}>4 Stars ( 1.2k ratings )</Text>
      </TouchableOpacity>
      </View>
      <View style={{top:2,padding:20,borderRadius:10,backgroundColor:"white"}}>
      <Text style={{color:"#3F51B5",fontFamily:"NexaLight"}}>Rate your experience:</Text>
      <TouchableOpacity style={{alignItems:'center',left:10,flexDirection:"row"}}>
              <Stars
      half={true}
      default={2.5}
      
      spacing={4}
      starSize={50}
      count={5}
      fullStar={require('../../assets/starFilled.png')}
      emptyStar={require('../../assets/starFilled.png')}
      halfStar={require('../../assets/starFilled.png')}/>
     
      </TouchableOpacity>
      <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10
    }}
  />
  <Text style={{marginTop:10,color:"#3F51B5",fontFamily:"NexaLight"}}>Review:</Text>
  <View style={{backgroundColor:"white",top:10,padding:20,borderRadius:20}}>
         <Text style={{justifyContent:"center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        
        </View>
  
        <View
    style={{
      borderBottomColor: '#3F51B5',
      borderBottomWidth: 1.5,
      marginTop:10
    }}
  />    
    </View>
    
      <View style={{marginTop:10,backgroundColor:"white",borderTopRightRadius:30,flexDirection:"row"}}>
        
      <Text style={{marginLeft:10,color:"#3F51B5",fontFamily:"NexaLight"}}>Photos and Videos:</Text>
  <TouchableOpacity style={{left:140}}> 
              <Image style={{width:20,height:20}} source={require('../../assets/plus.png')}/>
              </TouchableOpacity></View>
  <View style={{flexDirection: 'row',margin:10}}>
    
  <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:80,
              height:60,
              borderRadius:15,
              borderColor:"#CFD7FF",
              borderWidth:2,
              
              
          }}
      /></TouchableOpacity>
      <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:80,
              height:60,
              borderRadius:15,
              borderColor:"#CFD7FF",
              borderWidth:2,
              
              
          }}
      /></TouchableOpacity>
      <TouchableOpacity><Image 
          source={require('../../assets/offers1.png')}
          style={{
              width:80,
              height:60,
              borderRadius:15,
              borderColor:"#CFD7FF",
              borderWidth:2,
              
              
          }}
      /></TouchableOpacity>
        
      </View>
      <TouchableOpacity
        style={{backgroundColor: '#576CE4',alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height:10,
        marginTop:10,
        borderRadius: 15,
        marginBottom:10,
        width:'70%',marginLeft:"15%"}}
        >
        <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>SUBMIT REVIEW</Text>
      </TouchableOpacity>
        </View>
         
        </ScrollView>
      </Modal>
    </View>
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
    width:'45%',
    marginLeft:10
  },
  text1: {
    color: '#FFFFFF',
    
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1, 
    backgroundColor:"#F8F8F8",
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
 
  flex: 2.4,  
  marginLeft:24,
  marginRight:24,
  backgroundColor:"#FFFFFF"
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

 

 /******** card **************/
 card:{
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
   backgroundColor:"white",
   borderRadius:10,
   flexBasis: '28%',
   
   marginHorizontal: 9,
 },

 cardFooter:{
   
   paddingTop: 12.5,
  
   paddingHorizontal: 16,
   borderBottomLeftRadius: 1,
   borderBottomRightRadius: 1,
 },

 from: {
  fontFamily:'NexaBold',
  
  backgroundColor:"white",
  color: 'black',
  marginLeft:10,
  marginRight:10,
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "35%",
  height:40,
  borderRadius: 10,
  borderColor:'#fff',
  paddingLeft: 60,
  fontSize:14,
  
},
to: {
  fontFamily:'NexaBold',
  left:10,
  backgroundColor:"white",
  color: 'black',
  
  borderColor:'#fff',
 
  width: "35%",
  height:40,
  borderRadius: 10,
  borderColor:'#fff',
  paddingLeft: 60,
  fontSize:14,

},
fullname: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
  fontFamily:'NexaBold',
  
  backgroundColor:"white",
  color: '#fff',
  
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "100%",
  height:40,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 28,
  fontSize:14,
  marginVertical: 6,
},


/******** card **************/
card_new: {
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
spinnerTextStyle: {
  color: '#FFF'
},
});