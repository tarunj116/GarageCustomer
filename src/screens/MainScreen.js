import React from 'react';
import {StyleSheet,ImageBackground,ScrollView,View,Text,Switch,TextInput,Dimensions,TouchableOpacity} from 'react-native';
import {Heading} from '../components/Heading';
import {Input} from '../components/Input';
import {FilledButton} from '../components/FilledButton';
import {TextButton} from '../components/TextButton';
import {Error} from '../components/Error';
import {AuthContainer} from '../components/AuthContainer';
import {AuthContext} from '../contexts/AuthContext';
import {Loading} from '../components/Loading';
import { color } from 'react-native-reanimated';

export function MainScreen({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('student1@mailinator.com');
  const [password, setPassword] = React.useState('Admin@123');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <ScrollView style={{width:'100%'}}>
       <ImageBackground
          style={{flex: 1,height:windowHeight,width:"100%"}}
          source={require('../assets/first.png')}
          resizeMode={'stretch'}>
              <TouchableOpacity onPress={() => {
          navigation.pop();
        }}>
            <View style={{marginTop:"112%",justifyContent:"center",alignItems:"center",}}>
                
            <TouchableOpacity
              style={{
                width: "60%",
                height: 45,
                backgroundColor: "#576CE4",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
               
              }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  fontFamily: "NexaBold",
                  color: "white",
                  fontSize: 17,
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
      
            <TouchableOpacity
              style={{
                width: "60%",
                height: 45,
                backgroundColor: "#576CE4",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                marginTop:"3%"
               
              }}
              onPress={() => {
                navigation.navigate("Registration");
              }}
            >
              <Text
                style={{
                  fontFamily: "NexaBold",
                  color: "white",
                  fontSize: 17,
                }}
              >
               SIGNUP
              </Text>
            </TouchableOpacity>

    </View> 
          {/* <Image style={styles.closeIcon} source={require('../assets/icons/aerosmall.png')}/>    */}
            </TouchableOpacity>
      </ImageBackground>
      </ScrollView>
  
    
  );
}

const styles = StyleSheet.create({
  container: {
     
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      borderRadius: 25,
      width:'60%',
      
    },
    text: {
      color: '#FFFFFF',
      
      fontWeight: 'bold',
      fontSize: 20,
    },
headline: {
  color: 'white', 
  textAlign: 'center',
   
  fontWeight: 'bold',
  fontSize: 21,
  marginBottom:10,
  marginLeft:40,
  marginRight:40,
  marginTop:10
},
headlineDesc: {
  color: 'white', 
  textAlign: 'center', 
  marginLeft:38,
  marginRight:38,
  fontSize: 21,
  marginBottom:10
},
input: {
  color: '#fff',
  borderColor:'#FFFFFF',
  color:'black',
  backgroundColor:'#D6E0F3',
  borderWidth: 0.5,
  width: '85%',
  height:50,
  borderRadius: 25,
  borderColor:'#fff',
  paddingLeft: 30,
  fontSize:18,
  marginVertical: 6,
},
loginButton: {
 width:'60%',
 marginTop:"120%",
 marginLeft:"20%",
},
signupButton: {
  width:'60%',
  marginTop:"2%",
  marginLeft:"20%",
 },
closeIcon: {
  left: 24,
  top: 18,
},

});
