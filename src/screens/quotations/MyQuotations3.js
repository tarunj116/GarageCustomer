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
export default class MyQuotations3 extends Component {
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
      ProArr: [],
      garage_detail_arr: [],
      quote_detail_all: [],
      button_status:1,
      mycard:"first",
      total_price:0,
      Spinner:false,
      statusValue:"",
      userNewId:"",
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
    this.setState({ spinner: true });
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
        this.setState({ spinner: false });
        //console.log(response);
        if (response.data.success == true) {
          this.setState({
            firstname: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            photoURL: response.data.data.profile_image,
          });
          this.getQuotations();
        } else {
          this.setState({ spinner: false });
          console.log(response);
        }
      })

      .catch(function (error) {
        this.setState({ spinner: false });
        console.log(error);
      });


  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };
  getQuotations() {
    
    this.setState({ button_status: 1 });
     console.log(this.props.route.params.order_id);
    var userNewId = this.state.userNewId.replace('"', '');
    userNewId = userNewId.replace('"', '');
    const url = `${BASE_URL}/provider/get_quatation_detail`;
    const params = { "order_id": this.props.route.params.order_id }
    axios
      .post(url, params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          var statusValue="";
          if(response.data.data[0].status == 1){
            statusValue='Pending'; 
          } 
          if(response.data.data[0].status == 2){
            statusValue='Accepted'; 
          }
          if(response.data.data[0].status == 3){
            statusValue='Rejected'; 
          }
          if(response.data.data[0].status == 4){
            statusValue='Purchased'; 
          }
          this.setState({ statusValue: statusValue });
          // if(response.data.data > 0){
          this.setState({ quote_detail_all: response.data.data[0].data });
          if(response.data.data[0].status == 4){
            this.setState({ button_status: response.data.data[0].status });
          }
          console.log(response.data.data[0].status);
          if(response.data.data[0].status == 1){
            this.setState({ button_status: 5 });
          }
     
          var total_price = 0;
          response.data.data[0].data.forEach((element) => { 
            console.log(element);
            element.productdetails.forEach((element) => { 
              total_price = total_price + element.product_detail.price;
            });
          
          });
          this.setState({ total_price: total_price });
          this.setState({ ProArr: response.data.data[0].data[0].productdetails[0] });
          this.setState({ garage_detail_arr: response.data.data[0].data[0].productdetails[0].garage_detail });
          // }
          // navigate('home');
        } else {
          alert("Something Went Wrong !");
        }
        // console.log(response.data);

      })

      .catch(function (error) {
        console.log(error);
      });
  }
  submitOrder() {
    const { navigate } = this.props.navigation;
      const url = `${BASE_URL}/customer/buy_quatation`;
      var userNewId = this.state.userNewId.replace('"','');
      userNewId = userNewId.replace('"','');
      const params ={
        "order_id": this.props.route.params.order_id,
        }
      console.log(params);
    
     axios
       .post(url,params, {
         headers: {
           "content-type": "application/json",
         },
       })
       .then((response)=> {
         console.log(response.data);
         if(response.data.success == true){
          alert("Order buy successfully");
         navigate('MyQuotations')
         }else{
           alert("Something Went Wrong !");
         }
        // console.log(response.data);
        
       })
   
       .catch(function(error) {
         console.log(error);
       });
    console.log(this.state.phone);
}
  render() {
    const { navigate } = this.props.navigation;
    var userNewId = this.state.userNewId.replace('"','');
    userNewId = userNewId.replace('"','');

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
              QUOTE DETAILS</Text>

            </View>

          </View>
          <View style={{ backgroundColor: "#CFD7FF" }}>
            <View style={{ backgroundColor: "white", borderTopRightRadius: 50 }}>


              <View>

                <TouchableOpacity onPress={() => { navigate('MyQuotations3'); }} style={{ flexDirection: "row", alignItems: "center", margin: 10, borderRadius: 10, backgroundColor: "#FFFFFF" }}>
                  <TouchableOpacity><Image
                    source={{ uri: this.state.garage_detail_arr.profile_image }}
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
                    <Text style={{ color: "#3F51B5", fontSize: 15, fontFamily: "NexaLight" }}>{this.state.garage_detail_arr.garage_name}</Text>
                    <Text style={{ color: "#3F51B5", fontSize: 15, fontFamily: "NexaLight" }}>{`Sent: `}<Text style={{ color: "#636363", fontSize: 12, fontFamily: "NexaBold" }}> {moment(this.state.ProArr.createdAt).format('DD-MM-YYYY')}</Text></Text>
                    <Text style={{ color: "#3F51B5", fontSize: 12, fontFamily: "NexaLight" }}>{`Status: `}<Text style={{ color: "#3F51B5", fontSize: 12, fontFamily: "NexaBold" }}>{this.state.statusValue}</Text></Text>

                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    borderBottomColor: '#3F51B5',
                    borderBottomWidth: 1.5,
                    marginTop: 10,
                    marginBottom: 10,

                  }}
                />
                <View><Text style={{ color: "#3F51B5", fontSize: 18, fontFamily: "NexaLight", marginBottom: 20 }}>Quote Summary:</Text>


                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: "#3F51B5", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>Name:</Text>
                    <Text style={{ marginLeft: 70, color: "#636363", fontSize: 14, fontFamily: "NexaBold", marginBottom: 10 }}>{this.state.firstname}</Text>
                  </View>
                  <FlatList
                    data={this.state.quote_detail_all}
                    // style={{ flex: 1, margin:"5%"}}

                    keyExtractor={(item, index) => {
                      return String(index);
                    }}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={{ color: "#3F51B5", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>Services:</Text>
                          <View style={{ marginLeft: 50 }}>
                            <Text style={{ color: "#3F51B5", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>{item.categoryname}</Text>
                            <FlatList
                              data={item.productdetails}
                              // style={{ flex: 1, margin:"5%"}}

                              keyExtractor={(item, index) => {
                                return String(index);
                              }}
                              renderItem={({ item, index }) => {
                                return (
                                  <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: "#3F51B5", fontSize: 12, fontFamily: "NexaLight", marginBottom: 10 }}>{item.product_detail.name}</Text>
                                    <Text style={{ marginLeft: 20, color: "#636363", fontSize: 12, fontFamily: "NexaBold", marginBottom: 10 }}>AED {item.product_detail.price}</Text>
                                  </View>
                                )
                              }}
                            />
                          </View>

                        </View>
                      )
                    }}
                  />
                  <View
                    style={{
                      borderBottomColor: '#3F51B5',
                      borderBottomWidth: 1.5,
                      marginTop: 10,
                      marginBottom: 10,

                    }}
                  />

                </View>

                <Text style={{ color: "#3F51B5", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>Problem Description:</Text>
                <View style={{ flexDirection: "row" }}><Text style={{ color: "#CFD7FF", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>

                </View>
                <View
                  style={{
                    borderBottomColor: '#3F51B5',
                    borderBottomWidth: 1.5,
                    marginTop: 10,
                    marginBottom: 10,

                  }}
                />
                <Text style={{ color: "#3F51B5", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>Special needs:</Text>
                <View style={{ flexDirection: "row" }}><Text style={{ color: "#CFD7FF", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</Text>

                </View>
                <View
                  style={{
                    borderBottomColor: '#3F51B5',
                    borderBottomWidth: 1.5,
                    marginTop: 10,
                    marginBottom: 10,

                  }}
                />
                <View style={{ top: 1, borderRadius: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: "#3F51B5", fontFamily: "NexaLight", marginBottom: 10 }}>Photos and videos:</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity><Image
                      source={require('../../assets/offers1.png')}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 15,
                        borderColor: "#CFD7FF",
                        borderWidth: 2,


                      }}
                    /></TouchableOpacity>
                    <TouchableOpacity><Image
                      source={require('../../assets/offers1.png')}
                      style={{
                        width: 60,
                        height: 60,
                        marginLeft: 5,
                        borderRadius: 15,
                        borderColor: "#CFD7FF",
                        borderWidth: 2,
                        marginBottom: 10

                      }}
                    /></TouchableOpacity>
                    <TouchableOpacity><Image
                      source={require('../../assets/offers1.png')}
                      style={{
                        width: 60,
                        height: 60,
                        marginLeft: 5,
                        borderRadius: 15,
                        borderColor: "#CFD7FF",
                        borderWidth: 2,
                        marginBottom: 10

                      }}
                    /></TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#3F51B5',
                      borderBottomWidth: 1.5,
                      marginTop: 10,
                      marginBottom: 10,

                    }}
                  />
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: "#3F51B5", fontFamily: "NexaLight", marginBottom: 10 }}>License and documents:</Text>
                  </View>
                  <View style={{ flexDirection: 'row', }}>

                    <TouchableOpacity><Image
                      source={require('../../assets/offers1.png')}
                      style={{
                        width: 80,
                        height: 60,
                        borderRadius: 15,
                        borderColor: "#CFD7FF",
                        borderWidth: 2,


                      }}
                    /></TouchableOpacity>
                    <TouchableOpacity><Image
                      source={require('../../assets/offers1.png')}
                      style={{
                        width: 80,
                        height: 60,
                        marginLeft: 5,
                        borderRadius: 15,
                        borderColor: "#CFD7FF",
                        borderWidth: 2,


                      }}
                    /></TouchableOpacity>
                    <TouchableOpacity><Image
                      source={require('../../assets/offers1.png')}
                      style={{
                        width: 80,
                        height: 60,
                        marginLeft: 5,
                        borderRadius: 15,
                        borderColor: "#CFD7FF",
                        borderWidth: 2,


                      }}
                    /></TouchableOpacity>

                  </View>

                </View>
                <View
                  style={{
                    borderBottomColor: '#3F51B5',
                    borderBottomWidth: 1.5,
                    marginTop: 10,
                    marginBottom: 10,

                  }}
                />
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#3F51B5", fontFamily: "NexaLight", marginBottom: 10 }}>Discounts / Coupons:</Text>
                  <Text style={{ marginLeft: 30, color: "#636363", fontFamily: "NexaBold", marginBottom: 10 }}>5% OFF</Text>
                  <Text style={{ marginLeft: 30, color: "#636363", fontFamily: "NexaBold", marginBottom: 10 }}>CODE5PRCNT</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#3F51B5", fontFamily: "NexaLight", marginBottom: 10 }}>Loyalty Points:</Text>
                  <Text style={{ marginLeft: 30, color: "#636363", fontFamily: "NexaBold", marginBottom: 10 }}>+ 2 Points</Text>
                  <Text style={{ marginLeft: 30, color: "#636363", fontFamily: "NexaBold", marginBottom: 10 }}>Total: 52 Points</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: '#3F51B5',
                    borderBottomWidth: 1.5,
                    marginTop: 10,
                    marginBottom: 10,

                  }}
                />
                <View style={{ flexDirection: "row" }}><Text style={{ color: "#3F51B5", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>Sub Total:</Text>
                  <Text style={{ marginLeft: 165, color: "#3F51B5", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>AED {this.state.total_price}</Text>
                </View>
                <View style={{ flexDirection: "row" }}><Text style={{ color: "#3F51B5", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>Discounts:</Text>
                  <Text style={{ marginLeft: 150, color: "#3F51B5", fontSize: 14, fontFamily: "NexaLight", marginBottom: 10 }}>- AED 00.00</Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 10 }}><Text style={{ color: "#3F51B5", fontSize: 20, fontFamily: "NexaLight", marginBottom: 10 }}>TOTAL</Text>
                  <Text style={{ marginLeft: 110, color: "#3F51B5", fontSize: 20, fontFamily: "NexaLight", marginBottom: 10 }}>AED {this.state.total_price}</Text>
                </View>
                <View
                  style={{
                    borderBottomColor: '#3F51B5',
                    borderBottomWidth: 1.5,
                    marginTop: 10,
                    marginBottom: 10,

                  }}
                />
               
                 {this.state.button_status == 1 ?(
                <TouchableOpacity
                  style={{
                    backgroundColor: '#3F51B5', alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    height: 10,
                    borderRadius: 10,
                    marginBottom: 15,
                    width: '60%', alignSelf: "center"
                  }}
                  onPress={() => this.onChange('button_status',2)}>
                  <Text style={{ color: '#FFFFFF', fontFamily: "NexaBold", fontSize: 17 }}>BUY</Text>
                </TouchableOpacity>
                 ) : null}
                 {this.state.button_status == 2 ?(
                <TouchableOpacity
                  style={{
                    backgroundColor: '#3F51B5', alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    height: 10,
                    borderRadius: 10,
                    marginBottom: 15,
                    width: '80%', alignSelf: "center"
                  }}
                  onPress={() => this.onChange('button_status',3)}>
                  <Text style={{ color: '#FFFFFF', fontFamily: "NexaBold", fontSize: 17 }}>Proceed to Payment</Text>
                </TouchableOpacity>
                ) : null}
                 {this.state.button_status == 3 ?(
                   <View>
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
<RadioButton.Group onValueChange={newValue => this.onChange('mycard',newValue)} value={this.state.mycard}>
      <View style={{flexDirection:"row",backgroundColor:"#CFD7FF",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="first" />
        <Text style={{marginLeft:10,marginTop:6,fontSize:15,fontFamily:"NexaLight",color:"#636363"}}>My saved card 1</Text>
      </View>
      <View style={{marginTop:10,flexDirection:"row",backgroundColor:"#F1F1F1",borderRadius:20,padding:10}}>
        
        <RadioButton color={'#3F51B5'} value="second" />
        <Text style={{marginLeft:10,marginTop:6,fontSize:15,fontFamily:"NexaLight",color:"#636363"}}>Office Debit</Text>
      </View>
   
    </RadioButton.Group>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#3F51B5', alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    height: 10,
                    borderRadius: 10,
                    marginTop:10,
                    marginBottom: 15,
                    width: '80%', alignSelf: "center"
                  }}
                  onPress={() => this.submitOrder()}>
                  <Text style={{ color: '#FFFFFF', fontFamily: "NexaBold", fontSize: 17 }}>Confirm Payment</Text>
                </TouchableOpacity>
                </View>
) : null}
 {this.state.button_status == 4 ?(
   <View>
<TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      borderRadius: 10,
      marginBottom:15,
      width:'80%',alignSelf:"center"}}
      >
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 20}}>Download Warranty</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{backgroundColor: '#3F51B5',alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      height:10,
      borderRadius: 10,
      marginBottom:15,
      width:'80%',alignSelf:"center"}}
      >
      <Text style={{ color: '#FFFFFF',fontFamily:"NexaBold",fontSize: 20}}>Download Document</Text>
    </TouchableOpacity>
    </View>
    ) : null}
              </View>

            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={{backgroundColor:"#3F51B5",bottom:"15%", 
    height: 60, 
    flexDirection: 'row',
    width: '15%',
    alignSelf:"flex-end",
    position:"absolute",borderRadius:30,padding:10}} onPress={() => {this.props.navigation.navigate('Messages1',{sender_id:userNewId,receiver_id:this.state.garage_detail_arr._id});}}>
      <View style={{flexDirection:"row"}}>
       
    
                <Image
                  style={{ height: 40, width: 40 }}
                  source={require('../../assets/messageIcon.png')}
                />
             
      
                </View>
                </TouchableOpacity>
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
