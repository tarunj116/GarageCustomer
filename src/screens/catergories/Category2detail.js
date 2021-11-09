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
export default class Category2detail extends Component {
    
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

getProfile() {
  console.log(this.state.userId);
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
      text1: 'Please select car brand !'
    });
   }else{
    Toast.show({
      type: 'success',
      text1: 'Car Brand Updated Successfully'
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
    render () {
    
      const { navigate } = this.props.navigation;
     
        return (
          <View style={styles.container}>
          <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
          <View style={styles.header}>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => { navigate('home')    ;}}> 
                  <Image style={{top:11,marginLeft:10}} source={require('../../assets/icons/aerosmall.png')}/>
                  </TouchableOpacity>
              <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                <Image
                source={require('../../assets/menu.png')}
                style={{top:11,marginLeft:"20%"}}
                />
                  </TouchableOpacity> 
                <View style={{flexDirection:'column',marginLeft:"35%"}}>
                  <Text style={{color:"white",top:10,fontSize:18,textAlign: 'right',fontFamily:"NexaBold"}}>Hello !</Text>
                  <Text style={{color:"white",top:10,fontSize:25,textAlign: 'right',fontFamily:"NexaLight"}}>Malvin</Text>
      
                </View>
                <Image 
                source={require('../../assets/profile.png')}
      
                style={{top:-6,
                left:-10,height:80,width:80,borderRadius: 60,borderColor:"white"}}
                />
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
          <View style={{top:"5%",width:"100%",flexDirection:"column"}}>
          
          <Text style={{left:"7%",fontSize:16,color:"white",fontFamily:"NexaLight"}}>
                    CATEGORIES
                    </Text>
                  
                    <View style={{marginLeft:"5%",width:"100%"}}>
                <FlatList 
                 horizontal={true}
                 showsHorizontalScrollIndicator={false}
                      data={[
                        {key: 'Car Maintenance',color:'white',image:require('../../assets/car_picture3x.png'),redirect:"Category"},
                  {key: 'Indoor Service',color:'#7A8BE5',image:require('../../assets/indoor1.png'),redirect:"Category2"},
                  {key: 'Spare Parts',color:'white',image:require('../../assets/sparepart.png'),redirect:"Category3"},
                  {key: 'Tires Service',color:'white',image:require('../../assets/tire.png'),redirect:"Category4"},
                  {key: 'Motors',color:'white',image:require('../../assets/motors.png'),redirect:"Category5"},
                  {key: 'Trucks',color:'white',image:require('../../assets/truck.png'),redirect:"Category6"},
                  {key: 'Vehicle Wash',color:'white',image:require('../../assets/wash.png'),redirect:"Category7"},
                  {key: 'Car Accessories',color:'white',image:require('../../assets/assess.png'),redirect:"Category8"},
                  {key: 'Car Interior Clean',color:'white',image:require('../../assets/inter.png'),redirect:"Category9"},
                      ]}
                      // style={{ flex: 1, margin:"5%"}}
                     
                      keyExtractor={(item, index) => { return String(index) }}            
                      renderItem={({ item, index }) => { return (
                        <TouchableOpacity onPress={() => navigate(item.redirect)} style={{width:100, backgroundColor:item.color, borderColor:"#F6F6F6",borderRadius:8,height:75,margin:5,alignItems:"center",justifyContent:"center",padding:10}}>
                            <Image
                            style={{height:"100%",width:"100%",resizeMode:"center"}}
                           source={item.image}
                         />
                         <Text style={{color:"white",fontSize:8,fontFamily:"NexaLight"}}>{item.key}</Text>
                      </TouchableOpacity>
                      ); }}
                    />
                </View>
       
                 
                
                 
                    
             </View>
      
              </View>
              
              <View style={styles.middle}>
                <View style={{flex:0.2,backgroundColor:"white"}}>
                <View style={{flex:1,alignContent:"center",backgroundColor:"#CFD7FF",borderTopLeftRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50,alignItems:"center"}}>
              
                  <Text style={{marginLeft:50,marginTop:20,color:"#3F51B5",fontSize:21,fontFamily:"NexaLight"}}>INDOOR SERVICE</Text>
                </View>
                </View>
                <View style={{flex:1,backgroundColor:"#CFD7FF"}}>
                  <View style={{flex:1,backgroundColor:"white",borderTopRightRadius:50}}>
                
                  <View style={{flexDirection:"row"}}>
          <Image 
              source={require('../../assets/offers1.png')}
              style={{
                marginTop:-30,
                marginLeft:10,
                  width:80,
                  height:80,
                  borderRadius:200,
                  borderColor:"#CFD7FF",
                  borderWidth:2,
                 
                  
              }}
          />
          <View style={{margin:5}}>
          <View style={{flexDirection:"row"}}>
          <Text style={{color:"#3F51B5",fontSize:22,fontFamily:"NexaLight"}}>{`Atoy Works`}</Text>
          <Image 
              source={require('../../assets/share.png')}
              style={{
               
                marginLeft:90,
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
          <Text style={{color:"#3F51B5",fontSize:13,fontFamily:"NexaLight"}}>{`Building A, Deira, Dubai`}</Text>
          
          <TouchableOpacity style={{alignItems:'center',left:-5,flexDirection:"row"}}>
                  <Stars
          half={true}
          default={2.5}
          
          spacing={4}
          starSize={10}
          count={5}
          fullStar={require('../../assets/starFilled.png')}
          emptyStar={require('../../assets/starFilled.png')}
          halfStar={require('../../assets/starFilled.png')}/>
          <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight"}}>{`4 Stars (1.2k ratings)`}</Text>
          </TouchableOpacity>
          </View>
          <Text style={{marginLeft:-50,marginTop:56,color:"#3F51B5",fontSize:8,fontFamily:"NexaBold",textDecorationLine: 'underline'}}>VIEW RATING</Text>
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
      <Text style={{marginLeft:30,color:"#3F51B5",fontSize:11,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Open from Mondays - Sundays</Text>
      
      </View>
      <View
        style={{
          borderBottomColor: '#3F51B5',
          borderBottomWidth: 1.5,
          marginTop:10
        }}
      />
      <ScrollView>
      <View style={{flexDirection:"row"}}>
      
      <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,flexDirection:"row",backgroundColor:"#3F51B5",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#FFFFFF",fontSize:17,fontFamily:"NexaBold"}}>Car Service</Text>
                  
                </TouchableOpacity>
      
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
                  
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
              <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
              
            </TouchableOpacity>
                  
      </View>
      <View style={{flexDirection:"row"}}>
      
      <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>Car Service</Text>
                  
                </TouchableOpacity>
      
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
                  
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
              <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
              
            </TouchableOpacity>
                  
      </View>
      <View style={{flexDirection:"row"}}>
      <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>Car Service</Text>
                  
                </TouchableOpacity>
      
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
                  
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
              <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
              
            </TouchableOpacity>
                  
      </View>
      <View style={{flexDirection:"row"}}>
      
      <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>Car Service</Text>
                  
                </TouchableOpacity>
      
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
                  
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
              <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
              
            </TouchableOpacity>
                  
      </View>
      <View style={{flexDirection:"row"}}>
      
      <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>Car Service</Text>
                  
                </TouchableOpacity>
      
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
                  <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
                  
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigate('Category2detail2')} style={{height:80,width:"30%",marginTop:30,marginLeft:10,flexDirection:"row",backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20, shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
              
              <Text style={{marginLeft:20,marginTop:24,color:"#636363",fontSize:17,fontFamily:"NexaBold"}}>General Repairs</Text>
              
            </TouchableOpacity>
                  
      </View>
      </ScrollView>
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
    flex: 1.3,
    backgroundColor: '#3F51B5',borderBottomLeftRadius:40,borderBottomRightRadius:40
},
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30
},
middle: {
  margin:10,
  flex: 2,
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
