import React, { useState, useEffect,Component } from 'react';
import {FlatList, StyleSheet,Modal, View,Text,ScrollView,ImageBackground,TouchableOpacity,Image,Dimensions,TextInput,StatusBar} from 'react-native';
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
import {useAuth} from '../../hooks/useAuth';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';
import { BASE_URL } from "../../config";
import * as ImagePicker from "react-native-image-picker";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import GetLocation from 'react-native-get-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { CheckBox,Slider } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
export default class Filter extends Component {
    
    static navigationOptions = {
        // Sets the title of the Header
        title: 'Home',
    };
    constructor(props) {
      super(props);
      this.state = {
        firstname: '',
        modalVisible: false,
        userNewId:"",
        lastname: '',
        email: '',
        phone: '',
        photoURL: 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png',
        response: '',
        loading: false,
        user_id:'',
        expanded: false,
        expandedSpare: false,
        expandedTires: false,
        expandCar:true,
        expandMotor:false,
        expandTruck:false,
        selectedBrand:'',
        selectedModel:'',
        vehicle_type:"Car",
        type:"",
        vehicle_brand: "",
        vehicle_model: "",
        category: "",
        sub_category: "",
        price_range_from: 0,
        price_range_to: 0,
        rating: 0,
        location: "Location",
        type_door: "",
        maker: "",
        lat:"",
        lng:"",
        brandsArr :[],
        brandsName :[],
      modelsArr :["Model 1","Model 2"],
      modelsName :[],
      catArr :["Cat 1","Cat 2"],
      catName :[],
      subcatArr :["Sub 1","Sub 2"],
      subcatName :[],
      indoorCheck:0,
      outdoorCheck:0,
    }
     
  }

  async componentDidMount() {
    this.setState({ userId: await SecureStorage.getItem("user"),userNewId: await SecureStorage.getItem("userNewId") }, () => {
      this.getProfile();
    });
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getProfile(); // this block will call when user come back
    });
  }
onChange = (name, value) => {
  console.log(name);
  this.setState({ [name]: value });
  if(name == 'expandCar'){
    this.setState({ [name]: value });
    this.setState({ expandMotor: false });
    this.setState({ expandTruck: false });
    this.setState({ vehicle_type: "Car" });
    
  }
  if(name == 'expandMotor'){
    this.setState({ expandMotor: true });
    this.setState({ expandCar: false });
    this.setState({ expandTruck: false });
    this.setState({ vehicle_type: "Motors" });
  }
  if(name == 'expandTruck'){
    this.setState({ expandMotor: false });
    this.setState({ expandCar: false });
    this.setState({ expandTruck: true });
    this.setState({ vehicle_type: "Truck" });
  }
 this.getProfile('test');
}
getProfile(value="") {
  if(value == ""){
    this.setState({  expanded: false,
      expandedSpare: false,
      expandedTires: false,
      expandCar:true,
      expandMotor:false,
      expandTruck:false,
      selectedBrand:'',
      selectedModel:'',
      vehicle_type:"Car",
      type:"",
      vehicle_brand: "",
      vehicle_model: "",
      category: "",
      sub_category: "",
      price_range_from: 0,
      price_range_to: 0,
      rating: 0,
      location: "Location",
      type_door: "",
      maker: "",
      lat:"",
      lng:"",
      brandsArr :[],
      brandsName :[],
    modelsArr :["Model 1","Model 2"],
    modelsName :[],
    catArr :["Cat 1","Cat 2"],
    catName :[],
    subcatArr :["Sub 1","Sub 2"],
    subcatName :[],
    indoorCheck:0,
    outdoorCheck:0 });
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
        this.getBrands();
        this.getModels();
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
  getBrands() {
   console.log("Fds");
   const url = `${BASE_URL}/customer/get_brands`;
   const params ={
    "vehical_type":this.state.vehicle_type
   }
  axios
    .post(url,params, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      console.log(response);
      if (response.data.success == true) {
        
       
        let selectedData = [];
        let selectedName = [];
        response.data.data.forEach((element) => {
          
          selectedData.push(element._id);
          selectedName.push(element.name);
      });
      this.setState({brandsArr : selectedData});
      this.setState({brandsName : selectedName});
      } else {
        console.log(response);
      }
    })

    .catch(function(error) {
      console.log(error);
    });
  }
  onSelectAny = (name,value) => {
    console.log(name,"Tarun");
    if(name=='expanded'){
      this.setState({expanded: value});
      this.setState({expandedSpare: false});
      this.setState({expandedTires: false});
    }
    else if(name=='expandedSpare'){
      this.setState({expandedSpare: value});
      this.setState({expanded: false});
      this.setState({expandedTires: false});
    }
    else if(name=='expandedTires'){
      this.setState({expandedTires: value});
      this.setState({expandedSpare: false});
      this.setState({expanded: false});
    }else{
      this.setState({[name]: value});
    }
    
    if(name == 'vehicle_brand'){
      this.getModels(value);
    }
  } 
  getModels(brand_id) {
    console.log("Fds");
    const url = `${BASE_URL}/customer/get_brand_model`;
    const params ={
     "brand_id":brand_id
    }
   axios
     .post(url,params, {
       headers: {
         "content-type": "application/json",
       },
     })
     .then((response)=> {
       console.log(response);
       if (response.data.success == true) {
         
        
         let selectedData = [];
         let selectedName = [];
         response.data.data.forEach((element) => {
           
           selectedData.push(element._id);
           selectedName.push(element.name);
       });
       this.setState({modelsArr : selectedData});
       this.setState({modelsName : selectedName});
       } else {
         console.log(response);
       }
     })
 
     .catch(function(error) {
       console.log(error);
     });
   }
  onselect = (id)=> {
    if(id==='indoor'){
      if(this.state.indoorCheck === 0){
        this.setState({indoorCheck : 1});
      }
      if(this.state.indoorCheck === 1){
        this.setState({indoorCheck : 0});
      }
    }
    if(id==='outdoor'){
      if(this.state.outdoorCheck === 0){
        this.setState({outdoorCheck : 1});
      }
      if(this.state.outdoorCheck === 1){
        this.setState({outdoorCheck : 0});
      }
    }
    
     }
    editInfo() {
      const { navigate } = this.props.navigation;
      this.setState({ loading: true })
      var type="";
      if(this.state.expanded == true){
        type="Services"
      }
      if(this.state.expandedSpare == true){
        type="Spare"
      }
      if(this.state.expandedTires == true){
        type="Tires"
      }
      var post = 
        {
          vehicle_brand: this.state.vehicle_brand,
          vehicle_model: this.state.vehicle_model,
          lat:this.state.lat,
          lng:this.state.lng,
        }
      
       
        
       
 
        const url = `${BASE_URL}/customer/filter`;
        var userNewId = this.state.userNewId.replace('"','');
        userNewId = userNewId.replace('"','');
        const params ={
          "customer_id":userNewId,
          "brand_id":this.state.vehicle_brand,
          "model_id":this.state.vehicle_model,
          "lat":26.8490526,
           "long": 75.8043754
        }
        console.log(params);
        navigate('Filterhome',{post: params });
        return false;
       axios
         .post(url,params, {
           headers: {
             "content-type": "application/json",
           },
         })
         .then((response)=> {
           console.log(response.data);
          
         })
     
         .catch(function(error) {
           console.log(error);
         });
      console.log(this.state.phone);
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  ratingCompleted = (rating) => {
    this.setState({ rating: rating });
    //console.log("Rating is: " + rating)
  }
    render () {
   console.log(this.state.expanded);
      const { navigate } = this.props.navigation;
      var locations='';
     
      const handleChoosePhoto = () => {
        const options = {
          noData: true,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log(response);
          if (response.assets[0].uri) {
            console.log("FDs");
            this.setState({ photoURL: response.assets[0].uri });
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
              <View style={styles.middle}>
                <View style={{flex:0.2,backgroundColor:"white"}}>
                <View style={{flex:1,backgroundColor:"#CFD7FF",borderTopLeftRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50,alignItems:"center"}}><Text style={{marginTop:"8%",color:"#3F51B5",fontSize:19,fontFamily:"NexaLight"}}>
                FILTER SEARCH</Text>
                
                  </View>
                  
                </View>
                <ScrollView style={{flex:1}}>
                  <View style={{flex:1,backgroundColor:"white",borderTopRightRadius:50,alignItems:"center"}}>
                  
                  
          <View>
          
        
      <View style={{flexDirection: 'row',marginVertical:10}}>
      {this.state.expandCar == false ?(
      <TouchableOpacity
            style={[styles.container1, {backgroundColor: '#CFD7FF',marginTop:"2%"}]}
            onPress={() => this.onChange("expandCar", true)}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Car</Text>
          </TouchableOpacity>
          ) : null}
           {this.state.expandCar ?(
      <TouchableOpacity
            style={[styles.container1, {backgroundColor: '#3F51B5',marginTop:"2%"}]}
            onPress={() => this.onChange("expandCar", true)}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Car</Text>
          </TouchableOpacity>
          ) : null}
          {this.state.expandMotor == false ?(
          <TouchableOpacity
            style={[styles.container1, {backgroundColor: '#CFD7FF',marginTop:"2%",left:2}]}
            onPress={() => this.onChange("expandMotor", true)}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Motor</Text>
          </TouchableOpacity>
          ) : null}
            {this.state.expandMotor ?(
          <TouchableOpacity
            style={[styles.container1, {backgroundColor: '#3F51B5',marginTop:"2%",left:2}]}
            onPress={() => this.onChange("expandMotor", true)}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Motor</Text>
          </TouchableOpacity>
          ) : null}
          {this.state.expandTruck ?(
          <TouchableOpacity
            style={[styles.container1, {backgroundColor: '#3F51B5',marginTop:"2%",left:2}]}
            onPress={() => this.onChange("expandTruck", true)}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Truck</Text>
          </TouchableOpacity>
          ) : null}
          {this.state.expandTruck == false ?(
          <TouchableOpacity
            style={[styles.container1, {backgroundColor: '#CFD7FF',marginTop:"2%",left:2}]}
            onPress={() => this.onChange("expandTruck", true)}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Truck</Text>
          </TouchableOpacity>
          ) : null}
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
          <View style={{width:"90%"}}>
          <Collapse isExpanded={this.state.expanded} 
	        onToggle={(isExpanded)=>this.onSelectAny('expanded', isExpanded)}>
          <CollapseHeader>
          {this.state.expanded == false ? (
            <View style={{backgroundColor: '#CFD7FF', alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          height:10,
          flexDirection:"row",
          }}>
             <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Services</Text>
             
             <Image
                style={{height: 25, width: 20, marginLeft:180}}
                source={require('../../assets/aeroright.png')}
                />            
            </View>
            ) : null}
          {this.state.expanded==true ?(
            <View style={{backgroundColor: '#3F51B5', alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          height:10,
          flexDirection:"row",
          }}>
             <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Services</Text>
             
                <Image
                style={{height: 20, width: 30, marginLeft:180}}
                source={require('../../assets/aerodown1.png')}
                />            
            </View>
            ) : null}
          </CollapseHeader>
          <CollapseBody>
          {this.state.expanded==true ?(
          <View style={{padding:20,borderRadius:10,backgroundColor:"#EBEBEB"}}>
          <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Brand:</Text>
          <Picker
              selectedValue={this.state.vehicle_brand}
              style={{ height: 50, width: "100%",backgroundColor:"white"}}
              onValueChange={(itemValue, itemIndex) =>this.onSelectAny('vehicle_brand',itemValue)}
            >
               <Picker.Item label="Select Brand" value="" />
              {this.state.brandsArr.map((item, index) => {
   return (< Picker.Item label={this.state.brandsName[index]} value={item} key={index} />);
})}   
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Model:</Text>
          <Picker
             
             selectedValue={this.state.vehicle_model}
             style={{ height: 50, width: "100%",backgroundColor:"white" }}
             onValueChange={(itemValue, itemIndex) =>this.setState({vehicle_model: itemValue})}
             
            >
               <Picker.Item label="Select Brand" value="" />
              {this.state.modelsArr.map((item, index) => {
   return (< Picker.Item label={this.state.modelsName[index]} value={item} key={index} />);
})}   
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Category:</Text>
          <Picker
               selectedValue={this.state.category}
               style={{ height: 50, width: "100%",backgroundColor:"white" }}
               onValueChange={(itemValue, itemIndex) =>this.setState({category: itemValue})}
             
            >
             {this.state.catArr.map((item, index) => {
   return (< Picker.Item label={item} value={index} key={index} />);
})}   
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Sub Category:</Text>
          <Picker
             selectedValue={this.state.sub_category}
             style={{ height: 50, width: "100%",backgroundColor:"white" }}
             onValueChange={(itemValue, itemIndex) =>this.setState({sub_category: itemValue})}
             
            >
               {this.state.subcatArr.map((item, index) => {
   return (< Picker.Item label={item} value={index} key={index} />);
})}   
            </Picker>
            <Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Price range:</Text>
      <View style={{flexDirection: 'row'}}>
      <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>From:</Text>
             <TextInput
              style={styles.from}
              placeholder={'50'}
              placeholderTextColor="black"
              onChangeText={text => this.onChange("price_range_from", text)} 
            />
            <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>To:</Text>
            <TextInput
              style={styles.to}
              placeholder={'300'}
              placeholderTextColor="black"
              onChangeText={text => this.onChange("price_range_to", text)} 
            />
            </View>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Ratings:</Text>
            <View style={{marginLeft:50,marginTop:-32,marginBottom:20}}>
            <Rating
  type='custom'
  ratingImage={require('../../assets/starFilled.png')}
  ratingColor='#3498db'
  ratingBackgroundColor='white'
  ratingCount={5}
  imageSize={30}
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
/>
<Slider
    value={this.state.rating}
    thumbStyle={{ height: 40, width: 40, backgroundColor: 'transparent' }}
    onValueChange={(value) => this.setState({ rating: value })}
  />
           </View>
            <Text style={{color:"#3F51B5",fontFamily:"NexaLight"}}>Location:</Text>
      <View
              style={{
                color: '#fff',
                backgroundColor:'white',
                borderColor:'#fff',
                width: '100%',
               alignSelf:"center",
                borderRadius: 10,
                fontSize:18,
                marginVertical: 6,
                flexDirection: 'row',
              }}>
              <View style={{height: 20, width: 20,top:10,left:10}}>
                <TouchableOpacity>
                  <Image
                  style={{height: 20, width: 18}}
                  source={require('../../assets/location.png')}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.setModalVisible(true)}>
              <TextInput
              style={styles.input}
              placeholder={this.state.location}
              placeholderTextColor="#3F51B5"
              editable={false}
           
              /></TouchableOpacity>
             
          </View>
          <View style={{marginLeft:-30,flexDirection: 'row'}}>
          <CheckBox
                     checkedIcon={<Image style={{height:20,width:20}} source={require("../../assets/correct.png")} />}
                      checked = {this.state.indoorCheck}
                      onPress={() =>
                        this.onselect('indoor')
                      }
/>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight",fontSize:22,top:12}}>Indoor</Text>
<CheckBox
                     checkedIcon={<Image style={{height:20,width:20}} source={require("../../assets/correct.png")} />}
                      checked = {this.state.outdoorCheck}
                      onPress={() =>
                        this.onselect('outdoor')
                      }
/>
             <Text style={{color:"#3F51B5",fontFamily:"NexaLight",fontSize:22,top:12}}>Outdoor</Text>
            </View>
          </View>
           ) : null}
          </CollapseBody>
      </Collapse>
        </View>
        <View style={{width:"90%"}}>
          <Collapse isExpandedSpare={this.state.expandedSpare} 
	        onToggle={(isExpandedSpare)=>this.onSelectAny('expandedSpare', isExpandedSpare)}>
          <CollapseHeader>
          {this.state.expandedSpare == false ? (
            <View style={{backgroundColor: '#CFD7FF', alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          height:10,
          flexDirection:"row",
          }}>
             <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Spare Parts</Text>
             
             <Image
                style={{height: 25, width: 20, marginLeft:160}}
                source={require('../../assets/aeroright.png')}
                />            
            </View>
            ) : null}
          {this.state.expandedSpare ?(
            <View style={{backgroundColor: '#3F51B5', alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          height:10,
          flexDirection:"row",
          }}>
             <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Spare Parts</Text>
             
                <Image
                style={{height: 20, width: 30, marginLeft:160}}
                source={require('../../assets/aerodown1.png')}
                />            
            </View>
            ) : null}
          </CollapseHeader>
          <CollapseBody>
          {this.state.expandedSpare == true ? (
            <View style={{padding:20,borderRadius:10,backgroundColor:"#EBEBEB"}}>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Brand:</Text>
            <Picker
                selectedValue={this.state.vehicle_brand}
                style={{ height: 50, width: "100%",backgroundColor:"white"}}
                onValueChange={(itemValue, itemIndex) =>this.onSelectAny('vehicle_brand',itemValue)}
              >
                 <Picker.Item label="Select Brand" value="" />
                {this.state.brandsArr.map((item, index) => {
     return (< Picker.Item label={this.state.brandsName[index]} value={item} key={index} />);
  })}   
              </Picker>
              <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Model:</Text>
            <Picker
               
               selectedValue={this.state.vehicle_model}
               style={{ height: 50, width: "100%",backgroundColor:"white" }}
               onValueChange={(itemValue, itemIndex) =>this.setState({vehicle_model: itemValue})}
               
              >
                 <Picker.Item label="Select Brand" value="" />
                {this.state.modelsArr.map((item, index) => {
     return (< Picker.Item label={this.state.modelsName[index]} value={item} key={index} />);
  })}   
              </Picker>
              <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Category:</Text>
            <Picker
                 selectedValue={this.state.category}
                 style={{ height: 50, width: "100%",backgroundColor:"white" }}
                 onValueChange={(itemValue, itemIndex) =>this.setState({category: itemValue})}
               
              >
               {this.state.catArr.map((item, index) => {
     return (< Picker.Item label={item} value={index} key={index} />);
  })}   
              </Picker>
              <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Sub Category:</Text>
            <Picker
               selectedValue={this.state.sub_category}
               style={{ height: 50, width: "100%",backgroundColor:"white" }}
               onValueChange={(itemValue, itemIndex) =>this.setState({sub_category: itemValue})}
               
              >
                 {this.state.subcatArr.map((item, index) => {
     return (< Picker.Item label={item} value={index} key={index} />);
  })}   
              </Picker>
              <Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Price range:</Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>From:</Text>
               <TextInput
                style={styles.from}
                placeholder={'50'}
                placeholderTextColor="black"
                onChangeText={text => this.onChange("price_range_from", text)} 
              />
              <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>To:</Text>
              <TextInput
                style={styles.to}
                placeholder={'300'}
                placeholderTextColor="black"
                onChangeText={text => this.onChange("price_range_to", text)} 
              />
              </View>
              <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Ratings:</Text>
              <View style={{marginLeft:50,marginTop:-32,marginBottom:20}}>
              <Rating
    type='custom'
    ratingImage={require('../../assets/starFilled.png')}
    ratingColor='#3498db'
    ratingBackgroundColor='white'
    ratingCount={5}
    imageSize={30}
    onFinishRating={this.ratingCompleted}
    style={{ paddingVertical: 10 }}
  />
  <Slider
      value={this.state.rating}
      thumbStyle={{ height: 40, width: 40, backgroundColor: 'transparent' }}
      onValueChange={(value) => this.setState({ rating: value })}
    />
             </View>
              <Text style={{color:"#3F51B5",fontFamily:"NexaLight"}}>Location:</Text>
        <View
                style={{
                  color: '#fff',
                  backgroundColor:'white',
                  borderColor:'#fff',
                  width: '100%',
                 alignSelf:"center",
                  borderRadius: 10,
                  fontSize:18,
                  marginVertical: 6,
                  flexDirection: 'row',
                }}>
                <View style={{height: 20, width: 20,top:10,left:10}}>
                  <TouchableOpacity>
                    <Image
                    style={{height: 20, width: 18}}
                    source={require('../../assets/location.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                <TextInput
                style={styles.input}
                placeholder={this.state.location}
                placeholderTextColor="#3F51B5"
                editable={false}
             
                /></TouchableOpacity>
               
            </View>
            <View style={{marginLeft:-30,flexDirection: 'row'}}>
            <CheckBox
                       checkedIcon={<Image style={{height:20,width:20}} source={require("../../assets/correct.png")} />}
                        checked = {this.state.indoorCheck}
                        onPress={() =>
                          this.onselect('indoor')
                        }
  />
  <Text style={{color:"#3F51B5",fontFamily:"NexaLight",fontSize:22,top:12}}>Indoor</Text>
  <CheckBox
                       checkedIcon={<Image style={{height:20,width:20}} source={require("../../assets/correct.png")} />}
                        checked = {this.state.outdoorCheck}
                        onPress={() =>
                          this.onselect('outdoor')
                        }
  />
               <Text style={{color:"#3F51B5",fontFamily:"NexaLight",fontSize:22,top:12}}>Outdoor</Text>
              </View>
            </View>
          ) : null}
          </CollapseBody>
      </Collapse>
        </View>
        <View style={{width:"90%"}}>
        <Collapse isExpandedTires={this.state.expandedTires} 
	        onToggle={(isExpandedTires)=>this.onSelectAny('expandedTires', isExpandedTires)}>
          <CollapseHeader>
          {this.state.expandedTires == false ? (
            <View style={{backgroundColor: '#CFD7FF', alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          height:10,
          flexDirection:"row",
          }}>
             <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Tires</Text>
             
                <Image
                style={{height: 25, width: 20, marginLeft:220}}
                source={require('../../assets/aeroright.png')}
                />            
            </View>
            ) : null}
          {this.state.expandedTires ?(
            <View style={{backgroundColor: '#3F51B5', alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          height:10,
          flexDirection:"row",
          }}>
             <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Tires</Text>
             
                <Image
                style={{height: 20, width: 30, marginLeft:200}}
                source={require('../../assets/aerodown1.png')}
                />            
            </View>
            ) : null}
          </CollapseHeader>
          <CollapseBody>
          {this.state.expandedTires == true ? (
            <View style={{padding:20,borderRadius:10,backgroundColor:"#EBEBEB"}}>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Brand:</Text>
            <Picker
                selectedValue={this.state.vehicle_brand}
                style={{ height: 50, width: "100%",backgroundColor:"white"}}
                onValueChange={(itemValue, itemIndex) =>this.onSelectAny('vehicle_brand',itemValue)}
              >
                 <Picker.Item label="Select Brand" value="" />
                {this.state.brandsArr.map((item, index) => {
     return (< Picker.Item label={this.state.brandsName[index]} value={item} key={index} />);
  })}   
              </Picker>
              <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Model:</Text>
            <Picker
               
               selectedValue={this.state.vehicle_model}
               style={{ height: 50, width: "100%",backgroundColor:"white" }}
               onValueChange={(itemValue, itemIndex) =>this.setState({vehicle_model: itemValue})}
               
              >
                 <Picker.Item label="Select Brand" value="" />
                {this.state.modelsArr.map((item, index) => {
     return (< Picker.Item label={this.state.modelsName[index]} value={item} key={index} />);
  })}   
              </Picker>
              <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Category:</Text>
            <Picker
                 selectedValue={this.state.category}
                 style={{ height: 50, width: "100%",backgroundColor:"white" }}
                 onValueChange={(itemValue, itemIndex) =>this.setState({category: itemValue})}
               
              >
               {this.state.catArr.map((item, index) => {
     return (< Picker.Item label={item} value={index} key={index} />);
  })}   
              </Picker>
              <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Sub Category:</Text>
            <Picker
               selectedValue={this.state.sub_category}
               style={{ height: 50, width: "100%",backgroundColor:"white" }}
               onValueChange={(itemValue, itemIndex) =>this.setState({sub_category: itemValue})}
               
              >
                 {this.state.subcatArr.map((item, index) => {
     return (< Picker.Item label={item} value={index} key={index} />);
  })}   
              </Picker>
              <Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Price range:</Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>From:</Text>
               <TextInput
                style={styles.from}
                placeholder={'50'}
                placeholderTextColor="black"
                onChangeText={text => this.onChange("price_range_from", text)} 
              />
              <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>To:</Text>
              <TextInput
                style={styles.to}
                placeholder={'300'}
                placeholderTextColor="black"
                onChangeText={text => this.onChange("price_range_to", text)} 
              />
              </View>
              <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Ratings:</Text>
              <View style={{marginLeft:50,marginTop:-32,marginBottom:20}}>
              <Rating
    type='custom'
    ratingImage={require('../../assets/starFilled.png')}
    ratingColor='#3498db'
    ratingBackgroundColor='white'
    ratingCount={5}
    imageSize={30}
    onFinishRating={this.ratingCompleted}
    style={{ paddingVertical: 10 }}
  />
  <Slider
      value={this.state.rating}
      thumbStyle={{ height: 40, width: 40, backgroundColor: 'transparent' }}
      onValueChange={(value) => this.setState({ rating: value })}
    />
             </View>
              <Text style={{color:"#3F51B5",fontFamily:"NexaLight"}}>Location:</Text>
        <View
                style={{
                  color: '#fff',
                  backgroundColor:'white',
                  borderColor:'#fff',
                  width: '100%',
                 alignSelf:"center",
                  borderRadius: 10,
                  fontSize:18,
                  marginVertical: 6,
                  flexDirection: 'row',
                }}>
                <View style={{height: 20, width: 20,top:10,left:10}}>
                  <TouchableOpacity>
                    <Image
                    style={{height: 20, width: 18}}
                    source={require('../../assets/location.png')}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                <TextInput
                style={styles.input}
                placeholder={this.state.location}
                placeholderTextColor="#3F51B5"
                editable={false}
             
                /></TouchableOpacity>
               
            </View>
            <View style={{marginLeft:-30,flexDirection: 'row'}}>
            <CheckBox
                       checkedIcon={<Image style={{height:20,width:20}} source={require("../../assets/correct.png")} />}
                        checked = {this.state.indoorCheck}
                        onPress={() =>
                          this.onselect('indoor')
                        }
  />
  <Text style={{color:"#3F51B5",fontFamily:"NexaLight",fontSize:22,top:12}}>Indoor</Text>
  <CheckBox
                       checkedIcon={<Image style={{height:20,width:20}} source={require("../../assets/correct.png")} />}
                        checked = {this.state.outdoorCheck}
                        onPress={() =>
                          this.onselect('outdoor')
                        }
  />
               <Text style={{color:"#3F51B5",fontFamily:"NexaLight",fontSize:22,top:12}}>Outdoor</Text>
              </View>
            </View>
           ) : null}
          </CollapseBody>
      </Collapse>
      
        </View>
                  </View>
                  </ScrollView>
                  <TouchableOpacity
            style={{backgroundColor: '#3F51B5',alignItems: 'center',
            justifyContent: 'center',
            padding: 25,
            height:10,
            marginTop:30,
            borderRadius: 25,
            marginBottom:25,
            width:'70%',marginLeft:"18%"}}
            onPress={() => this.editInfo()}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>APPLY FILTER</Text>
          </TouchableOpacity>
              </View>
              
              <View style={styles.footer}>
              <BottomNavigation />
      
              </View>
              <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
           
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
        <View  style={{height:"100%",backgroundColor:"#3F51B5"}}>
    <GooglePlacesAutocomplete
      autoFocus={true}
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data);
        this.setState({ location: data.description });
        this.setState({ modalVisible: false });
       // navigate('Registration',{text: data.description })
      }}
      query={{
        key: 'AIzaSyCcPWHyC2mJjFtCKGRgQHyYO310KRH25tw',
        language: 'en',
      }}
      styles={{
        textInputContainer: {
          backgroundColor: 'white',
          marginTop:40
        },
       
        
      }}
      value={locations}
    />
    </View>
        </Modal>
      </View>
        )
    }
}

const styles = StyleSheet.create({
  container1: {
     
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height:10,
    borderRadius: 15,
    width:'28%',
    marginLeft:10
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
  flex: 1.4,
 
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
  width: '100%',
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
});
