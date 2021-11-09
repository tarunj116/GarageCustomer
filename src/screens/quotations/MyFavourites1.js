import React from 'react';
import {FlatList, StyleSheet, View,Text,ScrollView,TouchableOpacity,Image,Dimensions,TextInput,SafeAreaView,StatusBar,ImageBackground} from 'react-native';

import {HeaderIconButton} from '../../components/HeaderIconButton';
import {AuthContext} from '../../contexts/AuthContext';
import {Product} from '../../components/Product';
import {useGet} from '../../hooks/useGet';
import {HeaderIconsContainer} from '../../components/HeaderIconsContainer';
import {ThemeContext} from '../../contexts/ThemeContext';
import {BottomNavigation} from '../../components/BottomNavigation';
import Stars from 'react-native-stars';
export function MyFavourites1({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height;


  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='#3F51B5' barStyle="light-content"/>
    <View style={styles.header}>
    <View style={{flexDirection:'row'}}>
    <TouchableOpacity onPress={() => { navigation.navigate('Offers')    ;}}> 
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
        <View style={styles.middle}>
          <View style={{flex:0.2,backgroundColor:"white"}}>
          <View style={{flex:1,backgroundColor:"#CFD7FF",borderTopLeftRadius:50,borderTopRightRadius:50,borderBottomLeftRadius:50,alignItems:"center"}}><Text style={{marginTop:"8%",color:"#3F51B5",fontSize:19,fontFamily:"NexaLight"}}>
          FAVORITES PAGE</Text>
          
            </View>
            
          </View>
          <View style={{flex:1,backgroundColor:"#CFD7FF"}}>
            <View style={{flex:1,backgroundColor:"white",borderTopRightRadius:50,alignItems:"center"}}>
              
            
    <View>
  
<View style={{flexDirection: 'row',marginTop:25}}>
<TouchableOpacity
      style={[styles.container1, {backgroundColor: '#F1F1F1',marginTop:"2%"}]}
      onPress={() => {
        navigation.navigate('MyFavourites');
      }}>
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>SERVICES</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.container1, {backgroundColor: '#3F51B5',marginTop:"2%",left:2}]}
      onPress={() => {
        navigation.navigate('MyFavourites1');
      }}>
      <Text style={{ color: '#CFD7FF',fontFamily:"NexaLight",fontSize: 17}}>SPARE PARTS</Text>
    </TouchableOpacity>
</View>
    </View>
            <ScrollView style={styles.list}>
     
      <FlatList 
          contentContainerStyle={styles.listContainer}
          
          data={[
            {id:1, title: "Product 1",  price:"$ 25.00 USD", image:require('../../assets/susp.png')},
            {id:2, title: "Product 2",  price:"$ 10.13 USD", image:require('../../assets/susp.png')} ,
            {id:3, title: "Product 3",  price:"$ 12.12 USD", image:require('../../assets/susp.png')}, 
            {id:4, title: "Product 4",  price:"$ 11.00 USD", image:require('../../assets/susp.png')}, 
            {id:5, title: "Product 5",  price:"$ 20.00 USD",  image:require('../../assets/susp.png')}, 
            {id:6, title: "Product 6",  price:"$ 33.00 USD",  image:require('../../assets/susp.png')}, 
            {id:7, title: "Product 7",  price:"$ 20.95 USD", image:require('../../assets/susp.png')}, 
            {id:8, title: "Product 8",  price:"$ 13.60 USD",  image:require('../../assets/susp.png')},
            {id:9, title: "Product 9",  price:"$ 15.30 USD",  image:require('../../assets/susp.png')},
            {id:9, title: "Product 10", price:"$ 21.30 USD",  image:require('../../assets/susp.png')},
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
              <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('Offers5')    ;}}> 
              <View >
                

              <ImageBackground style={styles.cardImage} source={item.image}>
                <Image style = {{height:25,width:25,alignSelf:"flex-end",marginTop:5,marginRight:5}} source = {require('../../assets/love.png')} />
                </ImageBackground>
                
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                  
                        <Text style={{color:"#3F51B5",fontSize:11,fontFamily:"NexaBold",padding:1}}>{`Bosch S4 005`}</Text>
                        <Text style={{color:"#3F51B5",fontSize:11,fontFamily:"NexaLight",padding:1}}>{`From AED 100`}</Text>
                        <TouchableOpacity style={{alignItems:'center',left:-5,flexDirection:"row",marginBottom:10}}>
            <Stars
    half={true}
    default={2.5}
    
    spacing={4}
    starSize={10}
    count={5}
    fullStar={require('../../assets/starFilled.png')}
    emptyStar={require('../../assets/starFilled.png')}
    halfStar={require('../../assets/starFilled.png')}/>
    <Text style={{color:"#3F51B5",fontSize:4,fontFamily:"NexaLight"}}>{`4 Stars (1.2k ratings)`}</Text>
    </TouchableOpacity>
                  </View>
                </View>
              </View></TouchableOpacity>
            )
          }}/></ScrollView>
            </View>
            </View>
        </View>
        
        <View style={styles.footer}>
        <BottomNavigation />
        </View>
</View>
);
}

const styles = StyleSheet.create({
  container1: {
     
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    height:10,
    borderRadius: 15,
    width:'48%',
    marginLeft:3,
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
    flex: 0.8,
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
});
