import React from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar} from 'react-native';

import {HeaderIconButton} from '../../components/HeaderIconButton';
import {AuthContext} from '../../contexts/AuthContext';
import {Product} from '../../components/Product';
import {useGet} from '../../hooks/useGet';
import {HeaderIconsContainer} from '../../components/HeaderIconsContainer';
import {ThemeContext} from '../../contexts/ThemeContext';
import Stars from 'react-native-stars';
import { RadioButton } from 'react-native-paper';
export function MyQuotations5({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height;
  const [value, setValue] = React.useState('first');

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
          PAYMENT</Text>
          
            </View>
            
          </View>
          <View style={{backgroundColor:"#CFD7FF"}}>
            <View style={{backgroundColor:"white",borderTopRightRadius:50}}>
              
            
    <View>
    

<View><Text style={{marginTop:20,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight",marginBottom:20}}>Quote Summary:</Text>

<View style={{flexDirection:'row'}}>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Name:</Text>
<Text style={{marginLeft:70,color:"#636363",fontSize:14,fontFamily:"NexaBold",marginBottom:10}}>Hayley Williams</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Services:</Text>
<View style={{marginLeft:50}}>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Tire Services</Text>
<View style={{flexDirection:"row"}}>
<Text style={{color:"#3F51B5",fontSize:12,fontFamily:"NexaLight",marginBottom:10}}>Car tire alignment:</Text>
<Text style={{marginLeft:20,color:"#636363",fontSize:12,fontFamily:"NexaBold",marginBottom:10}}>AED 50.00</Text>
</View>
<View style={{flexDirection:"row"}}>
<Text style={{color:"#3F51B5",fontSize:12,fontFamily:"NexaLight",marginBottom:10}}>Tire tuning</Text>
<Text style={{marginLeft:20,color:"#636363",fontSize:12,fontFamily:"NexaBold",marginBottom:10}}>AED 20.00</Text>
</View>
<View style={{flexDirection:"row"}}>
<Text style={{color:"#3F51B5",fontSize:12,fontFamily:"NexaLight",marginBottom:10}}>Tire checkup</Text>
<Text style={{marginLeft:20,color:"#636363",fontSize:12,fontFamily:"NexaBold",marginBottom:10}}>FREE</Text>
</View>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Steering Services:</Text>
<View style={{flexDirection:"row"}}>
<Text style={{color:"#3F51B5",fontSize:12,fontFamily:"NexaLight",marginBottom:10}}>Steer alignment</Text>
<Text style={{marginLeft:20,color:"#636363",fontSize:12,fontFamily:"NexaBold",marginBottom:10}}>AED 20.00</Text>
</View>
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

</View>


 
<View style={{flexDirection:"row"}}>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10}}>Discounts / Coupons:</Text>
<Text style={{marginLeft:30,color:"#636363",fontFamily:"NexaBold",marginBottom:10}}>5% OFF</Text>
<Text style={{marginLeft:30,color:"#636363",fontFamily:"NexaBold",marginBottom:10}}>CODE5PRCNT</Text>
</View>
<View style={{flexDirection:"row"}}>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10}}>Loyalty Points:</Text>
<Text style={{marginLeft:30,color:"#636363",fontFamily:"NexaBold",marginBottom:10}}>+ 2 Points</Text>
<Text style={{marginLeft:30,color:"#636363",fontFamily:"NexaBold",marginBottom:10}}>Total: 52 Points</Text>
</View>
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<View style={{flexDirection:"row"}}>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10}}>Redeem Points:</Text>
<Text style={{marginLeft:90,color:"#636363",fontFamily:"NexaBold",marginBottom:10}}>45 Points ( AED 9.00 )</Text>
</View>

<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<View style={{flexDirection:"row"}}><Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Sub Total:</Text>
<Text style={{marginLeft:165,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>AED 70.00</Text>
</View>
<View style={{flexDirection:"row"}}><Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Discounts:</Text>
<Text style={{marginLeft:150,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>- AED 70.00</Text>
</View>

<View style={{flexDirection:"row",marginBottom:10}}><Text style={{color:"#3F51B5",fontSize:20,fontFamily:"NexaLight",marginBottom:10}}>TOTAL</Text>
<Text style={{marginLeft:160,color:"#3F51B5",fontSize:20,fontFamily:"NexaLight",marginBottom:10}}>AED 51.00</Text>
</View>
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<View style={{flexDirection:"row"}}>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10}}>Payment:</Text>
<Text style={{color:"#3F51B5",fontFamily:"NexaBold",marginBottom:10,textDecorationLine:"underline",marginLeft:150}}>ADD NEW CARD</Text>
</View>
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={{flexDirection:"row",backgroundColor:"#CFD7FF",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="first" />
        <Text style={{marginLeft:10,marginTop:6,fontSize:15,fontFamily:"NexaLight",color:"#636363"}}>My saved card 1</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="second" />
        <Text style={{marginLeft:10,marginTop:6,fontSize:15,fontFamily:"NexaLight",color:"#636363"}}>Office Debit</Text>
      </View>
   
    </RadioButton.Group>
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      borderRadius: 10,
      marginBottom:15,
      width:'90%',alignSelf:"center"}}
      onPress={() => {
        navigation.navigate('MyQuotations');
      }}>
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 20}}>Proceed to Payment</Text>
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

 

<TouchableOpacity  onPress={() => navigation.navigate('MyQuotations')} activeOpacity={0.6} style={styles.buttonfile} >

<Image
   style={{height:70,width:70,bottom:20}}
   source={require('../../assets/quote.png')}
   />


</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.navigate('MyPurchases')} activeOpacity={0.6} style={styles.buttonpurchase} >
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
button1: {
  
  position:"relative",
  borderTopRightRadius:15,
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
