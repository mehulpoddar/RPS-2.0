import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Dimensions, ImageBackground } from 'react-native';
import Root from './src/components/Root';

const backImg = require('./src/images/backgroundBlur.jpg');

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCT61VqHXhb3rBXBPbWM-3-cCgLewwRgng',
      authDomain: 'rps2-c6849.firebaseapp.com',
      databaseURL: 'https://rps2-c6849.firebaseio.com',
      projectId: 'rps2-c6849',
      storageBucket: 'rps2-c6849.appspot.com',
      messagingSenderId: '3585813525'
    });
  }

  fitScreen() {
    const { height, width } = Dimensions.get('window');
    const correctWidth = height * 1.75; //Aspect Ratio = 1.75

    if (width > correctWidth) {
      return (
        <View style={[styles.appStyle, { width: correctWidth }]}>
          <Root />
        </View>
      );
    }
    return (
      <View style={styles.appStyle}>
        <Root />
      </View>
    );
  }

  render() {
    return (
      <ImageBackground source={backImg} style={{ flex: 1 }}>
        {this.fitScreen()}
      </ImageBackground>
    );
  }
}

const styles = {
  appStyle: {
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  }
};

export default App;
