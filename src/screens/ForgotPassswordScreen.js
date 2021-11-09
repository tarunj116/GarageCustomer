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
import OtpInputs from "react-native-otp-inputs";
import { Loading } from "../components/Loading";
import { BASE_URL } from "../config";
import Spinner from "react-native-loading-spinner-overlay";
export default class OtpScreen extends Component {
  state = {
    spinner: false,
  };
  static navigationOptions = {
    // Sets the title of the Header
    title: "Home",
  };
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
    };
  }

  verifyUser() {
    this.setState({
      spinner: true,
    });
    const { navigate } = this.props.navigation;
    if (this.state.phone == "") {
      ToastAndroid.show(
        "Please Enter Mobile Number",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      // alert("Please enter Mobile Number");
      return false;
    }
    console.log(navigate.params);
    const phones = this.state.phone;
    this.setState({ loading: true });
    const url = `${BASE_URL}/customer/forgetpassword`;
    const params = JSON.stringify({
      phone: this.state.phone,
    });
    console.log(params);

    axios
      .post(url, params, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function(response) {
        console.log(response);
        if (response.data.success == true) {
          alert(response.data.message);
          navigate("ForgotOtpScreen", phones);
          return false;
        } else {
          alert(response);
        }
      })

      .catch(function(error) {
        //  alert(error.response.data.error)
        //   ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT,ToastAndroid.CENTER);
        alert(error.response.data.error);
      });
  }
  render() {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
    const { navigate } = this.props.navigation;
    console.log(this.props.route.params);
    return (
      <ScrollView style={{ width: "100%" }}>
        <ImageBackground
          style={{ flex: 1, height: windowHeight, width: "100%" }}
          source={require("../assets/forgotpassword.png")}
          resizeMode={"stretch"}
        >
          <View
            style={{
              flex: 1,
              top: 80,
              width: "100%",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text
              style={{
                color: "#3F51B5",
                textAlign: "center",
                fontSize: 40,
                fontFamily: "NexaLight",
              }}
            >
              FORGOT
            </Text>
            <Text
              style={{
                color: "#3F51B5",
                textAlign: "center",
                fontSize: 40,
                fontFamily: "NexaLight",
              }}
            >
              PASSWORD
            </Text>
            <View
              style={{
                marginLeft: 6,
                width: "96%",
                alignItems: "center",
                borderRadius: 25,
                height: "40%",
                top: "7%",
              }}
            >
              <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
                <Text style={styles.headline}>
                  Please input your registred mobile number .
                </Text>
                <Text style={styles.headlineDesc}>
                  We will send instructions on how you can recover / reset your
                  password.
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Mobile Number"}
                  placeholderTextColor="#CFD7FF"
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    this.setState({ phone: text });
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                top: "4%",
              }}
            >
              {/* <FilledButton
                title={"Submit"}
                style={styles.loginButton}
                onPress={() => this.verifyUser()}
              /> */}
              <TouchableOpacity
              style={{
                width: "80%",
                height: "10%",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                marginTop: "5%",
              }}
              onPress={() => this.verifyUser()}
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
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  headline: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    fontFamily: "NexaBold",
  },
  headlineDesc: {
    color: "white",
    textAlign: "center",
    marginLeft: 38,
    marginRight: 38,
    fontSize: 17,
    marginBottom: 10,
    lineHeight: 20,
    fontFamily: "NexaLight",
  },
  input: {
    fontFamily: "NexaLight",
    color: "#fff",
    borderColor: "#FFFFFF",
    borderWidth: 0.5,
    width: "85%",
    height: 50,
    borderRadius: 25,
    borderColor: "#fff",
    paddingLeft: 30,
    fontSize: 18,
    marginVertical: 6,
    top: 20,
  },
  loginButton: {
    width: "60%",
    marginBottom: "30%",
  },
  closeIcon: {
    left: 15,
    top: 15,
  },
});
