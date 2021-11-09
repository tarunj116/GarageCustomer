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
export function Locations({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height;
  const [value, setValue] = React.useState('first');

  return (
     <ImageBackground
          style={{flex: 1,height:windowHeight,width:"100%"}}
          source={require('../assets/locations.png')}
          resizeMode={'stretch'}>
    <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
    <View style={styles.header}>
    <TouchableOpacity onPress={navigation.openDrawer}>
      <Image
          source={require('../assets/menu.png')}
          style={{top:11,marginLeft:"6%"}}
          /></TouchableOpacity>
          <Image 
          source={require('../assets/profile.png')}

          style={{top:-30,
          alignSelf:"flex-end",height:80,width:80,borderColor: "white",borderRadius: 60,borderColor:"white"}}
          />
        </View>
        <View style={styles.middle}>
        <Image 
          source={require('../assets/locationscircle.png')}

          style={{top:-90,
          alignSelf:"center",height:100,width:100,borderRadius: 60}}
          />
           <Text style={{marginTop:-100,alignSelf:"center",color:"white",fontSize:25,fontFamily:"NexaBold"}}>Location</Text>
           <ImageBackground
          style={{flex:0.94,margin:10,borderRadius:20,backgroundColor:"white",flexDirection:"column-reverse"}}
          source={require('../assets/map.png')}
          resizeMode={'stretch'}>
            
         <View style={{padding:20,borderRadius:10,backgroundColor:"#3F51B5"}}>
         <Text style={{color:"white",fontFamily:"NexaLight",fontSize:20,alignSelf:"center"}}>Selected Location:</Text>
         <View style={{flexDirection: 'row'}}><Text style={{color:"white",fontFamily:"NexaLight",fontSize:10}}>Street</Text>
<Text style={{marginLeft:130,color:"white",fontFamily:"NexaLight",fontSize:10}}>Apt/Bldg #</Text></View>
<View style={{flexDirection: 'row'}}>
       <TextInput
        style={styles.fullname}
        placeholder={'Enter text here'}
        placeholderTextColor="#E6DDDF"
       
      />
       <TextInput
        style={styles.fullname}
        placeholder={'Enter text here'}
        placeholderTextColor="#E6DDDF"
       
      />
      </View>
      <Text style={{color:"white",fontFamily:"NexaLight",fontSize:10}}>Address Line</Text>
      <TextInput
        style={styles.address}
        placeholder={'Enter text here'}
        placeholderTextColor="#E6DDDF"
       
      />
      <View style={{flexDirection: 'row'}}><Text style={{color:"white",fontFamily:"NexaLight",fontSize:10}}>Street</Text>
<Text style={{marginLeft:130,color:"white",fontFamily:"NexaLight",fontSize:10}}>Apt/Bldg #</Text></View>
<View style={{flexDirection: 'row'}}>
       <TextInput
        style={styles.fullname}
        placeholder={'Enter text here'}
        placeholderTextColor="#E6DDDF"
       
      />
       <TextInput
        style={styles.fullname}
        placeholder={'Enter text here'}
        placeholderTextColor="#E6DDDF"
       
      />
      </View>
      <View style={{flexDirection: 'row'}}><Text style={{color:"white",fontFamily:"NexaLight",fontSize:10}}>Street</Text>
<Text style={{marginLeft:130,color:"white",fontFamily:"NexaLight",fontSize:10}}>Apt/Bldg #</Text></View>
<View style={{flexDirection: 'row'}}>
       <TextInput
        style={styles.fullname}
        placeholder={'Enter text here'}
        placeholderTextColor="#E6DDDF"
       
      />
       <TextInput
        style={styles.fullname}
        placeholder={'Enter text here'}
        placeholderTextColor="#E6DDDF"
       
      />
      </View>
      <TouchableOpacity
      style={{backgroundColor: '#FFFFFF',alignSelf: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      marginTop:10,
      borderRadius: 15,
      width:'70%'}}
      onPress={() => {
        navigation.navigate('home');
      }}>
      <Text style={{alignSelf:"center", color: '#3F51B5',fontFamily:"NexaBold",fontSize: 17}}>Confirm</Text>
    </TouchableOpacity>
  </View>
          
         </ImageBackground>
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
 
  fontFamily:'NexaLight',
  
  backgroundColor:"white",
  color: 'black',
  marginRight:10,
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "50%",
  padding:4,
  borderRadius: 10,
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
