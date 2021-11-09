import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import axios from "axios";
import { HeaderIconButton } from "../components/HeaderIconButton";
import { AuthContext } from "../contexts/AuthContext";
import { Product } from "../components/Product";
import { FilledButton } from "../components/FilledButton";
import { HeaderIconsContainer } from "../components/HeaderIconsContainer";
import { ThemeContext } from "../contexts/ThemeContext";
import SecureStorage from "react-native-secure-storage";
import Stars from "react-native-stars";
import { Avatar, RadioButton } from "react-native-paper";
import { BottomNavigation } from "../components/BottomNavigation";
import { useAuth } from "../hooks/useAuth";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Loading } from "../components/Loading";
import { BASE_URL } from "../config";
import Spinner from "react-native-loading-spinner-overlay";
export default class RegistrationScreen extends Component {
  // state = {
  //   spinner: false,
  // };
  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({
  //       spinner: !this.state.spinner
  //     });
  //   }, 3000);
  // }
  static navigationOptions = {
    // Sets the title of the Header
    title: "Home",
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
      location: "",
      lat: "",
      long: "",
      term_condition: "",
      country_code: "",
    };
  }

  registerUser() {
    const { navigate } = this.props.navigation;

    const urlReg = `${BASE_URL}/customer/register`;
    const phones = this.state.phone;
    if (this.state.name == "") {
      ToastAndroid.show(
        "Please enter Full Name",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return false;
    }
    if (this.state.phone == "") {
      ToastAndroid.show(
        "Please enter Mobile Number",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return false;
    }
    if (this.state.country_code == "") {
      ToastAndroid.show(
        "Please enter Country Code",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return false;
    }
    if (this.state.email == "") {
      ToastAndroid.show(
        "Please enter Email",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return false;
    }
    if (this.state.password == "") {
      ToastAndroid.show(
        "Please enter Password",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return false;
    }
    if (this.state.cpassword == "") {
      ToastAndroid.show(
        "Please enter Confirm Password",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return false;
    }
    if (this.state.password != this.state.cpassword) {
      ToastAndroid.show(
        "New Password and Confirm Password must be same",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return false;
    }
    // this.setState({
    //   spinner: true,
    // });
    const paramsRegister = JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      location: this.state.location,
      lat: "24.45354",
      long: "76.43434",
      term_condition: "1",
      country_code: this.state.country_code,
    });
    console.log(paramsRegister);

    axios
      .post(urlReg, paramsRegister, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function(response) {
        console.log(response);
        if (response.data.success == true) {
          // this.setState({
          //   spinner: false,
          // });
          ToastAndroid.show(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigate("OtpScreen", phones);
          //onPress={() =>  navigate("OtpScreen",'test')}
        } else {
          alert(response);
        }
      })

      .catch(function(error) {
        // this.setState({
        //   spinner: false,
        // });
        //  alert(error.response.data.error)
        //   ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT,ToastAndroid.CENTER);
        alert(error.response.data.error);

        //navigate("OtpScreen",phones);
      });
  }
  render() {
    var locations = "";
    if (typeof this.props.route.params !== "undefined") {
      locations = this.props.route.params.text;
      //this.setState({ location: this.props.route.params.text });
    }
    // console.log(this.props.route.params.text);
    //this.state.location=this.props.route.params.text;

    //
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={{ width: "100%" }}>
        <View style={{ height: windowHeight, backgroundColor: "#3F51B5" }}>
          {/* <Spinner
            visible={this.state.spinner}
            textContent={"Loading..."}
            textStyle={styles.spinnerTextStyle}
          /> */}
          <View
            style={{
              height: "14%",
              backgroundColor: "#CFD7FF",
              borderBottomLeftRadius: 50,
            }}
          />
          <View style={{ backgroundColor: "#CFD7FF" }}>
            <View
              style={{
                backgroundColor: "#3F51B5",
                borderTopRightRadius: 50,
                alignItems: "center",
                position: "relative",
              }}
            >
              <Text
                style={{
                  top: 10,
                  fontSize: 40,
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: "NexaBold",
                }}
              >
                SIGN UP
              </Text>
              <Text
                style={{
                  left: -21,
                  fontSize: 24,
                  marginTop: "10%",
                  marginBottom: "7%",
                  fontWeight: "bold",
                  fontFamily: "NexaBold",
                  color: "white",
                }}
              >
                PERSONAL DETAILS
              </Text>
              <TextInput
                style={styles.input}
                placeholder={"Full Name"}
                placeholderTextColor="#CFD7FF"
                onChangeText={(text) => {
                  this.setState({ name: text });
                }}
              />

              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={styles.mobilecountry}
                  placeholder={"+971"}
                  placeholderTextColor="#CFD7FF"
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({ country_code: text });
                  }}
                />
                <TextInput
                  style={styles.mobile}
                  placeholder={"Mobile Number"}
                  placeholderTextColor="#CFD7FF"
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({ phone: text });
                  }}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder={"Email Address"}
                placeholderTextColor="#CFD7FF"
                onChangeText={(text) => {
                  this.setState({ email: text });
                }}
              />

              <TextInput
                style={styles.input}
                placeholder={"Location"}
                placeholderTextColor="#CFD7FF"
                onTouchStart={() =>
                  navigate("getLocation", { text: locations })
                }
                value={locations}
              />

              <Text
                style={{
                  left: -53,
                  fontSize: 21,
                  marginTop: "6%",
                  marginBottom: 10,
                  fontFamily: "NexaBold",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                SECURITY DETAILS
              </Text>
              <TextInput
                style={styles.input}
                placeholder={"Password"}
                placeholderTextColor="#CFD7FF"
                // secureTextEntry
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />
              <TextInput
                style={styles.input}
                placeholder={"Confirm Password"}
                placeholderTextColor="#CFD7FF"
                // secureTextEntry
                onChangeText={(text) => {
                  this.setState({ cpassword: text });
                }}
              />
            </View>
          </View>
          <View>
            {/* <FilledButton
              title={"Register"}
              style={[styles.signupButton]}
              onPress={() => this.registerUser()}
            /> */}
             <TouchableOpacity
              style={[styles.signupButton]}
              onPress={() => this.registerUser()}
            >
              <Text
                style={{
                  fontFamily:"NexaBold",
                  color: "#3f51b5",
                  fontSize: 16,
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ height: "26%", backgroundColor: "#CFD7FF", zIndex: -2 }}
          >
            <View
              style={{
                top: 50,
                alignItems: "center",
                flexDirection: "row",

                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "#3F51B5",
                  fontFamily: "NexaLight",
                }}
              >
                Already a user?
              </Text>
              <TouchableOpacity onPress={() => navigate("Login")}>
                <Text
                  style={{
                    left: 10,
                    color: "#3F51B5",
                    fontSize: 17,
                    fontFamily: "NexaLight",
                  }}
                >
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  headline: {
    color: "white",
    textAlign: "center",

    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    top: 100,
    resizeMode: "stretch",
    alignItems: "center",
  },
  headlineDesc: {
    color: "white",
    textAlign: "center",
    marginLeft: 38,
    marginRight: 38,
    fontSize: 21,
    marginBottom: 10,
  },
  input: {
    color: "#fff",
    fontFamily: "NexaLight",
    borderColor: "#fff",
    borderWidth: 0.5,
    width: "85%",
    height: 40,
    borderRadius: 25,
    borderColor: "#fff",
    paddingLeft: 30,
    fontSize: 14,
    marginVertical: 6,
  },
  mobile: {
    fontFamily: "NexaLight",
    color: "#fff",
    left: 5,
    borderColor: "#fff",
    borderWidth: 0.5,
    width: "58%",
    height: 40,
    borderRadius: 25,
    borderColor: "#fff",
    paddingLeft: 28,
    fontSize: 14,
    marginVertical: 6,
  },
  mobilecountry: {
    fontFamily: "NexaLight",
    color: "#fff",
    left: -6,
    borderColor: "#fff",
    borderWidth: 0.5,
    width: "24%",
    height: 40,
    borderRadius: 25,
    borderColor: "#fff",
    paddingLeft: 30,
    fontSize: 14,
    marginVertical: 6,
  },
  loginButton: {
    width: "60%",
    marginTop: "5%",
    marginBottom: "4%",
  },
  signupButton: {
    width: "60%",
    left: "20%",
    top: 25,
    backgroundColor:"white",
    justifyContent:"center",
    alignItems:"center",
    height:45,
    borderRadius:25
  },
  closeIcon: {
    left: 15,
    top: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 20,
    borderRadius: 8,
  },
  text: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: "500",
  },
});
