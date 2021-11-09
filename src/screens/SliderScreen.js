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
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
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

export function SliderScreen({ navigation }) {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get("window");
  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}
        >
          <View style={{ width, height }}>
            <Image
              source={require("../assets/first_intro.png")}
              style={styles.imageStyle}
            />
            <TouchableOpacity
              style={{ flexDirection: "row-reverse", bottom: 100 }}
              onPress={() => {
                navigation.navigate("MainScreen");
              }}
            >
              <Text
                style={{
                  color: "#3F51B5",
                  fontWeight: "bold",
                  fontSize: 20,
                  left: 10,
                }}
              >
                Skip
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require("../assets/sec_intro.png")}
              style={styles.imageStyle}
            />
            <TouchableOpacity
              style={{ flexDirection: "row-reverse", bottom: 100 }}
              onPress={() => {
                navigation.navigate("MainScreen");
              }}
            >
              <Text
                style={{
                  color: "#3F51B5",
                  fontWeight: "bold",
                  fontSize: 20,
                  left: 10,
                  
                }}
              >
                Skip
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width, height, alignItems: "center" }}>
            <Image
              source={require("../assets/third_intro.png")}
              style={styles.imageStyle}
            />
            <TouchableOpacity
              style={{
                height: 40,
                width: 200,
                bottom: 110,
                backgroundColor: "#3F51B5",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
              onPress={() => {
                navigation.navigate("MainScreen");
              }}
            >
              <Text style={{ color: "white", fontSize: 19 }}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    height: 14,
    borderRadius: 25,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  imageStyle: {
    height: "95%",
    width: "100%",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: "95%",
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: "blue",
    marginLeft: 10,
  },
});
