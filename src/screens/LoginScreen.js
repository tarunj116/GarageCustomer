import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Text,
  Switch,
  TextInput,
  Dimensions,
  CheckBox,
  TouchableOpacity,
  Image,
} from "react-native";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { FilledButton } from "../components/FilledButton";
import { TextButton } from "../components/TextButton";
import { Error } from "../components/Error";
import { AuthContainer } from "../components/AuthContainer";
import { AuthContext } from "../contexts/AuthContext";
import { Loading } from "../components/Loading";
import { color } from "react-native-reanimated";
import Spinner from "react-native-loading-spinner-overlay";
export function LoginScreen({ navigation }) {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [spinner, setSpinner] = React.useState(false);
  const [error, setError] = React.useState("");
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [isSelected, setSelection] = useState(false);
  return (
    <ScrollView style={{ width: "100%" }}>
      <ImageBackground
        style={{ flex: 1, height: windowHeight, width: "100%" }}
        source={require("../assets/login.png")}
        resizeMode={"stretch"}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MainScreen");
          }}
        >
          <Image
            style={styles.closeIcon}
            source={require("../assets/icons/aerosmall.png")}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            height: "100%",
            top: "45%",
          }}
        >
          <View style={{ width: "60%", top: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "white" }}>
              LOG IN
            </Text>
          </View>
          <View
            style={{
              width: "90%",
              height: "37%",
              backgroundColor: "#6577db",
              borderRadius: 25,
              marginTop: "14%",
              alignItems: "center",
            }}
          >
            <Error error={error} />
            <TextInput
              style={styles.input}
              placeholder={"Mobile Number"}
              placeholderTextColor="#CFD7FF"
              keyboardType={"numeric"}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={"Password"}
              placeholderTextColor="#CFD7FF"
              secureTextEntry
              onChangeText={setPassword}
            />
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
              />

              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#CFD7FF",
                    marginRight: 25,
                    fontFamily: "NexaBold",
                  }}
                >
                  Remember me
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassswordScreen")}
                >
                  <Text
                    style={{
                      color: "#CFD7FF",
                      fontSize: 11,
                      fontFamily: "NexaBold",
                    }}
                  >
                    FORGOT PASSWORD
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <FilledButton
              title={"Login"}
              style={styles.loginButton}
              onPress={async () => {
                try {
                  setSpinner(true);
                  await login(email, password);
                } catch (e) {
                  setError(e.message);
                  setSpinner(false);
                }
              }}
            /> */}
              <TouchableOpacity
              style={{
                width: "80%",
                height: 45,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                marginTop: "5%",
              }}
              onPress={async () => {
                try {
                  setLoading(false);
                  await login(email, password);
                } catch (e) {
                  setError(e.message);
                  setLoading(false);
                }
              }}
            >
              <Text
                style={{
                  fontFamily:"NexaBold",
                  color: "#3f51b5",
                  fontSize: 16,
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 20,
                alignItems: "center",
                flexDirection: "row",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "#CFD7FF",
                  marginRight: 10,
                  fontFamily: "NexaLight",
                }}
              >
                Dont have account yet ?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text
                  style={{
                    color: "#CFD7FF",
                    fontSize: 17,
                    fontFamily: "NexaLight",
                  }}
                >
                  SIGNUP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Loading loading={loading} />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 48,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    color: "white",
  },
  input: {
    fontFamily: "NexaLight",
    color: "#fff",
    borderWidth: 0.3,
    width: "80%",
    height: 40,
    borderRadius: 25,
    borderColor: "#fff",
    paddingLeft: 30,
    fontSize: 16,
    marginVertical: 6,
  },
  loginButton: {
    width: "80%",
    top: 10,
  },
  closeIcon: {
    left: 24,
    top: 18,
  },
});
