import React, { useState, useEffect, Component } from "react";
import {FlatList,ToastAndroid, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,Picker,StatusBar,Button} from 'react-native';

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
import { CheckBox,Slider } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Avatar, RadioButton } from 'react-native-paper';
export default class Homedetail8 extends Component {
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
        photos_videos:[],
        driver_licence:[],
        fullname :"",
        description:"",
        special_needs:"",
        catgory_val:"",
        subcatgory_val:"",
        catArray:[
          {
              "name": "Tires",
              "vehical_type": "Car",
              "status": 1,
              "_id": "615a99255147a126b63173d9",
              "createdAt": "2021-10-04T06:03:17.078Z",
              "modefiedAt": "2021-10-04T06:03:17.078Z",
              "__v": 0
          },
          {
              "name": "Vehicle",
              "vehical_type": "Car",
              "status": 1,
              "_id": "615a992f5147a126b63173df",
              "createdAt": "2021-10-04T06:03:27.106Z",
              "modefiedAt": "2021-10-04T06:03:27.106Z",
              "__v": 0
          },
          {
            "name": "Engine & Transmission",
            "vehical_type": "Car",
            "status": 1,
            "_id": "615a992f5147a126b63173df",
            "createdAt": "2021-10-04T06:03:27.106Z",
            "modefiedAt": "2021-10-04T06:03:27.106Z",
            "__v": 0
        },
        {
          "name": "Steering",
          "vehical_type": "Car",
          "status": 1,
          "_id": "615a992f5147a126b63173df",
          "createdAt": "2021-10-04T06:03:27.106Z",
          "modefiedAt": "2021-10-04T06:03:27.106Z",
          "__v": 0
      }
      ],
      subcatArray:[
        {
            "name": "Car Tire Alignment",
            "vehical_type": "Car",
            "status": 1,
            "_id": "615a99255147a126b63173d9",
            "createdAt": "2021-10-04T06:03:17.078Z",
            "modefiedAt": "2021-10-04T06:03:17.078Z",
            "__v": 0
        },
        {
            "name": "Tire Sales",
            "vehical_type": "Car",
            "status": 1,
            "_id": "615a992f5147a126b63173df",
            "createdAt": "2021-10-04T06:03:27.106Z",
            "modefiedAt": "2021-10-04T06:03:27.106Z",
            "__v": 0
        }
    ],
    selectedCatArr:[],
      isModalSpareParts:false
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
       
    })
    .catch(function(error) {
      console.log(error);
      });
  }
  
  removeImage = (id,index)=> {
    console.log(id);
    if(id == 'driver'){
      const items = [...this.state.driver_licence];
      items.splice(index, 1);
      console.log(items);
      this.setState({ driver_licence: items });
    }
    if(id == 'photo'){
      const itemsnew = [...this.state.photos_videos];
      itemsnew.splice(index, 1);
      console.log(itemsnew);
      this.setState({ photos_videos: itemsnew });
    }
   
     }
    
       onChange = (name, value) => {
        this.setState({ [name]: value });
      };
      addwithsubmitQuote() {
        const { navigate } = this.props.navigation;
          const url = `${BASE_URL}/customer/submit_booking`;
          
          if(this.state.catgory_val == ""){
            ToastAndroid.show("Please select category", ToastAndroid.SHORT,ToastAndroid.CENTER);
            return false;
          }
          if(this.state.subcatgory_val == ""){
            ToastAndroid.show("Please select subcategory", ToastAndroid.SHORT,ToastAndroid.CENTER);
            return false;
          }
         
          if(this.state.description == ""){
            ToastAndroid.show("Please enter description", ToastAndroid.SHORT,ToastAndroid.CENTER);
            return false;
          }
        
          if(this.state.special_needs == ""){
            ToastAndroid.show("Please enter special needs", ToastAndroid.SHORT,ToastAndroid.CENTER);
            return false;
          }
          const params ={
            "garage_id": this.props.route.params.garage_id,
            "service_id":this.props.route.params.service_id,
            "description": this.state.description,
            "category_id": this.state.catgory_val,
            "subcategory_id": this.state.subcatgory_val,
            "special_needs": this.state.special_needs,
            }
          console.log(params);
          var selectedCategory = [
            {
                "name": "1. Car tire alignment",
                "vehical_type": "Car",
                "status": 1,
                "_id": "615a99255147a126b63173d9",
                "createdAt": "2021-10-04T06:03:17.078Z",
                "modefiedAt": "2021-10-04T06:03:17.078Z",
                "__v": 0
            }
        ]; 
          this.setState({ selectedCatArr: selectedCategory });
          // this.scroll.current.scrollTo({ x:0, y:0 });

      
          return false;
         axios
           .post(url,params, {
             headers: {
               "content-type": "application/json",
             },
           })
           .then((response)=> {
             console.log(response.data);
             if(response.data.success == true){
               alert("Request Submitted Successfully")
               navigate('home');
             }else{
               alert("Something Went Wrong !");
             }
            // console.log(response.data);
            
           })
       
           .catch(function(error) {
             console.log(error);
           });
        console.log(this.state.phone);
    }
      submitQuote() {
        const { navigate } = this.props.navigation;
          const url = `${BASE_URL}/customer/submit_booking`;
          
          if(this.state.catgory_val == ""){
            ToastAndroid.show("Please select category", ToastAndroid.SHORT,ToastAndroid.CENTER);
            return false;
          }
          if(this.state.subcatgory_val == ""){
            ToastAndroid.show("Please select subcategory", ToastAndroid.SHORT,ToastAndroid.CENTER);
            return false;
          }
         
          if(this.state.description == ""){
            ToastAndroid.show("Please enter description", ToastAndroid.SHORT,ToastAndroid.CENTER);
            return false;
          }
        
          if(this.state.special_needs == ""){
            ToastAndroid.show("Please enter special needs", ToastAndroid.SHORT,ToastAndroid.CENTER);
            return false;
          }
          const params ={
            "garage_id": this.props.route.params.garage_id,
            "service_id":this.props.route.params.service_id,
            "description": this.state.description,
            "category_id": this.state.catgory_val,
            "subcategory_id": this.state.subcatgory_val,
            "special_needs": this.state.special_needs,
            }
          console.log(params);
          navigate('Homedetail8',{garage_id : this.props.route.params.garage_id });
         // navigate('Filterhome',{post: params });
          return false;
         axios
           .post(url,params, {
             headers: {
               "content-type": "application/json",
             },
           })
           .then((response)=> {
             console.log(response.data);
             if(response.data.success == true){
               alert("Request Submitted Successfully")
               navigate('home');
             }else{
               alert("Something Went Wrong !");
             }
            // console.log(response.data);
            
           })
       
           .catch(function(error) {
             console.log(error);
           });
        console.log(this.state.phone);
    }
  render() {
    const { navigate } = this.props.navigation;
   
    const handleChoosePhotoDriver = () => {
      const options = {
        noData: true,
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log(response);
        if(response.didCancel == true){
          console.log('cancelled');
        }else{
          var imageData= {image:response.uri}
          let imageValue = this.state.driver_licence;
          imageValue.push(imageData);
         
           this.setState({driver_licence : imageValue})
        }
       
      });
    };
    const handleChoosePhotoVideo = () => {
      const options = {
        noData: true,
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log(response);
        if(response.didCancel == true){
          console.log('cancelled');
        }else{
          var imageDataVideo= {image:response.uri}
          let imageValueData = this.state.photos_videos;
          imageValueData.push(imageDataVideo);
         
           this.setState({photos_videos : imageValueData})
        }
       
      });
    };
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
    
      <Image 
          source={{ uri: this.state.garage_image }}
          style={{
            marginTop:-50,
            marginLeft:10,
              width:120,
              height:120,
              borderRadius:200,
              borderColor:"#CFD7FF",
              borderWidth:2,
             alignSelf:"center"
              
          }}
      />
     
      <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight",fontSize:14,alignSelf:"center",marginTop:10}}>Atoy Works</Text>
   
      <View
    style={{
      borderBottomColor: '#CFD7FF',
      borderBottomWidth: 1.5,
      marginTop:10,
      marginLeft:10,
      marginRight:10,
    }}
  />
  
  <Text style={{margin:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10,alignSelf:"center"}}>Personal Details</Text>
  
  <View
    style={{
      borderBottomColor: '#CFD7FF',
      borderBottomWidth: 1.5,
      marginLeft:10,
      marginRight:10,
    }}
  />
  
  
    
  
  <View style={{top:1,padding:20,borderRadius:10,backgroundColor:"#EBEBEB"}}>
  <View style={{flexDirection: 'row'}}>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10}}>Driver's License :</Text>
<TouchableOpacity onPress={handleChoosePhotoDriver}> 
            <Image style={{width:20,height:20}} source={require('../../assets/plus.png')}/>
            </TouchableOpacity></View>
<View style={{flexDirection: 'row',marginBottom:10}}>
<FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.driver_licence}
                // style={{ flex: 1, margin:"5%"}}

                keyExtractor={(item, index) => {
                  return String(index);
                }}
                renderItem={({ item, index }) => {
                  return (<View style={{flexDirection:"row"}}>
     
                  <Image 
                 source={{ uri: item.image }}
                 style={{
                     width:80,
                     height:60,
                     borderRadius:15,
                     borderColor:"#CFD7FF",
                     borderWidth:2,
                     
                     
                 }}
             />
             <TouchableOpacity style={{left:-30}} onPress={() => this.removeImage('driver',index)}> 
             <Image 
                 source={require('../../assets/cross.png')}
                 style={{
                     width:35,
                     height:35,
                     
                 }}/></TouchableOpacity>
             </View> );
                }}
              />
      
      </View>
      <View style={{flexDirection: 'row'}}>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10}}>Photos and Videos:</Text>
<TouchableOpacity onPress={handleChoosePhotoVideo}> 
            <Image style={{width:20,height:20}} source={require('../../assets/plus.png')}/>
            </TouchableOpacity></View>
            <View style={{flexDirection: 'row',marginBottom:10}}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.photos_videos}
                // style={{ flex: 1, margin:"5%"}}

                keyExtractor={(item, index) => {
                  return String(index);
                }}
                renderItem={({ item, index }) => {
                  return (<View style={{flexDirection:"row"}}>
     
                  <Image 
                 source={{ uri: item.image }}
                 style={{
                     width:80,
                     height:60,
                     borderRadius:15,
                     borderColor:"#CFD7FF",
                     borderWidth:2,
                     
                     
                 }}
             />
             <TouchableOpacity style={{left:-30}} onPress={() => this.removeImage('photo',index)}> 
             <Image 
                 source={require('../../assets/cross.png')}
                 style={{
                     width:35,
                     height:35,
                     
                 }}/></TouchableOpacity>
             </View> );
                }}
              />
              </View>
            
      
  </View>
    <View
    style={{
      borderBottomColor: '#CFD7FF',
      borderBottomWidth: 1.5,
      marginLeft:10,
      marginRight:10,
      marginTop:10
    }}
  />
  <TouchableOpacity
        style={{backgroundColor: '#3F51B5',alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        height:10,
        marginTop:20,
        borderRadius: 15,
        marginBottom:50,
        width:'70%',marginLeft:"18%"}}
        onPress={() => navigate('MyQuotations',{garage_id : this.props.route.params.garage_id })}>
        <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>SEND QUOTATION</Text>
      </TouchableOpacity>
  
  
          </ScrollView>
          
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
  color: '#576CE4',
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
  color: '#CFD7FF',
  
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "95%",
  height:120,
  borderRadius: 15,
  borderColor:'#fff',
  paddingLeft: 28,
  fontSize:14,
},
country: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
  fontFamily:'NexaBold',
  
  backgroundColor:"white",
  color: '#576CE4',
  
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "20%",
  height:40,
  borderRadius: 15,
  borderColor:'#fff',
  paddingLeft: 15,
  fontSize:14,
  marginVertical: 6,
},
mobile: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
  fontFamily:'NexaBold',
  marginLeft:10,
  backgroundColor:"white",
  color: '#576CE4',
  
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "75%",
  height:40,
  borderRadius: 15,
  borderColor:'#fff',
  paddingLeft: 28,
  fontSize:14,
  marginVertical: 6,
},
spinnerTextStyle: {
  color: '#FFF'
},
});