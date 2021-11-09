import  React from 'react';
import { StyleSheet } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import{View,Text,Image,} from 'react-native'

const slides = [
  {
    key: 'one',
    title: 'Search',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley;',
    image: require('../Assets/Images/Garage_Provider/homebackground.png'),
   
  },
  {
    key: 'two',
    title: 'Book an Appointment',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley',
    image: require('../Assets/Images/Garage_Provider/homebackground.png'),
   
  },
  {
    key: 'three',
    title: 'Lorem Ipsum ',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley',
    image: require('../Assets/Images/Garage_Provider/homebackground.png'),
    
  }
];

export default class SliderScreen extends React.Component {
   constructor(props) {
     super(props);
      this.state = {
      showRealApp: false
  }
}
  _renderItem = ({ item }) => {
    return (
      <View  style={styles.slide}>
        <Text style={styles.titles}>{item.title} </Text>
        <Image source={item.image} style={styles.images} resizeMode='stretch'/>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
      <Text>Next</Text>
     </View>
    );
  };
  _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle2}>
      <Text>Skip</Text>
     </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
       <Text>Done</Text>
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    this.props.navigation.replace('Login')

  };
   
  render() {
    if (this.state.showRealApp) {
      return <IntroSlider />
    } else {
      return <AppIntroSlider  showSkipButton="true" renderItem={this._renderItem} data={slides} onDone={this._onDone} renderSkipButton={this._renderSkipButton} renderDoneButton={this._renderDoneButton}
      renderNextButton={this._renderNextButton}/>
    }
  }
}
const styles = StyleSheet.create({
    slide: {
      width:"100%",
      height:"100%",
      alignItems:"center",
      position:"absolute",
      zIndex:0
},
 images:{
   width:"85%",
   height:"40%",   
   zIndex:0
 },
 text:{
   fontSize:15,
   width:"75%",
   zIndex:1,
   color:"grey"
 }, 
 titles:{
   marginTop:"30%",
   color:"black",
   fontWeight:"bold",
   zIndex:1,
   fontSize:18
 },
 buttonCircle: {
 
 color:"green",
 zIndex:1,

},
buttonCircle2: {
 
  color: 'white',
  zIndex:1,
  
 },
})


  