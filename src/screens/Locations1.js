import React, { useState, useEffect, Component } from 'react';
import { StyleSheet,Alert, ImageBackground, View, FlatList, Text, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native';

import axios from 'axios';
import { HeaderIconButton } from '../components/HeaderIconButton';
import { AuthContext } from '../contexts/AuthContext';
import { Product } from '../components/Product';
import { FilledButton } from '../components/FilledButton';
import { HeaderIconsContainer } from '../components/HeaderIconsContainer';
import { ThemeContext } from '../contexts/ThemeContext';
import SecureStorage from 'react-native-secure-storage';
import Stars from 'react-native-stars';
import { Avatar, RadioButton } from 'react-native-paper';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAuth } from '../hooks/useAuth';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import { Loading } from '../components/Loading';
import { BASE_URL } from '../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Spinner from 'react-native-loading-spinner-overlay';
export default class Locations1 extends Component {

  static navigationOptions = {
    // Sets the title of the Header
    title: 'Home',
  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      lat: "",
      lng: "",
      addressArr: [],
      offersArr: [],
      photoURL:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
      userId: "",
      spinner: false,

    }

  }
  async componentDidMount() {
    this.setState({ userId: await SecureStorage.getItem("user"), userNewId: await SecureStorage.getItem("userNewId") }, () => {
      this.getProfile();
    });
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      this.getProfile(); // this block will call when user come back
    });
  }

  getProfile() {
    this.setState({ spinner: true })
    const url = `${BASE_URL}/customer/me`;
    var token = this.state.userId.replace('"', '');
    token = token.replace('"', '');
    axios
      .get(url, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({ spinner: false })
        if (response.data.success == true) {
          this.setState({
            firstname: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            photoURL: response.data.data.profile_image,
          });
          this.getAddressList();
        } else {

          console.log(response);
        }
      })
      .catch(function (error) {
        this.setState({ spinner: false })
      });
  }
  getAddressList() {
    var userNewId = this.state.userNewId.replace('"', '');
    userNewId = userNewId.replace('"', '');
    const url_new = `${BASE_URL}/customer/get_address_list`;
    const params = { "customer_id": userNewId }
    // console.log(params);
    axios.post(url_new, params, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        this.setState({ addressArr: response.data.data });

      })

      .catch(function (error) {
        this.setState({ spinner: false })
        //console.log(error);
      });
  }
  deleteAddress(address_id=""){
      
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete this address ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.deleteAddressSubmit(address_id)},
      ],
      {cancelable: false},
    );
  }
  deleteAddressSubmit(address_id="") {
    var userNewId = this.state.userNewId.replace('"', '');
    userNewId = userNewId.replace('"', '');
    const url_new = `${BASE_URL}/customer/delete_address`;
    const params = { "address_id": address_id }
    // console.log(params);
    axios.post(url_new, params, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        this.getAddressList();

      })

      .catch(function (error) {
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    const windowHeight = Dimensions.get('window').height;
    return (
      <ImageBackground
        style={{ flex: 1, height: windowHeight, width: "100%" }}
        source={require('../assets/locations.png')}
        resizeMode={'stretch'}>
        <StatusBar backgroundColor='#3F51B5' barStyle="light-content" />
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={this.props.navigation.openDrawer}>
            <Image
              source={require('../assets/menu.png')}
              style={{ top: 11, marginLeft: 30 }}
            /></TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Profile")}

          >
            <Image
              source={{ uri: this.state.photoURL }}
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
          <Image
            source={require('../assets/locationscircle.png')}

            style={{
              top: -90,
              alignSelf: "center", height: 100, width: 100, borderRadius: 60
            }}
          />
          <Text style={{ marginTop: -100, alignSelf: "center", color: "white", fontSize: 25, fontFamily: "NexaBold" }}>Location</Text>
          <ScrollView style={{marginBottom:50}}>
          <FlatList
              contentContainerStyle={styles.listContainer}
              data={this.state.addressArr}
              horizontal={false}
              
              keyExtractor={(item) => {
                return item.id;
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={(post) => {
                const item = post.item;
               console.log("Fsdfsdfsdfsdfs",item);
                return (
          <View
            style={{ margin: 10, borderRadius: 20, backgroundColor: "white" }}
          >
            <Image
              source={require('../assets/homeloc.png')}

              style={{
               
                alignSelf: "center", height: 100, width: 100, borderRadius: 60
              }}
            />
            <Text style={{  alignSelf: "center", color: "#3F51B5", fontFamily: "NexaBold", fontSize: 18, margin: 10 }}>Home Location</Text>
            <View style={{borderColor: "#E9E5E5", borderWidth: 1, height: 50, marginLeft: 20, marginRight: 20 }}>
              <Text style={{ color: "black", fontFamily: "NexaLight", fontSize: 13, margin: 10 }}>{item.address_line}</Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  padding: 20,
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 3,
                  elevation: 5,
                  marginVertical: 7,
                  height: 10,
                  marginTop: 10,
                  margin: 10,
                  borderRadius: 15,
                  width: '45%'
                }}
                onPress={() => {
                  navigate('Locations2',{address_id:item._id});
                }}>
                <View style={{ flexDirection: "row" }}>

                  <Text style={{ alignSelf: "center", color: '#3F51B5', fontFamily: "NexaBold", fontSize: 11 }}>EDIT LOCATION</Text>
                </View>

              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center',
                  padding: 20,
                  height: 10,
                  marginTop: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.4,
                  shadowRadius: 3,
                  elevation: 5,
                  marginVertical: 7,
                  borderRadius: 15,
                  width: '45%'
                }}
                onPress={() => {
                  this.deleteAddress(item._id);
                }}>
                <Text style={{ alignSelf: "center", color: '#3F51B5', fontFamily: "NexaBold", fontSize: 11 }}>DELETE LOCATION</Text>
              </TouchableOpacity>
            </View>

          </View>
  );
}}
/>
<TouchableOpacity
            style={{backgroundColor: '#3F51B5',alignItems: 'center',
            justifyContent: 'center',
            padding: 23,
            height:10,
            marginTop:20,
            borderRadius: 20,
            marginBottom:15,
            width:'70%',alignSelf:"center"}}
            onPress={() => {
              navigate('Locations');
            }}>
            <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 18}}>Add New Address</Text>
          </TouchableOpacity>
</ScrollView>
        </View>

        <View style={styles.footer}>
          <BottomNavigation />
        </View>
      </ImageBackground>
    )
  }
}
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

    fontFamily: 'NexaLight',

    backgroundColor: "white",
    color: 'black',
    marginRight: 10,
    borderColor: '#fff',
    borderWidth: 0.5,
    width: "50%",
    padding: 4,
    borderRadius: 10,
    borderColor: '#fff',
    paddingLeft: 18,
    fontSize: 13,
    marginVertical: 6,
  },
  address: {

    fontFamily: 'NexaLight',

    backgroundColor: "white",
    color: 'black',

    borderColor: '#fff',
    borderWidth: 0.5,
    width: "100%",
    padding: 4,
    borderRadius: 10,
    borderColor: '#fff',
    paddingLeft: 18,
    fontSize: 13,
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
  spinnerTextStyle: {
    color: '#FFF'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});