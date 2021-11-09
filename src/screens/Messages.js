import React, { Component } from "react";
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
} from "react-native";
import { HeaderIconButton } from "../components/HeaderIconButton";
import { AuthContext } from "../contexts/AuthContext";
import { Product } from "../components/Product";
import { useGet } from "../hooks/useGet";
import { HeaderIconsContainer } from "../components/HeaderIconsContainer";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";
import SecureStorage from "react-native-secure-storage";
import moment from "moment";
import { BASE_URL } from "../config";
import io from "socket.io-client";
class Messages extends Component {
  state = {
    chatMessage: "",
      chatMessages: []
  };

  componentDidMount() {
    console.log("msg");
    this.socket = io("http://192.168.1.134:17302");
    
 }
 submitChatMessage() {
   console.log(this.state.chatMessage);
  //this.socket.emit('disconnect');
  this.socket.emit('msg', this.state.chatMessage);
  this.setState({chatMessage: ''});
}
  render() {
    const { navigate } = this.props.navigation;
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
    ));

    return (
      <View style={styles.container}>
      {chatMessages}
      <TextInput
        style={{height: 40, borderWidth: 2, top: 600}}
        autoCorrect={false}
        value={this.state.chatMessage}
        onSubmitEditing={() => this.submitChatMessage()}
        onChangeText={chatMessage => {
          this.setState({chatMessage});
        }}
      />
    </View>
    );
  }
}
export default Messages;
const styles = StyleSheet.create({
  closeIcon: {
    left: 15,
    top: 15,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
  menu: {
    left: 305,
  },
  drawer: {
    top: 555,
  },
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  card: {
    shadowColor: "black",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginVertical: 7,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    flexBasis: "45%",
    marginHorizontal: 9,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardFooter: {
    // backgroundColor:"red",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },

  cardImage: {
    flex: 1,
    height: 60,
    width: 60,
    alignSelf: "center",
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },

  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  TabBarMainContainer: {
    justifyContent: "space-around",
    height: 50,
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },

  button: {
    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  buttonbell: {
    borderTopRightRadius: 15,
    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  buttonfile: {
    borderTopLeftRadius: 14,
    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  button1: {
    position: "relative",
    width: "1%",
    height: "100%",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    zIndex: 1,
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
});