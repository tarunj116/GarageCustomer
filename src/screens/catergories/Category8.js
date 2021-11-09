import React from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar} from 'react-native';

import {HeaderIconButton} from '../../components/HeaderIconButton';
import {AuthContext} from '../../contexts/AuthContext';
import {Product} from '../../components/Product';
import {useGet} from '../../hooks/useGet';
import {HeaderIconsContainer} from '../../components/HeaderIconsContainer';
import {ThemeContext} from '../../contexts/ThemeContext';
import {BottomNavigation} from '../../components/BottomNavigation';
import { RadioButton } from 'react-native-paper';
export function Category8({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height;
  const [value, setValue] = React.useState('first');

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
    <View style={styles.header}>
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={() => { navigation.navigate('home')    ;}}> 
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
    <View style={{top:"5%",width:"100%",flexDirection:"column"}}>
    
    <Text style={{left:"7%",fontSize:16,color:"white",fontFamily:"NexaLight"}}>
              CATEGORIES
              </Text>
            
              <View style={{marginLeft:"5%",width:"100%"}}>
          <FlatList 
           horizontal={true}
           showsHorizontalScrollIndicator={false}
                data={[
                  {key: 'Car Maintenance',color:'white',image:require('../../assets/car_picture3x.png'),redirect:"Category"},
                  {key: 'Indoor Service',color:'white',image:require('../../assets/indoor.png'),redirect:"Category2"},
                  {key: 'Spare Parts',color:'white',image:require('../../assets/sparepart.png'),redirect:"Category3"},
                  {key: 'Tires Service',color:'white',image:require('../../assets/tire.png'),redirect:"Category4"},
                  {key: 'Motors',color:'white',image:require('../../assets/motors.png'),redirect:"Category5"},
                  {key: 'Trucks',color:'white',image:require('../../assets/truck.png'),redirect:"Category6"},
                  {key: 'Vehicle Wash',color:'white',image:require('../../assets/wash.png'),redirect:"Category7"},
                  {key: 'Car Accessories',color:'#7A8BE5',image:require('../../assets/assess.png'),redirect:"Category8"},
                  {key: 'Car Interior Clean',color:'white',image:require('../../assets/inter.png'),redirect:"Category9"},
                ]}
                // style={{ flex: 1, margin:"5%"}}
               
                keyExtractor={(item, index) => { return String(index) }}            
                renderItem={({ item, index }) => { return (
                  <TouchableOpacity onPress={() => navigation.navigate(item.redirect)} style={{width:100, backgroundColor:item.color, borderColor:"#F6F6F6",borderRadius:8,height:75,margin:5,alignItems:"center",justifyContent:"center",padding:10}}>
                      <Image
                      style={{height:"100%",width:"100%",resizeMode:"center"}}
                     source={item.image}
                   />
                   <Text style={{color:"white",fontSize:8,fontFamily:"NexaLight"}}>{item.key}</Text>
                </TouchableOpacity>
                ); }}
              />
          </View>
 
           
          
           
              
       </View>

        </View>
        <View style={styles.middle}>
          <View style={{flex:0.2,backgroundColor:"white"}}>
          <View style={{flex:1,flexDirection:"row",backgroundColor:"#CFD7FF",borderTopLeftRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50,alignItems:"center"}}>
          <Image 
        source={require('../../assets/assess.png')}
        style={{
            width:70,
            height:60,
            marginLeft:25,
            
            borderRadius:10,
            
        }}
    />
            <Text style={{marginLeft:20,marginTop:"3%",color:"#3F51B5",fontSize:19,fontFamily:"NexaLight"}}>CAR ACCESSORIES</Text>
          </View>
          </View>
          <View style={{flex:1,backgroundColor:"#CFD7FF"}}>
            <ScrollView style={{flex:1,backgroundColor:"white",borderTopRightRadius:50}}>
            <View style={{margin:10}}>
            <Text style={{color:"#3F51B5",fontFamily:"NexaLight",fontSize:15,marginBottom:10,marginTop:10}}>Select car model:</Text>
            <View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10
  }}
/>
<View style={{top:4,padding:10}}>

<RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={{flexDirection:"row",backgroundColor:"#CFD7FF",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="first" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Tesla</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="second" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Volvo</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="third" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Toyota</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="fouth" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Ferrari</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="fouth" />
        <Text style={{marginLeft:10,marginTop:4,fontSize:20,fontFamily:"NexaLight",color:"#636363"}}>Peterbilt</Text>
      </View>
    </RadioButton.Group>

</View>
<TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      marginTop:10,
      marginBottom:30,
      borderRadius: 20,
      width:'50%',marginLeft:"22%"}}
      onPress={() => {
        navigation.navigate('Category8first');
      }}>
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 17}}>SUBMIT</Text>
    </TouchableOpacity>
            </View>

   

            </ScrollView>
            </View>
        </View>
        
        <View style={styles.footer}>
        <BottomNavigation />

        </View>
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F8F8F8'
  },
  header: {
    flex: 1.5,
    backgroundColor: '#3F51B5',borderBottomLeftRadius:40,borderBottomRightRadius:40
},
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30
},
middle: {
  margin:10,
  flex: 2.4,
  backgroundColor: '#CFD7FF',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,


},
footer: {
  flex: 0.2,
  
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
});
