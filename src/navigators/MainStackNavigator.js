import React,{useState,useEffect,useRef} from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';
import Notifications from '../screens/Notifications';
import {Locations} from '../screens/Locations';
import Locations1 from '../screens/Locations1';
import {Privacy} from '../screens/Privacy';
import {Terms} from '../screens/Terms';
import {Language} from '../screens/Language';
import {Faq} from '../screens/Faq';
import MyCards from '../screens/MyCards';
import payFromCard from '../screens/payFromCard';
import webView from '../screens/webView';
import MyCards1 from '../screens/MyCards1';
import  Messages  from "../screens/Messages";
import  Messages1  from "../screens/Messages1";
import {Contactus} from '../screens/Contactus';
import {Aboutus} from '../screens/Aboutus';
import Offers from '../screens/offers/Offers';
import Offers1 from '../screens/offers/Offers1';
import Offers2 from '../screens/offers/Offers2';
import Offers3 from '../screens/offers/Offers3';
import {Offers4} from '../screens/offers/Offers4';
import Offers5 from '../screens/offers/Offers5';
import {Offers6} from '../screens/offers/Offers6';
import Filter from '../screens/filters/Filter';
import Filter1 from '../screens/filters/Filter1';
import Filter2 from '../screens/filters/Filter2';
import Filterhome from '../screens/filters/Filterhome';
import RequestQuotations from '../screens/filters/RequestQuotations';
import Homedetail from '../screens/filters/Homedetail';
import {Homedetail1} from '../screens/filters/Homedetail1';
import {Homedetail2} from '../screens/filters/Homedetail2';
import Homedetail3 from '../screens/filters/Homedetail3';
import Homedetail4 from '../screens/filters/Homedetail4';
import Homedetail5 from '../screens/filters/Homedetail5';
import AddToCart from '../screens/filters/AddToCart';
import {Homedetail6} from '../screens/filters/Homedetail6';
import {Homedetail7} from '../screens/filters/Homedetail7';
import Homedetail8 from '../screens/filters/Homedetail8';
import Category from '../screens/catergories/Category';
import Category1 from '../screens/catergories/Category1';
import Category2 from '../screens/catergories/Category2';
import {CategoryFilter} from '../screens/catergories/CategoryFilter';
import Category2first from '../screens/catergories/Category2first';
import Category2detail from '../screens/catergories/Category2detail';
import {Category2detail2} from '../screens/catergories/Category2detail2';
import {Category2detail3} from '../screens/catergories/Category2detail3';
import {Category2detail4} from '../screens/catergories/Category2detail4';
import Category2Filter from '../screens/catergories/Category2Filter';
import {Category3} from '../screens/catergories/Category3';
import {Category3first} from '../screens/catergories/Category3first';
import {Category3Filter} from '../screens/catergories/Category3Filter';
import {Category3detail} from '../screens/catergories/Category3detail';
import {Category3detail1} from '../screens/catergories/Category3detail1';
import {Category4} from '../screens/catergories/Category4';
import {Category4first} from '../screens/catergories/Category4first';
import {Category4Filter} from '../screens/catergories/Category4Filter';
import {Category4detail} from '../screens/catergories/Category4detail';
import {Category4detail1} from '../screens/catergories/Category4detail1';
import {Category5} from '../screens/catergories/Category5';
import {Category5first} from '../screens/catergories/Category5first';
import {Category5Filter} from '../screens/catergories/Category5Filter';
import {Category6} from '../screens/catergories/Category6';
import {Category6first} from '../screens/catergories/Category6first';
import {Category6Filter} from '../screens/catergories/Category6Filter';
import {Category7} from '../screens/catergories/Category7';
import {Category7first} from '../screens/catergories/Category7first';
import {Category7second} from '../screens/catergories/Category7second';
import {Category7third} from '../screens/catergories/Category7third';
import {Category7fourth} from '../screens/catergories/Category7fourth';
import {Category7Filter} from '../screens/catergories/Category7Filter';
import {Category8first} from '../screens/catergories/Category8first';
import {Category8} from '../screens/catergories/Category8';
import {Category8Filter} from '../screens/catergories/Category8Filter';
import {Category8detail} from '../screens/catergories/Category8detail';
import {Category9first} from '../screens/catergories/Category9first';
import {Category9} from '../screens/catergories/Category9';
import {Category9Filter} from '../screens/catergories/Category9Filter';
import {Category9detail} from '../screens/catergories/Category9detail';
import {Category9detail1} from '../screens/catergories/Category9detail1';
import {Category9detail2} from '../screens/catergories/Category9detail2';
import MyCart from '../screens/offers/MyCart';
import {Payment} from '../screens/offers/Payment';
import {MyPayment} from '../screens/offers/MyPayment';
import MyPurchases from '../screens/offers/MyPurchases';
import {MyPurchases1} from '../screens/offers/MyPurchases1';
import MyPurchases3 from '../screens/offers/MyPurchases3';
import {MyPurchases4} from '../screens/offers/MyPurchases4';
import MyQuotations from '../screens/quotations/MyQuotations';
import {MyQuotations1} from '../screens/quotations/MyQuotations1';
import MyQuotations3 from '../screens/quotations/MyQuotations3';
import {MyQuotations4} from '../screens/quotations/MyQuotations4';
import {MyQuotations5} from '../screens/quotations/MyQuotations5';
import {MyQuotations6} from '../screens/quotations/MyQuotations6';
import {Loyality} from '../screens/quotations/Loyality';
import MyFavourites from '../screens/quotations/MyFavourites';
import {MyFavourites1} from '../screens/quotations/MyFavourites1';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import SecureStorage from "react-native-secure-storage";
import axios from "axios";
import { BASE_URL } from "../config";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { FlatList,View,Text,Image,StyleSheet,TouchableOpacity,ScrollView } from 'react-native';

const Tab = createMaterialBottomTabNavigator();
const MainStack = createStackNavigator();

function CustomDrawerComponent({navigation}) {
  const [profileSidebar, setprofileSidebar] = useState([]);
  const {logout} = React.useContext(AuthContext);
  useEffect(() => {
    getUserProfile();
  }, []);
  async function getUserProfile() {
    var userToken = await SecureStorage.getItem('user');
    var userToken = userToken.replace('"','');
    userToken = userToken.replace('"','');
   
     const url = `${BASE_URL}/customer/me`;
       axios.get(url,{
         "headers": {
         "content-type": "application/json",
         Authorization: `Bearer ${userToken}`,
         },
         
         })
         .then((response)=> {

             if (response.data.success == true) {
               console.log("Tarun",response.data.data);
               setprofileSidebar(response.data.data);
             }else{
               console.log(response);
             }
           })
           .catch(function(error) {
         
           console.log(error);
           });
  }
  return (
    <View style={{height:"100%"}}>
       <View style={{flexDirection:'row',justifyContent:"space-between",marginTop: 15,alignItems:"center",margin:10}}>
        <TouchableOpacity onPress={navigation.closeDrawer}>
          <Image
          source={require('../assets/menu.png')}
          style={{marginLeft:"25%"}}
          />
            </TouchableOpacity> 
          <View style={{flexDirection:'column'}}>
            <Text style={{color:"white",fontSize:18,fontFamily:"NexaBold"}}>{profileSidebar.name}</Text>

          </View>
          <Image 
           source={{uri:profileSidebar.profile_image}}
           //source={require('../assets/profile.png')}
          style={{height:50,width:50,borderColor: "red",borderRadius: 60,borderColor:"white"}}
          />
        </View>
        <View
  style={{
    marginTop:10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom:50
  }}
/>
<ScrollView style={styles.list}>
      <FlatList 
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          data={[
            {id:1, title: "PROFILE",image:require('../assets/sidebar1.png'),redirect:"Profile"},
            {id:2, title: "LANGUAGE",image:require('../assets/sidebar2.png'),redirect:"Language"} ,
            {id:3, title: "PAYMENT",image:require('../assets/sidebar3.png'),redirect:"Payment"}, 
            {id:4, title: "FAVORITES",image:require('../assets/sidebar4.png'),redirect:"MyFavourites"}, 
            {id:5, title: "MY CARDS",image:require('../assets/sidebar5.png'),redirect:"MyCards1"},
            {id:6, title: "MY LOCATIONS",image:require('../assets/sidebar6.png'),redirect:"Locations1"}, 
            {id:7, title: "LOYALTY POINTS",image:require('../assets/sidebar7.png'),redirect:"Loyality"}, 
            {id:8, title: "CONTACT US",image:require('../assets/sidebar8.png'),redirect:"Contactus"},
            {id:9, title: "FAQ",image:require('../assets/sidebar9.png'),redirect:"Faq"},
            {id:10, title: "TERMS AND CONDITIONS",image:require('../assets/sidebar12.png'),redirect:"Terms"},
            {id:11, title: "PRIVACY POLICY",image:require('../assets/sidebar10.png'),redirect:"Privacy"},
            {id:12, title: "ABOUT US",image:require('../assets/sidebar11.png'),redirect:"Aboutus"},
          ]}
          horizontal={false}
          numColumns={2}
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
              <TouchableOpacity onPress={() => navigation.navigate(item.redirect)} style={styles.card}>
                
               
                
                <Image style={{resizeMode: 'contain',top:16,height:40,width:40,alignSelf:"center"}} source={item.image}/>
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                  
                        
                        <Text style={{color:"#CFD7FF",top:15,fontSize:10,fontFamily:"NexaLight",alignSelf:"center"}}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}/></ScrollView>
     <View
  style={{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginBottom:50
  }}
/>
<View style={{bottom:35,marginLeft:"54%"}}>

<TouchableOpacity style={{flexDirection:'row'}} onPress={() => {
            logout();
          }}>
            <Text style={{color:"#CFD7FF",fontSize:14,fontFamily:"NexaLight"}}>LOGOUT</Text>
            <Image
          source={require('../assets/logout.png')}
          style={{height:20,width:20,left:20}}
          />
          </TouchableOpacity>

</View>
    </View>
  );
}
const Drawer = createDrawerNavigator();
export function MainStackNavigator({navigation}) {
  return (
    <Drawer.Navigator
    drawerContent={props => <CustomDrawerComponent {...props} />}
   
      drawerStyle={{ borderRadius: 10,backgroundColor:"#3F51B5" }}
      drawerPosition="left">
      <Drawer.Screen name="home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Drawer.Screen name="Locations" component={Locations} />
      <Drawer.Screen name="Locations1" component={Locations1} />
      <Drawer.Screen name="MyCards" component={MyCards} />
      <Drawer.Screen name="payFromCard" component={payFromCard} />
      <Drawer.Screen name="webView" component={webView} />
      <Drawer.Screen name="MyCards1" component={MyCards1} />
      <Drawer.Screen name="Contactus" component={Contactus} />
      <Drawer.Screen name="Privacy" component={Privacy} />
      <Drawer.Screen name="Terms" component={Terms} />
      <Drawer.Screen name="Language" component={Language} />
      <Drawer.Screen name="Faq" component={Faq} />
      <Drawer.Screen name="Aboutus" component={Aboutus} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Messages1" component={Messages1} />
      <Drawer.Screen name="Offers" component={Offers} />
      <Drawer.Screen name="Offers1" component={Offers1} />
      <Drawer.Screen name="Offers2" component={Offers2} />
      <Drawer.Screen name="Offers3" component={Offers3} />
      <Drawer.Screen name="Offers4" component={Offers4} />
      <Drawer.Screen name="Offers5" component={Offers5} />
      <Drawer.Screen name="Offers6" component={Offers6} />
      <Drawer.Screen name="Filter" component={Filter} />
      <Drawer.Screen name="Filter1" component={Filter1} />
      <Drawer.Screen name="Filter2" component={Filter2} />
      <Drawer.Screen name="Filterhome" component={Filterhome} />
      <Drawer.Screen name="Homedetail" component={Homedetail} />
      <Drawer.Screen name="RequestQuotations" component={RequestQuotations} />
      <Drawer.Screen name="Homedetail1" component={Homedetail1} />
      <Drawer.Screen name="Homedetail2" component={Homedetail2} />
      <Drawer.Screen name="Homedetail3" component={Homedetail3} />
      <Drawer.Screen name="Homedetail4" component={Homedetail4} />
      <Drawer.Screen name="AddToCart" component={AddToCart} />
      <Drawer.Screen name="Homedetail5" component={Homedetail5} />
      <Drawer.Screen name="Homedetail6" component={Homedetail6} />
      <Drawer.Screen name="Homedetail7" component={Homedetail7} />
      <Drawer.Screen name="Homedetail8" component={Homedetail8} />
      <Drawer.Screen name="Category" component={Category} />
      <Drawer.Screen name="Category1" component={Category1} />
      <Drawer.Screen name="CategoryFilter" component={CategoryFilter} />
      <Drawer.Screen name="Category2Filter" component={Category2Filter} />
      <Drawer.Screen name="Category2" component={Category2} />
      <Drawer.Screen name="Category2first" component={Category2first} />
      <Drawer.Screen name="Category2detail" component={Category2detail} />
      <Drawer.Screen name="Category2detail2" component={Category2detail2} />
      <Drawer.Screen name="Category2detail3" component={Category2detail3} />
      <Drawer.Screen name="Category2detail4" component={Category2detail4} />
      <Drawer.Screen name="Category3" component={Category3} />
      <Drawer.Screen name="Category3first" component={Category3first} />
      <Drawer.Screen name="Category3Filter" component={Category3Filter} />
      <Drawer.Screen name="Category3detail" component={Category3detail} />
      <Drawer.Screen name="Category3detail1" component={Category3detail1} />
      <Drawer.Screen name="Category4" component={Category4} />
      <Drawer.Screen name="Category4first" component={Category4first} />
      <Drawer.Screen name="Category4Filter" component={Category4Filter} />
      <Drawer.Screen name="Category4detail" component={Category4detail} />
      <Drawer.Screen name="Category4detail1" component={Category4detail1} />
      <Drawer.Screen name="Category5" component={Category5} />
      <Drawer.Screen name="Category5first" component={Category5first} />
      <Drawer.Screen name="Category5Filter" component={Category5Filter} />
      <Drawer.Screen name="Category6" component={Category6} />
      <Drawer.Screen name="Category6first" component={Category6first} />
      <Drawer.Screen name="Category6Filter" component={Category6Filter} />
      <Drawer.Screen name="Category7" component={Category7} />
      <Drawer.Screen name="Category7first" component={Category7first} />
      <Drawer.Screen name="Category7second" component={Category7second} />
      <Drawer.Screen name="Category7third" component={Category7third} />
      <Drawer.Screen name="Category7fourth" component={Category7fourth} />
      <Drawer.Screen name="Category7Filter" component={Category7Filter} />
      <Drawer.Screen name="Category8first" component={Category8first} />
      <Drawer.Screen name="Category8Filter" component={Category8Filter} />
      <Drawer.Screen name="Category8" component={Category8} />
      <Drawer.Screen name="Category8detail" component={Category8detail} />
      <Drawer.Screen name="Category9first" component={Category9first} />
      <Drawer.Screen name="Category9Filter" component={Category9Filter} />
      <Drawer.Screen name="Category9" component={Category9} />
      <Drawer.Screen name="Category9detail" component={Category9detail} />
      <Drawer.Screen name="Category9detail1" component={Category9detail1} />
      <Drawer.Screen name="Category9detail2" component={Category9detail2} />
      <Drawer.Screen name="MyCart" component={MyCart} />
      <Drawer.Screen name="MyPayment" component={MyPayment} />
      <Drawer.Screen name="MyPurchases" component={MyPurchases} />
      <Drawer.Screen name="Payment" component={Payment} />
      <Drawer.Screen name="MyPurchases1" component={MyPurchases1} />
      <Drawer.Screen name="MyPurchases3" component={MyPurchases3} />
      <Drawer.Screen name="MyPurchases4" component={MyPurchases4} />
      <Drawer.Screen name="MyQuotations" component={MyQuotations} />
      <Drawer.Screen name="MyQuotations1" component={MyQuotations1} />
      <Drawer.Screen name="MyQuotations3" component={MyQuotations3} />
      <Drawer.Screen name="MyQuotations4" component={MyQuotations4} />
      <Drawer.Screen name="MyQuotations5" component={MyQuotations5} />
      <Drawer.Screen name="MyQuotations6" component={MyQuotations6} />
      <Drawer.Screen name="Loyality" component={Loyality} />
      <Drawer.Screen name="MyFavourites" component={MyFavourites} />
      <Drawer.Screen name="MyFavourites1" component={MyFavourites1} />
    </Drawer.Navigator>
    
  );
}

const styles = StyleSheet.create({
 
  list: {
 
   shadowColor: '#00000029',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginVertical: 8,
   
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
    shadowColor: 'black',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginVertical: 7,
    backgroundColor:"#495BC2",
    borderRadius:20,
    flexBasis: '45%',
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
    // backgroundColor:"red",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
   
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
 
  cardImage:{
    flex: 1,
    height:60,
    width: 60,
   alignSelf:"center"
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  },
  price:{
    fontSize:16,
    color: "green",
    marginTop: 5
  },
 
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  
  
});
