import React from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar} from 'react-native';

import {HeaderIconButton} from '../../components/HeaderIconButton';
import {AuthContext} from '../../contexts/AuthContext';
import {Product} from '../../components/Product';
import {useGet} from '../../hooks/useGet';
import {HeaderIconsContainer} from '../../components/HeaderIconsContainer';
import {ThemeContext} from '../../contexts/ThemeContext';
import Stars from 'react-native-stars';
export function MyPayment({navigation}) {
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
            My Payment</Text>
          
            </View>
            
          </View>
          <View style={{backgroundColor:"#CFD7FF"}}>
            <View style={{backgroundColor:"white",borderTopRightRadius:50}}>
              
            
    <View>
<View style={{flexDirection:"row",marginTop:30}}>
  <Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight"}}>Location</Text>
  <Text style={{color:"#3F51B5",marginLeft:30,fontSize:14,fontFamily:"NexaLight"}}>ADCB, Karama, Dubai</Text>
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
        source={require('../../assets/offers1.png')}
        style={{
            width:30,
            height:30,
            
            borderColor:"#CFD7FF",
            borderWidth:2,
            borderRadius:160/2,
            
        }}
    /></TouchableOpacity>
    <View style={{margin:20}}>
    <Text style={{color:"#636363",fontSize:18,fontFamily:"NexaLight"}}>{`Atoy Works`}</Text>

    </View>
   
              </View>
              <View style={{backgroundColor:"#CFD7FF",flexDirection:"row",marginBottom:20,alignItems:"center"}}>
              <Text style={{margin:5,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{`Solite Battery`}</Text>
            
              <Text style={{margin:10,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{`( 2 pcs )`}</Text>
              <TouchableOpacity>
             </TouchableOpacity>
              <Text style={{left:10,margin:10,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{`AED 1,800`}</Text>
             
              </View>
              <View style={{backgroundColor:"#CFD7FF",flexDirection:"row",marginBottom:20,alignItems:"center"}}>
              <Text style={{margin:5,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{`Solite Battery`}</Text>
             
              <Text style={{margin:10,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{`( 1 pc )`}</Text>
             
              <Text style={{left:10,margin:10,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{`AED 1,800`}</Text>
             
              </View>
        
<View style={{flexDirection:"row",alignItems:"center"}}>
              <TouchableOpacity><Image 
        source={require('../../assets/offers1.png')}
        style={{
            width:30,
            height:30,
            
            borderColor:"#CFD7FF",
            borderWidth:2,
            borderRadius:160/2,
            
        }}
    /></TouchableOpacity>
    <View style={{margin:20}}>
    <Text style={{color:"#636363",fontSize:18,fontFamily:"NexaLight"}}>{`Carage`}</Text>

    </View>
   
              </View>
              <View style={{backgroundColor:"#CFD7FF",flexDirection:"row",marginBottom:20,alignItems:"center"}}>
              <Text style={{margin:5,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{`Solite Battery`}</Text>
              
              <Text style={{margin:10,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{`( 2 pcs )`}</Text>
              
              <Text style={{left:10,margin:10,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight"}}>{`AED 1,800`}</Text>
              <TouchableOpacity>
              <Image 
        source={require('../../assets/cross.png')}
        style={{
         
          left:10,
            width:50,
            height:50,
            
            
        }}
    /></TouchableOpacity></View>
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
<View style={{flexDirection:"row"}}><Text style={{color:"#636363",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Marvin Velasquez / 052 283 1550</Text>
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
<View style={{flexDirection:"row"}}><Text style={{color:"#636363",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>SUB TOTAL:</Text>
<Text style={{marginLeft:160,color:"#676767",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>AED 1,100.00</Text>
</View>
<View style={{flexDirection:"row"}}><Text style={{color:"#636363",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>DELIVERY FEE:</Text>
<Text style={{marginLeft:140,color:"#676767",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>AED 1,100.00</Text>
</View>
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginBottom:10,
    
  }}
/>
<View style={{flexDirection:"row",marginBottom:10}}><Text style={{color:"#3F51B5",fontSize:20,fontFamily:"NexaLight",marginBottom:10}}>TOTAL PRICE:</Text>
<Text style={{marginLeft:80,color:"#3F51B5",fontSize:20,fontFamily:"NexaLight",marginBottom:10}}>AED 1,100.00</Text>
</View>
<TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      borderRadius: 25,
      marginBottom:15,
      width:'90%',alignSelf:"center"}}
      onPress={() => {
        navigation.navigate('MyPurchases');
      }}>
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>PROCEED TO PAYMENT</Text>
    </TouchableOpacity>
    </View>
            
            </View>
            </View>
        </ScrollView>
        
        <View style={styles.footer}>
        <View style={styles.TabBarMainContainer} >
 
 <TouchableOpacity onPress={() => navigation.navigate('MyCart')}  activeOpacity={0.6} style={styles.button} >
 
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

 

 <TouchableOpacity onPress={() => navigation.navigate('home')} activeOpacity={0.6} style={styles.button1} >
   
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


<TouchableOpacity onPress={() => navigation.navigate('MyPurchases')}  activeOpacity={0.6} style={styles.button} >

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
});
