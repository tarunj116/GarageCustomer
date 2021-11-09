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

export function Homedetail2({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height;


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
    <View style={{flexDirection:"row"}}>
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
           
            
        }}
    />
    <View style={{margin:1}}>
    
    <View style={{flexDirection:"row"}}>
    <Text style={{color:"#3F51B5",fontSize:22,fontFamily:"NexaLight"}}>{`Atoy Works`}</Text>
    <Image 
        source={require('../../assets/share.png')}
        style={{
         
          marginLeft:40,
            width:20,
            height:20,
            borderRadius:200,
            borderColor:"#CFD7FF",
            borderWidth:2,
           
            
        }}
    />
    <Image 
        source={require('../../assets/love.png')}
        style={{
         
          marginLeft:2,
            width:20,
            height:20,
            borderRadius:200,
            borderColor:"#CFD7FF",
            borderWidth:2,
           
            
        }}
    />
    </View>
    <Text style={{color:"#3F51B5",fontSize:13,fontFamily:"NexaLight"}}>{`Building A, Deira, Dubai`}</Text>
    <TouchableOpacity style={{alignItems:'center',left:-5,flexDirection:"row"}}>
            <Stars
    half={true}
    default={2.5}
    
    spacing={4}
    starSize={10}
    count={5}
    fullStar={require('../../assets/starFilled.png')}
    emptyStar={require('../../assets/starFilled.png')}
    halfStar={require('../../assets/starFilled.png')}/>
    <Text style={{color:"#3F51B5",fontSize:8,fontFamily:"NexaLight"}}>{`4 Stars (1.2k ratings)`}</Text>
    </TouchableOpacity>
    </View>
    <Text style={{marginLeft:-50,marginTop:56,color:"#3F51B5",fontSize:8,fontFamily:"NexaBold",textDecorationLine: 'underline'}}>VIEW RATING</Text>
    </View>
    <View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    marginTop:10
  }}
/>
<View style={{flexDirection:"row",margin:10}}>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginBottom:10}}>Garage Timings:</Text>
<Text style={{marginLeft:30,color:"#3F51B5",fontSize:11,fontFamily:"NexaLight",marginBottom:10}}>Open from Mondays - Sundays</Text>

</View>
<View
  style={{
    borderBottomColor: '#3F51B5',
    borderBottomWidth: 1.5,
    
  }}
/>
<Text style={{color:"#3F51B5",fontSize:14,fontFamily:"NexaLight",marginTop:10,marginBottom:10,margin:10}}>Garage services:</Text>
<View style={{flexDirection: 'row'}}>
<TouchableOpacity
      style={[styles.container1, {backgroundColor: '#F1F1F1'}]}
      onPress={() => {
        navigation.navigate('Homedetail');
      }}>
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaLight",fontSize: 17}}>IN GARAGE</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.container1, {backgroundColor: '#576CE4',left:2}]}
      onPress={() => {
        navigation.navigate('Homedetail1');
      }}>
      <Text style={{ color: '#CFD7FF',fontFamily:"NexaLight",fontSize: 17}}>INDOOR</Text>
    </TouchableOpacity>
</View>

<ScrollView style={styles.list}>
      <FlatList 
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          data={[
            {id:1, title: "Car Service",image:require('../../assets/sidebar1.png')},
            {id:2, title: "General Repairs",image:require('../../assets/sidebar2.png')} ,
            {id:3, title: "Inspection",image:require('../../assets/sidebar3.png')}, 
            {id:4, title: "Diagnostics",image:require('../../assets/sidebar4.png')}, 
            {id:5, title: "Electrical",image:require('../../assets/sidebar5.png')}, 
            {id:6, title: "Air Conditioning",image:require('../../assets/sidebar6.png')}, 
            {id:6, title: "Air Conditioning",image:require('../../assets/sidebar6.png')}, 
            {id:6, title: "Air Conditioning",image:require('../../assets/sidebar6.png')}, 
            {id:6, title: "Air Conditioning",image:require('../../assets/sidebar6.png')}, 
            {id:6, title: "Air Conditioning",image:require('../../assets/sidebar6.png')}, 
            {id:6, title: "Air Conditioning",image:require('../../assets/sidebar6.png')}, 
            {id:6, title: "Air Conditioning",image:require('../../assets/sidebar6.png')}, 
          ]}
          horizontal={false}
          numColumns={3}
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
              <TouchableOpacity  onPress={() => {
                navigation.navigate('Homedetail3');
              }} style={styles.card}>
                <View style={styles.cardFooter}>
                  <View style={styles.socialBarContainer}>
                  
                        
                        <Text style={{color:"#636363",fontSize:13,fontFamily:"NexaBold",alignSelf:"center"}}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
            )
          }}/></ScrollView>
      



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
    flex: 0.3,
    backgroundColor: '#3F51B5',borderBottomLeftRadius:40,borderBottomRightRadius:40
},
text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30
},
middle: {
 
  flex: 2.4,  
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

 

 /******** card **************/
 card:{
  shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity:  0.4,
  shadowRadius: 3,
  elevation: 5,
   marginVertical: 7,
   backgroundColor:"white",
   borderRadius:10,
   flexBasis: '28%',
   height:60,
   marginHorizontal: 9,
 },

 cardFooter:{
   
   paddingTop: 12.5,
  
   paddingHorizontal: 16,
   borderBottomLeftRadius: 1,
   borderBottomRightRadius: 1,
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
