import React, { useState, useEffect, Component } from "react";
import { FlatList, ToastAndroid, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions, TextInput, Picker, StatusBar, Button } from 'react-native';

import Modal from 'react-native-modal';
import axios from "axios";
import { HeaderIconButton } from "../../components/HeaderIconButton";
import { AuthContext } from "../../contexts/AuthContext";
import { Product } from "../../components/Product";
import { useGet } from "../../hooks/useGet";
import { HeaderIconsContainer } from "../../components/HeaderIconsContainer";
import { ThemeContext } from "../../contexts/ThemeContext";
import { BottomNavigation } from "../../components/BottomNavigation";
import SecureStorage from "react-native-secure-storage";
import Stars from "react-native-stars";
import { BASE_URL } from "../../config";
import { useAuth } from "../../hooks/useAuth";
import GetLocation from 'react-native-get-location';
import Spinner from 'react-native-loading-spinner-overlay';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import ImagePicker from "react-native-image-picker";
import { CheckBox, Slider } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Avatar, RadioButton } from 'react-native-paper';
import moment from "moment";
export default class MyQuotations extends Component {
  static navigationOptions = {
    // Sets the title of the Header
    title: "Home",
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
      isModalVisible: false,
      isModalFirstVisible: false,
      photoURL:
        "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
      quoteViewColor: "#F1F1F1",
      quoteTextColor: "#FFFFFF",
      purViewColor: "#576CE4",
      purTextColor: "#CFD7FF",
      quotationArr: [],
      Spinner:false,
    };
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
   
    const url = `${BASE_URL}/customer/me`;
    var token = this.state.userId.replace('"', '');
    token = token.replace('"', '');
    axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.success == true) {
          this.setState({
            firstname: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            photoURL: response.data.data.profile_image,
          });
          this.getQuotations('myquotes');
          this.onTabClick("myquotes");
        } else {
          this.setState({ spinner: false });
          console.log(response);
        }
      })

      .catch(function (error) {
        console.log(error);
      });


  }
  onTabClick = (id) => {

    if (id === 'myquotes') {
      this.setState({ purViewColor: "#576CE4" });
      this.setState({ purTextColor: "#CFD7FF" });
      this.setState({ quoteViewColor: "#F1F1F1" });
      this.setState({ quoteTextColor: "#FFFFFF" });
      this.getQuotations('myquotes');
    }
    if (id === 'purchased') {
      this.setState({ quoteViewColor: "#576CE4" });
      this.setState({ quoteTextColor: "#CFD7FF" });
      this.setState({ purViewColor: "#F1F1F1" });
      this.setState({ purTextColor: "#FFFFFF" });
      this.getQuotations('purchased');
    }

  }

  getQuotations(Status) {
    this.setState({ spinner: true });
    var userNewId = this.state.userNewId.replace('"', '');
    userNewId = userNewId.replace('"', '');
    console.log(userNewId);
    const url = `${BASE_URL}/customer/get_customer_quatation`;
    const params = {
      "customer_id": userNewId,
    }
    axios
      .post(url, params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        this.setState({ spinner: false });
        console.log(response.data);
        if (response.data.success == true) {
          //console.log(response.data.data[0].data[0]);

          let usersData = [];
          var statusValue="";
          response.data.data.forEach((element) => {
            
            if(element.status == 1){
              statusValue='Pending'; 
            } 
            if(element.status == 2){
              statusValue='Accepted'; 
            }
            if(element.status == 3){
              statusValue='Rejected'; 
            }
            if(element.status == 4){
              statusValue='Purchased'; 
            }
            if (Status == "myquotes") {
              if (element.status != 4) {
                usersData.push({
                  _id: element._id,
                  profile_image: element.garage_detail.profile_image,
                  garage_name: element.garage_detail.garage_name,
                  createdAt: element.order_date,
                  statusValue:statusValue
                });
              }
            } else {
              if (element.status == 4) {
                usersData.push({
                  _id: element._id,
                  profile_image: element.garage_detail.profile_image,
                  garage_name: element.garage_detail.garage_name,
                  createdAt: element.order_date,
                  statusValue:statusValue
                });
              }
            }
          });
          this.setState({ quotationArr: usersData });
          // navigate('home');
        } else {
          alert("Something Went Wrong !");
        }
        // console.log(response.data);

      })

      .catch(function (error) {
        this.setState({ spinner: false });
        console.log(error);
      });
  }
  render() {
    const { navigate } = this.props.navigation;


    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#3F51B5' barStyle="light-content" />
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={styles.header}>
          <View style={{ flexDirection: "row", marginTop: "1%" }}>
            <TouchableOpacity onPress={this.props.navigation.openDrawer}>
              <Image
                source={require("../../assets/menu.png")}
                style={{ top: 11, marginLeft: "20%" }}
              />
            </TouchableOpacity>
            <View style={{ width: 200 }}>
              <Text
                style={{
                  color: "white",
                  top: 10,
                  fontSize: 18,
                  textAlign: "right",
                  fontFamily: "NexaBold",
                }}
              >
                {this.state.firstname}
              </Text>

            </View>
            <TouchableOpacity
              onPress={() => navigate("Profile")}
              style={{ marginLeft: 10 }}
            >
              <Image
                source={{ uri: this.state.photoURL }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 65,
                  borderColor: "white",
                  borderWidth: 3,
                  marginBottom: 20,

                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              color: '#fff',
              backgroundColor: 'white',
              borderColor: '#fff',
              width: '85%',
              alignSelf: "center",
              borderRadius: 10,
              fontSize: 18,
              marginVertical: 6,
              flexDirection: 'row',
            }}>
            <View style={{ height: 20, width: 20, top: 10, left: 10 }}>
              <TouchableOpacity>
                <Image
                  style={{ height: '100%', width: '100%' }}
                  source={require('../../assets/loupe.png')}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Search Here"
              placeholderTextColor="#D6D6D6"
            />
            <View style={{ height: 30, width: 30, top: 5, right: 10 }}>
              <TouchableOpacity onPress={() => navigate('Filter')}>
                <Image
                  style={{ height: '100%', width: '100%' }}
                  source={require('../../assets/filter.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView style={styles.middle}>
          <View style={{ backgroundColor: "white" }}>
            <View style={{ backgroundColor: "#CFD7FF", borderTopLeftRadius: 50, borderTopRightRadius: 50, borderBottomLeftRadius: 50, alignItems: "center" }}><Text style={{ marginTop: "8%", color: "#3F51B5", fontSize: 19, fontFamily: "NexaLight" }}>
              QUOTATIONS</Text>

            </View>

          </View>
          <View style={{ backgroundColor: "#CFD7FF" }}>
            <View style={{ backgroundColor: "white", borderTopRightRadius: 50 }}>


              <View>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                  <TouchableOpacity
                    style={[styles.container1, { backgroundColor: this.state.purViewColor, marginTop: "2%" }]}
                    onPress={() => this.onTabClick("myquotes")}>
                    <Text style={{ color: this.state.purTextColor, fontFamily: "NexaLight", fontSize: 17 }}>MY QUOTES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.container1, { backgroundColor: this.state.quoteViewColor, marginTop: "2%", left: 2 }]}
                    onPress={() => this.onTabClick("purchased")}>
                    <Text style={{ color: this.state.quoteTextColor, fontFamily: "NexaLight", fontSize: 17 }}>PURCHASED</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={this.state.quotationArr}
                  // style={{ flex: 1, margin:"5%"}}

                  keyExtractor={(item, index) => {
                    return String(index);
                  }}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => { navigate('MyQuotations3', { order_id: item._id }) }} style={{
                        flexDirection: "row", alignItems: "center", margin: 10, borderRadius: 10, backgroundColor: "#FFFFFF", shadowColor: '#000',
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity: 0.4,
                        shadowRadius: 3,
                        elevation: 5,
                        marginVertical: 7
                      }}>
                        <TouchableOpacity><Image
                          source={{ uri: item.profile_image }}
                          style={{
                            width: 130,
                            height: 90,
                            marginLeft: 3,
                            borderRadius: 15,
                            borderColor: "#CFD7FF",
                            borderWidth: 2,


                          }}
                        /></TouchableOpacity>
                        <View style={{ margin: 20 }}>
                          <Text style={{ color: "#3F51B5", fontSize: 15, fontFamily: "NexaLight" }}>{item.garage_name}</Text>
                          <Text style={{ color: "#3F51B5", fontSize: 15, fontFamily: "NexaLight" }}>{`Sent: `}<Text style={{ color: "#636363", fontSize: 12, fontFamily: "NexaBold" }}>
                            {moment(item.createdAt).format('DD-MM-YYYY')}
                          </Text></Text>
                          <Text style={{ color: "#3F51B5", fontSize: 12, fontFamily: "NexaLight" }}>{`Status: `}<Text style={{ color: "#F44336", fontSize: 12, fontFamily: "NexaBold" }}>{item.statusValue}</Text></Text>

                        </View>

                      </TouchableOpacity>);
                  }}
                />



              </View>

            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.TabBarMainContainer} >

            <TouchableOpacity onPress={() => navigate('MyCart')} activeOpacity={0.6} style={styles.button} >

              <Image
                style={{ height: 24, width: 24 }}
                source={require('../../assets/cart.png')}
              />

            </TouchableOpacity>



            <TouchableOpacity onPress={() => navigate('Notifications')} activeOpacity={0.6} style={styles.buttonbell} >

              <Image
                style={{ height: 24, width: 24 }}
                source={require('../../assets/bell.png')}
              />

            </TouchableOpacity>



            <TouchableOpacity onPress={() => navigate('home')} activeOpacity={0.6} style={styles.button1} >

              <Image
                style={{ height: 24, width: 24 }}
                source={require('../../assets/home2.png')}
              />

            </TouchableOpacity>



            <TouchableOpacity onPress={() => navigate('MyQuotations')} activeOpacity={0.6} style={styles.buttonfile} >

              <Image
                style={{ height: 70, width: 70, bottom: 20 }}
                source={require('../../assets/quote.png')}
              />


            </TouchableOpacity>


            <TouchableOpacity onPress={() => navigate('MyPurchases')} activeOpacity={0.6} style={styles.buttonpurchase} >
              <Image
                style={{ height: 24, width: 24 }}
                source={require('../../assets/shopping.png')}
              />

            </TouchableOpacity>

          </View>

        </View>
      </View>
    );
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
    height: 120,
    backgroundColor: '#3F51B5', borderBottomLeftRadius: 40, borderBottomRightRadius: 40
  },
  text_header: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30
  },
  middle: {

    margin: 20,
    flex: 2.4,

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

    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  buttonfile: {
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
  button1: {

    position: "relative",
    borderTopRightRadius: 15,
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
    color: '#fff',

    borderColor: '#fff',
    borderWidth: 0.5,
    width: "60%",
    height: 40,
    borderRadius: 25,
    borderColor: '#fff',
    paddingLeft: 28,
    fontSize: 14,
    marginVertical: 6,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});