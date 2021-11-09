import React from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar,ImageBackground} from 'react-native';

import {HeaderIconButton} from '../components/HeaderIconButton';
import {AuthContext} from '../contexts/AuthContext';
import {Product} from '../components/Product';
import {useGet} from '../hooks/useGet';
import {HeaderIconsContainer} from '../components/HeaderIconsContainer';
import {ThemeContext} from '../contexts/ThemeContext';
import Stars from 'react-native-stars';
import { RadioButton } from 'react-native-paper';
import {BottomNavigation} from '../components/BottomNavigation';
export function Aboutus({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height;
  const [value, setValue] = React.useState('first');

  return (
     <ImageBackground
          style={{flex: 1,height:windowHeight,width:"100%"}}
          source={require('../assets/aboutusbak.png')}
          resizeMode={'stretch'}>
    <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
    <View style={styles.header}>
    <TouchableOpacity onPress={navigation.openDrawer}>
      <Image
          source={require('../assets/menu.png')}
          style={{top:11,marginLeft:"6%"}}
          /></TouchableOpacity>
           <Text style={{marginLeft:180,marginTop:20,alignSelf:"center",color:"white",fontSize:25,fontFamily:"NexaBold"}}>About Us</Text>
        </View>
        <View style={styles.middle}>
        
           
           
           
           <View
          style={{marginTop:280,flex:0.84,margin:10,borderRadius:20,backgroundColor:"white"}}
         >
           <View style={{margin:20}}>
           <Text style={{color:"#3F51B5",fontFamily:"NexaBold"}}>About Us</Text>
           <ScrollView >
     
     <Text style={{marginTop:30,color:"#676767",fontFamily:"NexaLight"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
     <Text style={{color:"#676767",fontFamily:"NexaLight"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
     </ScrollView>
     </View>
          
         
         </View>
        
        
        </View>
        
        <View style={styles.footer}>
        <BottomNavigation />
        </View>
</ImageBackground>
);
}

const styles = StyleSheet.create({
  container1: {
     
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height:10,
    margin:10,
    borderRadius: 15,
    width:'45%',
    
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
    flex: 0.5,
},
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
},
middle: {
  flex: 2.4,

},
footer: {
  flex: 0.1,
  elevation:7
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
buttonfile: {
  
 
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1,
  
},
button1: {
  borderTopLeftRadius:15,
  position:"relative",
  
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1,
},
buttonpurchase: {
  borderTopLeftRadius:15,
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
  color: 'black',
  marginRight:10,
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "100%",
  padding:4,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 18,
  fontSize:13,
  marginVertical: 6,
},
textarea: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
  fontFamily:'NexaLight',
  
  backgroundColor:"white",
  color: 'black',
  marginRight:10,
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "100%",
  padding:80,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 18,
  fontSize:13,
  marginVertical: 6,
},
address: {
 
  fontFamily:'NexaLight',
  
  backgroundColor:"white",
  color: 'black',
 
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "100%",
  padding:4,
  borderRadius: 10,
  borderColor:'#fff',
  paddingLeft: 18,
  fontSize:13,
  marginVertical: 6,
},
mobilecountry: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
  fontFamily:'NexaLight',
  backgroundColor:"white",
  color: '#fff',
  left:-6,
  borderColor:'#fff',
  borderWidth: 0.5,
  width: '24%',
  height:60,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 20,
  fontSize:18,
  marginVertical: 6,
},
mobile: {
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
  width: '76%',
  height:60,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 28,
  fontSize:18,
  marginVertical: 6,
},
});
