import React, { useState, useEffect, Component } from "react";
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,Picker,StatusBar,Button,ImageBackground, Alert} from 'react-native';
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
export default class MyCart extends Component {
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
      location:"",
      lat:"",
      lng:"",
      isModalVisible:false,
      isModalFirstVisible:false,
      photoURL:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
        garage_image:"https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
        garage_name:"",
      response: "",
      loading: false,
      spinner: false,
      cart_arr:[],
      totalPrice:0,
      isModalSpareParts:false,
      garage_id:"",
      cart_id:"",
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
    this.setState({ spinner: true })
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
        this.setState({ spinner: false })
        //console.log(response);
        if (response.data.success == true) {
          this.setState({
            firstname: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            photoURL: response.data.data.profile_image,
            location:response.data.data.location,
            isModalSpareParts:false,
          });
          this.getCartDetails();
        } else {
          console.log(response);
        }
      })

      .catch(function(error) {
        this.setState({ spinner: false })
        console.log(error);
      });
     

  }
  getCartDetails(){
    const isset = require('isset-php')
    this.setState({cart_arr:[]});
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
    const url=`${BASE_URL}/customer/get_cart_products`;
    const params = JSON.stringify({
      "customer_id":userNewId,
    });
    console.log(params);
    axios.post(url,params,{
      "headers": {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
      if(response.data.success == true){
    let selectedData = [];
    var totalPrice = 0;
    response.data.data.forEach((element) => {
          totalPrice = (element.product_detail[0].quantity*element.product_detail[0].product.price) + totalPrice;
           selectedData.push({
            "product_id":element.product_detail[0].product._id,
             "product_name":element.product_detail[0].product.name,
             "price":element.product_detail[0].product.price,
             "quantity":element.product_detail[0].quantity,
            });
       });
       
       this.setState({
        cart_id:  response.data.data[0]._id,
        totalPrice:  totalPrice,
        garage_id:  response.data.data[0].garage_detail[0]._id,
        garage_image:  response.data.data[0].garage_detail[0].profile_image,
        garage_name:  response.data.data[0].garage_detail[0].garage_name
        })
       console.log(selectedData);
       this.setState({
        cart_arr:  selectedData
        })
       // console.log(this.props.route.params.payment_type);
       
      }
    })
    .catch(function(error) {
      console.log(error);
      });
  }
  deleteCart(){
    this.getCartDetails();
    const url=`${BASE_URL}/customer/remove_cart_product`;
    const params = JSON.stringify({
      "cart_id":this.state.cart_id,
  });
    console.log(params);
    // return false;
    axios.post(url,params,{
      "headers": {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
    if(response.data.success == true){
      alert("Item Deleted From Cart");
      this.getProfile();
    }else{
      console.log(response);
    }
      
    })
    .catch(function(error) {
      console.log(error);
      });
  }
  cartValue = (curquantity,index,type) => {
    var newQuantity=curquantity; 
    console.log(newQuantity);
    console.log(type);
   // return false;
    if(type == 'plus'){
      newQuantity = curquantity + 1;
    }
    if(type == "minus" && curquantity > 1){
    
      newQuantity = curquantity - 1;
    }
    const newArray = [...this.state.cart_arr];
    newArray[index].quantity = newQuantity;
    console.log(newArray);
    this.setState({ cart_arr: newArray });
    var newtotalPrice = 0;
    newArray.forEach((element) => {
      newtotalPrice = (element.quantity*element.price) + newtotalPrice;
  });
  
  this.setState({
   totalPrice:  newtotalPrice
   })
  }
  proceedToPayment(){
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');
    const url=`${BASE_URL}/customer/submit_order`;
    const params = JSON.stringify({
      "garage_id":this.state.garage_id,
      "customer_id":userNewId,
      "products":this.state.cart_arr
  });
    console.log(params);
    // return false;
    axios.post(url,params,{
      "headers": {
        "content-type": "application/json",
      },
    })
    .then((response)=> {
    if(response.data.success == true){
      alert("Item Successfully purchased");
      this.props.navigation.navigate('home');
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
    var userId = this.state.userNewId.replace('"','');
    userId = userId.replace('"','');
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
          <View style={{backgroundColor:"white"}}>
          <View style={{backgroundColor:"#CFD7FF",borderTopLeftRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50,alignItems:"center"}}><Text style={{marginTop:"8%",color:"#3F51B5",fontSize:19,fontFamily:"NexaLight"}}>
            My Cart</Text>
          
            </View>
            
          </View>
          {this.state.cart_arr.length == 0 ?(
             <View>
             <View style={{backgroundColor:"white",height:600}}>
             <Text style={{color:"#3F51B5",marginLeft:30,alignSelf:"center",fontSize:20,fontFamily:"NexaLight",margin:20}}>Not Item Added In Cart</Text>
               </View>
              
              </View>
          ) : null}
          {this.state.cart_arr.length > 0 ?(
          <View style={{backgroundColor:"#CFD7FF"}}>
            <View style={{backgroundColor:"white",borderTopRightRadius:50}}>
              
            
    <View>
<View style={{flexDirection:"row",marginTop:30}}>
  <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Location</Text>
  <Text style={{color:"#3F51B5",marginLeft:30,fontSize:14,fontFamily:"NexaLight"}}>{this.state.location}</Text>
  <Text style={{color:"#3F51B5",marginLeft:40,fontSize:14,fontFamily:"NexaLight"}}>Change</Text>
  </View>
  <View style={{flexDirection:"row",marginTop:10}}>
  <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Payment</Text>
  <Text style={{color:"#3F51B5",marginLeft:30,fontSize:14,fontFamily:"NexaLight"}}>My Card ( **** **** **** 9976 )</Text>
  <Text style={{color:"#3F51B5",marginLeft:7,fontSize:14,fontFamily:"NexaLight"}}>Change</Text>
  </View>
  
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<View><Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Order Details:</Text>
<View style={{flexDirection:"row",alignItems:"center"}}>
              <TouchableOpacity><Image 
        source={{ uri: this.state.garage_image }}
        style={{
            width:30,
            height:30,
            
            borderColor:"#CFD7FF",
            borderWidth:2,
            borderRadius:160/2,
            
        }}
    /></TouchableOpacity>
    <View style={{margin:20}}> 
    <Text style={{color:"#636363",fontSize:18,fontFamily:"NexaLight"}}>{this.state.garage_name}</Text>

    </View>
   
              </View>
<FlatList 
          
            showsVerticalScrollIndicator={false}
            data={this.state.cart_arr}
            horizontal={false}
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
                <View>
                
                <View style={{backgroundColor:"#CFD7FF",flexDirection:"row",justifyContent: "space-between",marginBottom:20,alignItems:"center"}}>
                <Text style={{marginLeft:5,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>{item.product_name}</Text>
                <TouchableOpacity onPress={() => {
                  this.cartValue(item.quantity,post.index,'minus');
                }}>
                <Image 
          source={require('../../assets/whiteminus.png')}
          style={{
           
              width:20,
              height:20,
              
              
          }}
      /></TouchableOpacity>
                <Text style={{margin:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaBold"}}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => {
                  this.cartValue(item.quantity,post.index,'plus');
                }}>
                <Image 
          source={require('../../assets/whiteplus.png')}
          style={{
           
              width:20,
              height:20,
              
              
          }}
      /></TouchableOpacity>
                <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>AED {item.quantity * item.price}</Text>
                <TouchableOpacity onPress={() => {
                  this.deleteCart();
                }}>
                <Image 
          source={require('../../assets/cross.png')}
          style={{
           
            left:10,
              width:50,
              height:50,
              
              
          }}
      /></TouchableOpacity>
                </View>

                </View>
              )
            }}/>

            
        

              
    <View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Offers / Coupons:</Text>
<View style={{flexDirection:"row"}}>
<TextInput
        style={styles.fullname}
        placeholder={'Enter code'}
        placeholderTextColor="#636363"
       
      />
       <Text style={{marginTop:10,marginLeft:40,color:"#3F51B5",fontSize:11,fontFamily:"NexaBold",textDecorationLine: 'underline'}}>VIEW OFFERS</Text>
</View>
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Offers / Coupons:</Text>
<View style={{flexDirection:"row"}}>
<TextInput
        style={styles.fullname}
        placeholder={'Redeem Points:'}
        placeholderTextColor="#636363"
       
      />
       <Text style={{marginTop:10,marginLeft:40,color:"#3F51B5",fontSize:11,fontFamily:"NexaBold",textDecorationLine: 'underline'}}>VIEW POINTS</Text>
</View>
</View>
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Ordering for:</Text>
<View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginTop: "2%",
            }}
          >
            <Text style={{color:"#636363",fontSize:14,fontFamily:"NexaLight"}}>{this.state.firstname} / {this.state.phone}</Text>
            <Text style={{marginLeft:40,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>CHANGE</Text>
          </View>

<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginTop: "2%",
            }}
          >
           <Text style={{color:"#636363",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>SUB TOTAL:</Text>
<Text style={{color:"#676767",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>AED {this.state.totalPrice}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginTop: "2%",
            }}
          >
         <Text style={{color:"#636363",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>DELIVERY FEE:</Text>
<Text style={{color:"#676767",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>AED 00.00</Text>
          </View>

<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginTop: "2%",
              marginBottom:10
            }}
          >
        <Text style={{color:"#3F51B5",fontSize:20,fontFamily:"NexaLight"}}>TOTAL PRICE:</Text>
<Text style={{color:"#3F51B5",fontSize:20,fontFamily:"NexaLight"}}>AED {this.state.totalPrice}</Text>
          </View>
          
      
      
<TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      borderRadius: 25,
      marginBottom:15,
      width:'90%',alignSelf:"center"}}
      onPress={() => navigate('payFromCard',{price:this.state.totalPrice,garage_id:this.state.garage_id,customer_id:userId,products:this.state.cart_arr})}>
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>PROCEED TO PAYMENT</Text>
    </TouchableOpacity>
    </View>
            
            </View>
            </View>
            ) : null}
        </ScrollView>
        
        <View style={styles.footer}>
        <View style={styles.TabBarMainContainer} >
 
 <TouchableOpacity disabled={true}  activeOpacity={0.6} style={styles.button} >
 
 <Image
   style={{height:70,width:70,bottom:20,marginLeft:10}}
   source={require('../../assets/cart1.png')}
   />

 </TouchableOpacity>

 

 <TouchableOpacity  activeOpacity={0.6} style={styles.buttonbell} >
 
 <Image
   style={{height:24,width:24}}
   source={require('../../assets/bell.png')}
   />

 </TouchableOpacity>

 

 <TouchableOpacity onPress={() => navigate('home')} activeOpacity={0.6} style={styles.button1} >
   
 <Image
   style={{height:24,width:24}}
   source={require('../../assets/home2.png')}
   />

 </TouchableOpacity>

 

<TouchableOpacity  activeOpacity={0.6} style={styles.buttonfile} >

<Image
   style={{height:24,width:24}}
   source={require('../../assets/file.png')}
   />

</TouchableOpacity>


<TouchableOpacity onPress={() => navigate('MyPurchases')} activeOpacity={0.6} style={styles.button} >

<Image
   style={{height:24,width:24}}
   source={require('../../assets/shopping.png')}
   />

</TouchableOpacity>

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
    width:'50%',
    
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
buttonbell: {
  borderTopLeftRadius:15,
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1
},
buttonfile: {
  
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
 
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1,
  
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
 fullname: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
  fontFamily:'NexaLight',
  
  backgroundColor:"white",
  color: '#fff',
  
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "60%",
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