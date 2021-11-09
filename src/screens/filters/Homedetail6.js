import React from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,Picker,StatusBar} from 'react-native';

import {HeaderIconButton} from '../../components/HeaderIconButton';
import {AuthContext} from '../../contexts/AuthContext';
import {Product} from '../../components/Product';
import {useGet} from '../../hooks/useGet';
import {HeaderIconsContainer} from '../../components/HeaderIconsContainer';
import {ThemeContext} from '../../contexts/ThemeContext';
import Stars from 'react-native-stars';
import {BottomNavigation} from '../../components/BottomNavigation';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { RadioButton } from 'react-native-paper';
export function Homedetail6({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height;
  const [value, setValue] = React.useState('first');

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
    <View style={styles.header}>
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={() => { navigation.navigate('Homedetail')    ;}}> 
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
         
        <Image 
        source={require('../../assets/offers1.png')}
        style={{
            width:"100%",
            height:130,
            
            borderColor:"#CFD7FF",
            borderWidth:2,
           
            
        }}
    />
  
    <Image 
        source={require('../../assets/offers1.png')}
        style={{
          marginTop:-50,
          marginLeft:10,
            width:100,
            height:100,
            borderRadius:200,
            borderColor:"#CFD7FF",
            borderWidth:2,
           alignSelf:"center"
            
        }}
    />
   
    <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight",fontSize:14,alignSelf:"center",marginTop:10}}>Atoy Works</Text>
 
    <View
  style={{
    borderBottomColor: '#CFD7FF',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
  }}
/>

<Text style={{margin:10,color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10,alignSelf:"center"}}>Service Details</Text>

<View
  style={{
    borderBottomColor: '#CFD7FF',
    borderBottomWidth: 1.5,
    marginLeft:10,
    marginRight:10,
  }}
/>
<Text style={{margin:10,color:"#3F51B5",fontSize:16,fontFamily:"NexaLight"}}>Select Category:</Text>
<View style={{top:4,padding:10}}>
<RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={{flexDirection:"row",backgroundColor:"#CFD7FF",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="first" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Tires</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="second" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Vehicle</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="third" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Engine & Transmission</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="fouth" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Steering</Text>
      </View>
     
    </RadioButton.Group>

</View>
<Text style={{margin:10,color:"#3F51B5",fontSize:16,fontFamily:"NexaLight"}}>Select Sub Category:</Text>
<View style={{top:4,padding:10}}>
<RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={{flexDirection:"row",backgroundColor:"#CFD7FF",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="first" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Car Tire Alignment</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="second" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Tire Sales</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="third" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Tire Tuning</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="fouth" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Tire Check up</Text>
      </View>
     
    </RadioButton.Group>

</View>
<View
  style={{
    borderBottomColor: '#CFD7FF',
    borderBottomWidth: 1.5,
    marginLeft:10,
    marginRight:10,
  }}
/>
<Text style={{margin:10,color:"#3F51B5",fontSize:18,fontFamily:"NexaLight",alignSelf:"center"}}>Add another service</Text>
<View
  style={{
    borderBottomColor: '#CFD7FF',
    borderBottomWidth: 1.5,
    marginLeft:10,
    marginRight:10,
  }}
/>
<View style={{top:2,padding:20,borderRadius:10}}>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight"}}>Problem Description:</Text>
<View style={{backgroundColor:"white",top:10,padding:20,borderRadius:20,shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,}}>
       <Text style={{justifyContent:"center",color:"#CFD7FF"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
      
      </View>

      
  </View>
  <View
  style={{
    borderBottomColor: '#CFD7FF',
    borderBottomWidth: 1.5,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
  }}
/>
  <View style={{top:2,padding:20,borderRadius:10}}>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight"}}>Special needs:</Text>
<View style={{backgroundColor:"white",top:10,padding:20,borderRadius:20,shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,}}>
       <Text style={{justifyContent:"center",color:"#CFD7FF"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
      
      </View>

      
  </View>

  <View style={{top:1,padding:20,borderRadius:10}}>
  <View style={{flexDirection: 'row'}}>
<Text style={{color:"#3F51B5",fontFamily:"NexaLight",marginBottom:10}}>Upload photos/videos:</Text>
<TouchableOpacity style={{left:185}}> 
            <Image style={{width:20,height:20}} source={require('../../assets/plus.png')}/>
            </TouchableOpacity></View>

     
<View style={{flexDirection: 'row',}}>
  
<TouchableOpacity><Image 
        source={require('../../assets/offers1.png')}
        style={{
            width:80,
            height:60,
            borderRadius:15,
            borderColor:"#CFD7FF",
            borderWidth:2,
            
            
        }}
    /></TouchableOpacity>
    <TouchableOpacity><Image 
        source={require('../../assets/offers1.png')}
        style={{
            width:80,
            height:60,
            borderRadius:15,
            borderColor:"#CFD7FF",
            borderWidth:2,
            
            
        }}
    /></TouchableOpacity>
    <TouchableOpacity><Image 
        source={require('../../assets/offers1.png')}
        style={{
            width:80,
            height:60,
            borderRadius:15,
            borderColor:"#CFD7FF",
            borderWidth:2,
            
            
        }}
    /></TouchableOpacity>
      
      </View>
      
  </View>
<TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      marginTop:20,
      borderRadius: 15,
      marginBottom:50,
      width:'70%',marginLeft:"18%"}}
      onPress={() => {
        navigation.navigate('Homedetail7');
      }}>
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>NEXT</Text>
    </TouchableOpacity>


        </ScrollView>
        
        <View style={styles.footer}>
        <BottomNavigation />
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
    width:'45%',
    marginLeft:10
  },
  text1: {
    color: '#FFFFFF',
    
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    flex: 1, 
    backgroundColor:"#F8F8F8",
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
 
  flex: 1.4,  
  marginLeft:24,
  marginRight:24,
  backgroundColor:"#FFFFFF"
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
   flexBasis: '42%',
   
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
   height: 80,
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
fullname: {
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
  fontFamily:'NexaBold',
  
  backgroundColor:"white",
  color: '#fff',
  
  borderColor:'#fff',
  borderWidth: 0.5,
  width: "100%",
  height:40,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 28,
  fontSize:14,
  marginVertical: 6,
},
});
