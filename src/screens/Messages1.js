import React,{useState,useEffect,useRef} from 'react'
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Button,
  StyleSheet,
  Dimensions,
  StatusBar
} from "react-native";
import { HeaderIconButton } from "../components/HeaderIconButton";
import { AuthContext } from "../contexts/AuthContext";
import { Product } from "../components/Product";
import { useGet } from "../hooks/useGet";
import { HeaderIconsContainer } from "../components/HeaderIconsContainer";
import { ThemeContext } from "../contexts/ThemeContext";
import SecureStorage from "react-native-secure-storage";
import { BottomNavigation } from "../components/BottomNavigation";
import io from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../config";
export function Messages1({ navigation,route }) {
  const scrollViewRef = useRef();
  const { logout } = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  const windowHeight = Dimensions.get("window").height;
  const [socket, setSocket] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profile, setProfileData] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    async function getSocketConnect() {
      const newSocket = io("https://garage.devtechnosys.tech:17302");
      setSocket(newSocket);
      var room = route.params.sender_id+'_'+route.params.receiver_id;
      setUserName(route.params.user_name)
      var userToken = await SecureStorage.getItem('userNewId');
      var userNewId = userToken.replace('"','');
      userNewId = userNewId.replace('"','');
      setUserId(userNewId);
      newSocket.emit('getMessage', room,userToken);
      newSocket.on('getMessage', async function(result) {
        //console.log(result);
        setChatMessages(result);
    });
    }
    getSocketConnect();
    getProviderProfile();
    getCustomerProfile();
  }, []);
  
  async function submitChatMessage() {
    var room = route.params.sender_id+'_'+route.params.receiver_id;
    //console.log(chatMessage.chatMessage);
    socket.emit('chatMessage', userId, route.params.receiver_id, chatMessage.chatMessage, room, '12-10-2021');
    socket.emit('getMessage', room,userId);
    setChatMessage('');
  }
  async function getProviderProfile() {
    var userToken = await SecureStorage.getItem('user');
    var userToken = userToken.replace('"','');
    userToken = userToken.replace('"','');
     
       const url=`${BASE_URL}/customer/get_garage_detail`;
       const params = JSON.stringify({
        "garage_id":route.params.receiver_id,
      });
       axios.post(url,params,{
         "headers": {
         "content-type": "application/json",
         },
         
         })
         .then((response)=> {

             if (response.data.success == true) {
               console.log(response.data.data);
              setProfileName(response.data.data[0].name);
              setProfileImage(response.data.data[0].profile_image);
             }else{
               console.log(response);
             }
           })
           .catch(function(error) {
         
           console.log(error);
           });
  }
  async function getCustomerProfile() {
    var userToken = await SecureStorage.getItem('user');
    var userToken = userToken.replace('"','');
    userToken = userToken.replace('"','');
     
       const url=`${BASE_URL}/customer/me`;
       axios.get(url,{
         "headers": {
         "content-type": "application/json",
         Authorization: `Bearer ${userToken}`,
         },
         
         })
         .then((response)=> {

             if (response.data.success == true) {
               console.log(response.data.data);
              setProfileData(response.data.data);
             }else{
               console.log(response);
             }
           })
           .catch(function(error) {
         
           console.log(error);
           });
  }
  return (
    <ImageBackground
    style={{ flex: 1, height: windowHeight, width: "100%" }}
    source={require('../assets/notiback.png')}
    resizeMode={'stretch'}>
    <StatusBar backgroundColor='#3F51B5' barStyle="light-content" />
    <View style={styles.header}>
      <TouchableOpacity onPress={navigation.openDrawer}>
        <Image
          source={require('../assets/menu.png')}
          style={{ top: 11, marginLeft: 30 }}
        /></TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}

      >
        <Image
           source={{uri:profile.profile_image}}
          style={{
            width: 40,
            height: 40,
            borderRadius: 65,
            borderColor: "white",
            alignSelf: "flex-end",
            borderWidth: 3,
            marginBottom: 20,
            marginRight: 20
          }}
        />
      </TouchableOpacity>
    </View>
    <View style={styles.middle}>
     


      <View
        style={{
          width: "90%",
          height: "80%",
          backgroundColor: "white",
          borderRadius: 20,
          alignSelf: "center",
        }}
      >
        <View>
          <View
            style={{
              position: "absolute",
              height: 100,
              width: 100,
              flexDirection: "row",
            }}
          >
            <Image
              style={{ height: "100%", width: "100%", top: -35, borderRadius: 60 }}
              source={{uri:profileImage}}
            />
          </View>
          <Text
            style={{
              paddingLeft: 130,
              marginTop: "5%",
              fontSize: 18,
              color: "#3F51B5",
            }}
          >
            {profileName}
          </Text>

        </View>
        <View
          style={{
            width: "90%",
            backgroundColor: "#7A8BE5",
            height: 0.5,
            marginTop: "10%",
          }}
        />
        <ScrollView style={{margin:10 }} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
            <FlatList
                
                data={chatMessages}
                // style={{ flex: 1, margin:"5%"}}

                keyExtractor={(item, index) => {
                  return String(index);
                }}
                renderItem={({ item, index }) => {
                  return (
                    <View>
                    {item.sender_id != userId ?(
              <View style={{
                width: "50%",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#3F51B5",
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity:  0.4,
                shadowRadius: 3,
                elevation: 5,
                padding:10,
                margin:10
              }}>
                <Text style={{fontFamily:"NexaLight",color:"white"}}>{item.message}</Text>
              </View>
              ) : null}
               {item.sender_id === userId ?(
              <View style={{
                width: "50%",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#FFFFFF",
                alignSelf: "flex-end",
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity:  0.4,
                shadowRadius: 3,
                elevation: 5,
                padding:10,
                margin:10
              }}>
                <Text style={{fontFamily:"NexaLight",color:"#576CE4"}}>{item.message}</Text>
                </View>
                ) : null}
              </View>
            );
          }}
        />
    
        </ScrollView>
      </View>

      <View
        style={{
          width: "90%",
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "center",

          borderRadius: 15,
          margin: "2%",
          backgroundColor: "white",
          height: 50,
        }}
      >
       <TextInput
              style={{ width: "80%" }}
              placeholder="Enter text here"
              placeholderTextColor="#CFD7FF"
              value={chatMessage}
              onChangeText={chatMessage => {
                setChatMessage({ chatMessage });
              }}
            />
        <View style={{ height: 20, width: 25, justifyContent: "center" }}>
          <TouchableOpacity onPress={() => submitChatMessage()}>
            <Image
              style={{ height: 20, width: 25, marginTop: 30 }}
              source={require('../assets/right-arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>

    </View>

    {/* <View style={styles.footer}>
      <BottomNavigation />
    </View> */}
  </ImageBackground>
  );
}

export default Messages1;
const styles = StyleSheet.create({
  container1: {

    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 10,
    margin: 10,
    borderRadius: 15,
    width: '45%',

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
    flex: 0.7,
  },
  text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
  },
  middle: {


    flex: 2.9,

  },
  footer: {
    flex: 0.1,
    elevation: 7
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  input: {
    flex: 1,
    color: '#fff',
    fontFamily: 'NexaLight',
    borderColor: '#fff',
    borderWidth: 0.5,
    width: '85%',
    height: 40,
    borderRadius: 25,
    borderColor: '#fff',
    paddingLeft: 30,
    fontSize: 14,
    marginVertical: 1,
  },
  TabBarMainContainer: {
    justifyContent: 'space-around',
    height: 50,
    flexDirection: 'row',
    width: '100%',
    position: "absolute",
    bottom: 0
  },

  button: {

    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  buttonbell: {
    width: "1%",
    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    zIndex: 1
  },
  buttonfile: {


    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,

  },
  button1: {
    borderTopLeftRadius: 15,
    position: "relative",

    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  buttonpurchase: {
    borderTopLeftRadius: 15,
    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
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
    backgroundColor: "white",
    borderRadius: 20,
    flexBasis: '80%',
    borderColor: "#00000029",
    marginHorizontal: 5,
  },
  listContainer: {
    alignItems: 'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 7,
    backgroundColor: "white",
    borderRadius: 20,
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
  cardFooter: {

    paddingTop: 12.5,

    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },

  cardImage: {
    flex: 1,
    height: 120,
    width: null,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullname: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 7,
    fontFamily: 'NexaLight',

    backgroundColor: "white",
    color: 'black',

    borderColor: '#fff',
    borderWidth: 0.5,
    width: "100%",
    height: 60,
    borderRadius: 25,
    borderColor: '#fff',
    paddingLeft: 28,
    fontSize: 20,
    marginVertical: 6,
  },
  mobilecountry: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 7,
    fontFamily: 'NexaLight',
    backgroundColor: "white",
    color: '#fff',
    left: -6,
    borderColor: '#fff',
    borderWidth: 0.5,
    width: '24%',
    height: 60,
    borderRadius: 25,
    borderColor: '#fff',
    paddingLeft: 20,
    fontSize: 18,
    marginVertical: 6,
  },
  mobile: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 7,
    fontFamily: 'NexaLight',

    backgroundColor: "white",
    color: '#fff',

    borderColor: '#fff',
    borderWidth: 0.5,
    width: '76%',
    height: 60,
    borderRadius: 25,
    borderColor: '#fff',
    paddingLeft: 28,
    fontSize: 18,
    marginVertical: 6,
  },
  chatContainer: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});