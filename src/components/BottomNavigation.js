import React from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export function BottomNavigation({title, style, onPress}) {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    
   <View style={styles.TabBarMainContainer} >
 
   <TouchableOpacity onPress={() => navigation.navigate('MyCart')}  activeOpacity={0.6} style={styles.button} >
   
   <Image
     style={{height:24,width:24}}
     source={require('../assets/cart.png')}
     />

   </TouchableOpacity>

   

   <TouchableOpacity onPress={() => navigation.navigate('Notifications')}  activeOpacity={0.6} style={styles.buttonbell} >
   
   <Image
     style={{height:24,width:24}}
     source={require('../assets/bell.png')}
     />

   </TouchableOpacity>

   

   <TouchableOpacity onPress={() => navigation.navigate('home')} activeOpacity={0.6} style={styles.button1} >
     
   <Image
     style={{height:70,width:70,bottom:20}}
     source={require('../assets/home.png')}
     />

   </TouchableOpacity>

   

<TouchableOpacity onPress={() => navigation.navigate('MyQuotations')}  activeOpacity={0.6} style={styles.buttonfile} >

<Image
     style={{height:24,width:24}}
     source={require('../assets/file.png')}
     />

</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.navigate('MyPurchases')} activeOpacity={0.6} style={styles.button} >

<Image
     style={{height:24,width:24}}
     source={require('../assets/shopping.png')}
     />

</TouchableOpacity>

</View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {

    left: 15,
    top: 15,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  input: {

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
    marginVertical: 6,
  },
  menu: {

    left: 305,

  },
  drawer: {
    top: 555,
  },
  container:{
    
    top:"20%",
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
    shadowColor: '#00000029',
   shadowOffset: {
     width: 2
   },
   
   shadowOpacity: 0.8,
   shadowRadius: 4,
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
    zIndex:4
  },
  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20
  }
  
  
});

