import React, { useState, useEffect, Component } from "react";
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,Picker,StatusBar,Button} from 'react-native';
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
export default class Homedetail4 extends Component {
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
      service_desc:""
    };
  }

  async componentDidMount() {
    this.setState({ userId: await SecureStorage.getItem("user") }, () => {
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
    })
    .catch(function(error) {
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
  onTabClick = (id)=> {
  
    if(id === 'outdoor_tab'){
      this.setState({outdoorColor : "#576CE4"});
      this.setState({outdoorTextColor : "#CFD7FF"});
      this.setState({indoorColor : "#F1F1F1"});
      this.setState({indoorTextColor : "#FFFFFF"});
      //this.getCategoryData('get_service_category');
    }
    if(id === 'indoor_tab'){
      this.setState({indoorColor : "#576CE4"});
      this.setState({indoorTextColor : "#CFD7FF"});
      this.setState({outdoorColor : "#F1F1F1"});
      this.setState({outdoorTextColor : "#FFFFFF"});
      //this.getCategoryData('get_spare_part_category');
    }
    
     }
  render() {
    const { navigate } = this.props.navigation;
      console.log(this.props.route.params.service_id);
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
      <Image 
          source={require('../../assets/share.png')}
          style={{
           
            marginLeft:40,
              width:20,
              height:20,
              borderRadius:200,
              borderColor:"#CFD7FF",
              borderWidth:2,
             
              
          }}
      />
      <Image 
          source={require('../../assets/love.png')}
          style={{
           
            marginLeft:2,
              width:20,
              height:20,
              borderRadius:200,
              borderColor:"#CFD7FF",
              borderWidth:2,
             
              
          }}
      />
      </View>
      <Text style={{color:"#3F51B5",fontSize:13,fontFamily:"NexaLight"}}>{this.state.location}</Text>
      <View style={{flexDirection:"row",width:"30%"}}>
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
 
  <View>
  <View
  style={{
    height:60,
    backgroundColor:"#CFD7FF",
    borderBottomLeftRadius:30,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    marginTop:10
  }}
><Text style={{marginTop:20,color:"#3F51B5",alignSelf:"center",fontSize:21,fontFamily:"NexaLight"}}>SERVICE DETAILS</Text></View>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10,margin:10}}>Garage services:</Text>
<View  style={{flexDirection:"row",alignItems:"center"}}>
              <TouchableOpacity><Image 
        source={{ uri: this.state.service_image }}
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
    <Text style={{color:"#3F51B5",fontSize:12,fontFamily:"NexaLight"}}>AED {this.state.service_price}</Text>
    
    </View>
   
              </View>
              <View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
   
    marginBottom:10,
    
  }}
/>

<View><Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",margin:10}}>Service info:</Text>
<Text style={{color:"#CFD7FF",fontSize:14,fontFamily:"NexaLight",margin:10}}>{this.state.service_desc}</Text>
</View>
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
  </View>
 
  
           
  <TouchableOpacity
        style={{backgroundColor: '#576CE4',alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height:10,
        marginTop:10,
        borderRadius: 15,
        marginBottom:30,
        width:'70%',marginLeft:"12%"}}
        onPress={() => {
          navigate('Homedetail5',{garage_id : this.props.route.params.garage_id,service_id:this.props.route.params.service_id });
        }}>
        <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Request Service</Text>
      </TouchableOpacity>
          </ScrollView>
          
          <View style={styles.footer}>
          <BottomNavigation />
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
 
  flex: 1.4,  
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
   flexBasis: '42%',
   
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
   height: 80,
   width: null,
   borderTopLeftRadius: 10,
   borderTopRightRadius: 10,
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
spinnerTextStyle: {
  color: '#FFF'
},
});