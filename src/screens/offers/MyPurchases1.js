import React from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar} from 'react-native';

import {HeaderIconButton} from '../../components/HeaderIconButton';
import {AuthContext} from '../../contexts/AuthContext';
import {Product} from '../../components/Product';
import {useGet} from '../../hooks/useGet';
import {HeaderIconsContainer} from '../../components/HeaderIconsContainer';
import {ThemeContext} from '../../contexts/ThemeContext';
import Stars from 'react-native-stars';
export function MyPurchases1({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height;


  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
    <View style={styles.header}>
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={() => { navigation.navigate('Offers1')    ;}}> 
            <Image style={{top:11,marginLeft:10}} source={require('../../assets/icons/aerosmall.png')}/>
            </TouchableOpacity>
        <TouchableOpacity onPress={navigation.openDrawer}>
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
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
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
          MY PURCHASES</Text>
          
            </View>
            
          </View>
          <View style={{backgroundColor:"#CFD7FF"}}>
            <View style={{backgroundColor:"white",borderTopRightRadius:50}}>
              
            
            <View>
            <View style={{flexDirection: 'row',marginTop:30}}>
<TouchableOpacity
      style={[styles.container1, {backgroundColor: '#F1F1F1',marginTop:"2%"}]}
      onPress={() => {
        navigation.navigate('MyPurchases');
      }}>
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>HISTORY</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.container1, {backgroundColor: '#576CE4',marginTop:"2%",left:2}]}
      onPress={() => {
        navigation.navigate('MyPurchases1');
      }}>
      <Text style={{ color: '#CFD7FF',fontFamily:"NexaLight",fontSize: 17}}>UPCOMING</Text>
    </TouchableOpacity>
</View>
<TouchableOpacity onPress={() => {
        navigation.navigate('MyPurchases4');
      }} style={{height:80,width:"96%",marginTop:30,backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20,alignSelf:"center", shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
           <View style={{flexDirection:'row'}}>
           <Image 
        source={require('../../assets/group.png')}
        style={{
         
          marginLeft:20,
            width:50,
            height:50,
            
            
        }}
    />
            <Text style={{marginLeft:20,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>ORDR#5567</Text>
            <Text style={{marginLeft:45,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>AED 1,125.00</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{marginLeft:20,marginTop:-10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Order date: March 2, 2021</Text>
            <Text style={{marginLeft:20,marginTop:-10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",textDecorationLine: 'underline'}}>Status: Picked</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
        navigation.navigate('MyPurchases4');
      }} style={{height:80,width:"96%",marginTop:30,backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20,alignSelf:"center", shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
           <View style={{flexDirection:'row'}}>
           <Image 
        source={require('../../assets/group.png')}
        style={{
         
          marginLeft:20,
            width:50,
            height:50,
            
            
        }}
    />
            <Text style={{marginLeft:20,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>ORDR#5567</Text>
            <Text style={{marginLeft:45,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>AED 1,125.00</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{marginLeft:20,marginTop:-10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Order date: March 2, 2021</Text>
            <Text style={{marginLeft:20,marginTop:-10,color:"red",fontSize:14,fontFamily:"NexaLight",textDecorationLine: 'underline'}}>Status: Rejected</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
        navigation.navigate('MyPurchases4');
      }} style={{height:80,width:"96%",marginTop:30,backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20,alignSelf:"center", shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
           <View style={{flexDirection:'row'}}>
           <Image 
        source={require('../../assets/group.png')}
        style={{
         
          marginLeft:20,
            width:50,
            height:50,
            
            
        }}
    />
            <Text style={{marginLeft:20,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>ORDR#5567</Text>
            <Text style={{marginLeft:45,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>AED 1,125.00</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{marginLeft:20,marginTop:-10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Order date: March 2, 2021</Text>
            <Text style={{marginLeft:20,marginTop:-10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",textDecorationLine: 'underline'}}>Status: Picked</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
        navigation.navigate('MyPurchases4');
      }} style={{height:80,width:"96%",marginTop:30,backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20,alignSelf:"center", shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
           <View style={{flexDirection:'row'}}>
           <Image 
        source={require('../../assets/group.png')}
        style={{
         
          marginLeft:20,
            width:50,
            height:50,
            
            
        }}
    />
            <Text style={{marginLeft:20,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>ORDR#5567</Text>
            <Text style={{marginLeft:45,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>AED 1,125.00</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{marginLeft:20,marginTop:-10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Order date: March 2, 2021</Text>
            <Text style={{marginLeft:20,marginTop:-10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",textDecorationLine: 'underline'}}>Status: Picked</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
        navigation.navigate('MyPurchases4');
      }} style={{height:80,width:"96%",marginTop:30,marginBottom:20,backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,borderBottomLeftRadius:20,borderBottomRightRadius:20,alignSelf:"center", shadowColor: '#000',shadowOffset: { width: 1, height: 1 },shadowOpacity:  0.4,shadowRadius: 3,elevation: 5}}>
           <View style={{flexDirection:'row'}}>
           <Image 
        source={require('../../assets/group.png')}
        style={{
         
          marginLeft:20,
            width:50,
            height:50,
            
            
        }}
    />
            <Text style={{marginLeft:20,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>ORDR#5567</Text>
            <Text style={{marginLeft:45,marginTop:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>AED 1,125.00</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <Text style={{marginLeft:20,marginTop:-10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Order date: March 2, 2021</Text>
            <Text style={{marginLeft:20,marginTop:-10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",textDecorationLine: 'underline'}}>Status: Picked</Text>
            </View>
          </TouchableOpacity>
        
            </View>
            
            </View>
            </View>
        </ScrollView>
        
        <View style={styles.footer}>
        <View style={styles.TabBarMainContainer} >
 
 <TouchableOpacity onPress={() => navigation.navigate('MyCart')}  activeOpacity={0.6} style={styles.button} >
 
 <Image
   style={{height:24,width:24}}
   source={require('../../assets/cart.png')}
   />

 </TouchableOpacity>

 

 <TouchableOpacity onPress={() => navigation.navigate('Notifications')} activeOpacity={0.6} style={styles.buttonbell} >
 
 <Image
   style={{height:24,width:24}}
   source={require('../../assets/bell.png')}
   />

 </TouchableOpacity>

 

 <TouchableOpacity onPress={() => navigation.navigate('home')} activeOpacity={0.6} style={styles.button1} >
   
 <Image
   style={{height:24,width:24}}
   source={require('../../assets/home2.png')}
   />

 </TouchableOpacity>

 

<TouchableOpacity onPress={() => navigation.navigate('MyQuotations')} activeOpacity={0.6} style={styles.buttonfile} >

<Image
   style={{height:24,width:24}}
   source={require('../../assets/file.png')}
   />

</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.navigate('MyPurchases')} activeOpacity={0.6} style={styles.buttonpurchase} >

<Image
   style={{height:70,width:70,bottom:20,marginRight:10}}
   source={require('../../assets/mypurchase.png')}
   />

</TouchableOpacity>

</View>
        </View>
</View>
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
    flex: 0.3,
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
  
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1
},
buttonbell: {
  
  height: "100%",
  paddingTop:5,
  paddingBottom:5,
  backgroundColor: '#3F51B5',
  justifyContent: 'center', 
  alignItems: 'center', 
  flexGrow: 1
},
buttonfile: {
  borderTopRightRadius:15,
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
buttonpurchase: {
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
});
