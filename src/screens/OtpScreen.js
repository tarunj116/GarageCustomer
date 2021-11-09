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
export default class ForgotPassswordScreen extends Component {
  static navigationOptions = {
    // Sets the title of the Header
    title: "Home",
  };
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      phone: "",
    };
  }
  componentDidMount() {
    let { phone } = this.props.route.params;
    this.setState({ phone: phone });
  }

  verifyUser() {
    const { navigate } = this.props.navigation;
    console.log(navigate.params);
    this.setState({ loading: true });
    const url = `${BASE_URL}/customer/otpbetacheck`;
    const params = JSON.stringify({
      otp: this.state.otp,
      phone: this.props.route.params,
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
          ToastAndroid.show(
            response.data.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          navigate("Login");
          return false;
        } else {
          alert(response);
        }
      })

      .catch(function(error) {
        //  alert(error.response.data.error)
        //   ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT,ToastAndroid.CENTER);

        ToastAndroid.show(
          error.response.data.error,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  }
  resendOtp() {
    this.setState({ loading: true });
    const url = `${BASE_URL}/customer/otpbeta`;
    const params = JSON.stringify({
      phone: this.props.route.params,
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
          alert(
            "Please check your mobile number to get New OTP of your account."
          );

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
              OTP
            </Text>
            <Text
              style={{
                color: "#3F51B5",
                textAlign: "center",
                fontSize: 40,
                fontFamily: "NexaLight",
              }}
            >
              VERIFICATION
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
                  A 4-digit code has been sent to your registered number.
                </Text>
                <Text style={styles.headlineDesc}>
                  Please input the code below for verification purposes.
                </Text>
                <View style={styles.container}>
                  <OtpInputs
                    handleChange={(code) => this.setState({ otp: code })}
                    numberOfInputs={4}
                    inputContainerStyles={{
                      borderColor: "#B7C4EF",
                      fontSize: "30%",
                      width:60
                    }}
                    inputStyles={{
                      width: "96%",
                      height: "26%",
                      color: "white",
                      borderRadius: 10,
                      marginLeft: 20,
                      borderWidth: 1,
                      borderColor: "white",
                    }}
                  />
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",

                      justifyContent: "center",
                      marginLeft: 10,
                      top: -90,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        color: "white",
                        fontFamily: "NexaLight",
                      }}
                    >
                      Didnt receive a code?
                    </Text>
                    <TouchableOpacity onPress={() => this.resendOtp()}>
                      <Text
                        style={{
                          left: 10,
                          color: "white",
                          fontSize: 17,
                          fontFamily: "NexaLight",
                        }}
                      >
                        RESEND
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
  container: {
    marginLeft: -40,
    top: -90,
  },
  headline: {
    color: "white",
    textAlign: "center",

    fontWeight: "bold",
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
    fontFamily: "NexaLight",
    lineHeight: 20,
  },
  input: {
    fontFamily: "NexaLight",
    color: "#fff",
    borderColor: "#FFFFFF",
    color: "black",
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
