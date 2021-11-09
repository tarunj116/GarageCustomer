import React, { useState, useEffect,Component } from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,Picker,StatusBar} from 'react-native';
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
export default class Filter2 extends Component {
    
    static navigationOptions = {
        // Sets the title of the Header
        title: 'Home',
    };
    constructor(props) {
      super(props);
      this.state = {
        firstname: '',
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
onChange = (name, value) => {
  this.setState({ [name]: value })
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
          // photoURL: response.data.response.user_image,
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
      this.setState({ loading: true })
      const formData = new FormData();
      formData.append('user_id',this.state.user_id);
      formData.append('name',this.state.firstname);
      formData.append('email',this.state.email);
      formData.append('phone',this.state.phone);
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
     console.log(this.state.expanded);
    
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
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => { navigate('Offers')    ;}}> 
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
      <TouchableOpacity
            style={[styles.container1, {backgroundColor: '#CFD7FF',marginTop:"2%"}]}
            onPress={() => {
              navigate('Filter');
            }}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Car</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.container1, {backgroundColor: '#CFD7FF',marginTop:"2%",left:2}]}
            onPress={() => {
              navigate('Filter1');
            }}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Motor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.container1, {backgroundColor: '#3F51B5',marginTop:"2%",left:2}]}
            onPress={() => {
              navigate('Filter2');
            }}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Truck</Text>
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
          </View>
          <View style={{width:"90%"}}>
          <Collapse isExpanded={this.state.expanded} 
	        onToggle={(isExpanded)=>this.setState({expanded: isExpanded})}>
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
                style={{height: 25, width: 20, marginLeft:220}}
                source={require('../../assets/aeroright.png')}
                />            
            </View>
            ) : null}
          {this.state.expanded ?(
            <View style={{backgroundColor: '#3F51B5', alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          height:10,
          flexDirection:"row",
          }}>
             <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>Services</Text>
             
                <Image
                style={{height: 20, width: 30, marginLeft:190}}
                source={require('../../assets/aerodown1.png')}
                />            
            </View>
            ) : null}
          </CollapseHeader>
          <CollapseBody>
          <View style={{padding:20,borderRadius:10,backgroundColor:"#EBEBEB"}}>
          <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Brand:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Volvo" value="Volvo" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Model:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Volvo GTX" value="Volvo" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Category:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Vehicle" value="Vehicle" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Sub Category:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Vehicle check up" value="Vehicle check up" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Price range:</Text>
      <View style={{flexDirection: 'row'}}>
      <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>From:</Text>
             <TextInput
              style={styles.from}
              placeholder={'50'}
              placeholderTextColor="black"
             
            />
            <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>To:</Text>
            <TextInput
              style={styles.to}
              placeholder={'300'}
              placeholderTextColor="black"
             
            />
            </View>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Ratings:</Text>
            <View style={{marginLeft:50,marginTop:-32,marginBottom:20}}>
            <Stars
          half={true}
          default={2.5}
          
          spacing={4}
          starSize={35}
          count={5}
          fullStar={require('../../assets/starFilled.png')}
          emptyStar={require('../../assets/starFilled.png')}
          halfStar={require('../../assets/starFilled.png')}/></View>
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
                  style={{height: 20, width: 20}}
                  source={require('../../assets/location.png')}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
              style={styles.input}
              placeholder="Building A, Deira, Dubai"
              placeholderTextColor="#3F51B5"
              />
             
          </View>
          <View style={{flexDirection: 'row',marginLeft:"8%",marginTop:"10%"}}>
      <TouchableOpacity>
                  <Image
                  style={{height: 25, width: 25}}
                  source={require('../../assets/correct.png')}
                  />
                </TouchableOpacity>
             <Text style={{left:10,color:"#3F51B5",fontFamily:"NexaLight",fontSize:22}}>Indoor</Text>
             <Image
                  style={{marginLeft:"10%",height: 25, width: 25}}
                  source={require('../../assets/correct.png')}
                  />
             <Text style={{left:10,color:"#3F51B5",fontFamily:"NexaLight",fontSize:22}}>Outdoor</Text>
            </View>
          </View>
          </CollapseBody>
      </Collapse>
        </View>
        <View style={{width:"90%"}}>
          <Collapse isExpandedSpare={this.state.expandedSpare} 
	        onToggle={(isExpandedSpare)=>this.setState({expandedSpare: isExpandedSpare})}>
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
                style={{height: 25, width: 20, marginLeft:190}}
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
          <View style={{padding:20,borderRadius:10,backgroundColor:"#EBEBEB"}}>
          <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Category:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Vehicle" value="Vehicle" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Sub Category:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Vehicle check up" value="Vehicle check up" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Brand:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Volvo" value="Volvo" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Spare Part Model:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Volvo GTX" value="Volvo" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
           
            <Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Price range:</Text>
      <View style={{flexDirection: 'row'}}>
      <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>From:</Text>
             <TextInput
              style={styles.from}
              placeholder={'50'}
              placeholderTextColor="black"
             
            />
            <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>To:</Text>
            <TextInput
              style={styles.to}
              placeholder={'300'}
              placeholderTextColor="black"
             
            />
            </View>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Ratings:</Text>
            <View style={{marginLeft:50,marginTop:-32,marginBottom:20}}>
            <Stars
          half={true}
          default={2.5}
          
          spacing={4}
          starSize={35}
          count={5}
          fullStar={require('../../assets/starFilled.png')}
          emptyStar={require('../../assets/starFilled.png')}
          halfStar={require('../../assets/starFilled.png')}/></View>
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
                  style={{height: 20, width: 20}}
                  source={require('../../assets/location.png')}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
              style={styles.input}
              placeholder="Building A, Deira, Dubai"
              placeholderTextColor="#3F51B5"
              />
             
          </View>
          <Text style={{color:"#3F51B5",fontFamily:"NexaLight"}}>Maker:</Text>
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
              
              <TextInput
              style={styles.input}
              placeholder="Japan"
              placeholderTextColor="#3F51B5"
              />
             
          </View>
         
          </View>
          </CollapseBody>
      </Collapse>
        </View>
        <View style={{width:"90%"}}>
        <Collapse isExpandedTires={this.state.expandedTires} 
	        onToggle={(isExpandedTires)=>this.setState({expandedTires: isExpandedTires})}>
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
                style={{height: 25, width: 20, marginLeft:250}}
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
                style={{height: 20, width: 30, marginLeft:230}}
                source={require('../../assets/aerodown1.png')}
                />            
            </View>
            ) : null}
          </CollapseHeader>
          <CollapseBody>
          <View style={{padding:20,borderRadius:10,backgroundColor:"#EBEBEB"}}>
          <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Brand:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Volvo" value="Volvo" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Vehicle Model:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Volvo GTX" value="Volvo" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Category:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Vehicle" value="Vehicle" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Select Sub Category:</Text>
          <Picker
             
              style={{ height: 50, width: "100%",backgroundColor:"white" }}
             
            >
              <Picker.Item label="Vehicle check up" value="Vehicle check up" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            <Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Size:</Text>
      <View style={{flexDirection: 'row'}}>
      <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>Tire Diameter:</Text>
             <TextInput
              style={styles.from}
              placeholder={'21.4"'}
              placeholderTextColor="black"
             
            />
            
            </View>
            <Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10,marginTop:10}}>Price range:</Text>
      <View style={{flexDirection: 'row'}}>
      <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>From:</Text>
             <TextInput
              style={styles.from}
              placeholder={'50'}
              placeholderTextColor="black"
             
            />
            <Text style={{color:"#636363",fontFamily:"NexaBold",marginTop:10}}>To:</Text>
            <TextInput
              style={styles.to}
              placeholder={'300'}
              placeholderTextColor="black"
             
            />
            </View>
            <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10}}>Ratings:</Text>
            <View style={{marginLeft:50,marginTop:-32,marginBottom:20}}>
            <Stars
          half={true}
          default={2.5}
          
          spacing={4}
          starSize={35}
          count={5}
          fullStar={require('../../assets/starFilled.png')}
          emptyStar={require('../../assets/starFilled.png')}
          halfStar={require('../../assets/starFilled.png')}/></View>
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
                  style={{height: 20, width: 20}}
                  source={require('../../assets/location.png')}
                  />
                </TouchableOpacity>
              </View>
              <TextInput
              style={styles.input}
              placeholder="Building A, Deira, Dubai"
              placeholderTextColor="#3F51B5"
              />
             
          </View>
          <Text style={{color:"#3F51B5",fontFamily:"NexaLight"}}>Maker:</Text>
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
              
              <TextInput
              style={styles.input}
              placeholder="Japan"
              placeholderTextColor="#3F51B5"
              />
             
          </View>
         
          <View style={{flexDirection: 'row',marginLeft:"8%",marginTop:"10%"}}>
      <TouchableOpacity>
                  <Image
                  style={{height: 25, width: 25}}
                  source={require('../../assets/correct.png')}
                  />
                </TouchableOpacity>
             <Text style={{left:10,color:"#3F51B5",fontFamily:"NexaLight",fontSize:22}}>Indoor</Text>
             <Image
                  style={{marginLeft:"10%",height: 25, width: 25}}
                  source={require('../../assets/correct.png')}
                  />
             <Text style={{left:10,color:"#3F51B5",fontFamily:"NexaLight",fontSize:22}}>Outdoor</Text>
            </View>
          </View>
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
            onPress={() => {
              navigate('Filterhome');
            }}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>APPLY FILTER</Text>
          </TouchableOpacity>
              </View>
              
              <View style={styles.footer}>
              <BottomNavigation />
      
              </View>
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
    flex: 0.4,
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
