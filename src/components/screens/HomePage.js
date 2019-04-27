import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  TextInput,
  ToastAndroid,
  BackHandler,
  PixelRatio
} from 'react-native';
import firebase from 'firebase';
import { AdMobRewarded } from 'react-native-admob';

const backImg = require('../../images/backgroundBlur.jpg');
const localImg = require('../../images/localChain.png');
const onlineImg = require('../../images/onlineChain.png');
const guideImg = require('../../images/guideChain.png');
const logoutImg = require('../../images/logoutChain.png');
const friendsImg = require('../../images/friendsChain.png');
const hostImg = require('../../images/host.png');
const joinImg = require('../../images/join.png');
const batImg = require('../../images/startBattle.png');

let f = 1;

class HomePage extends Component {

  state = {
    online: 0,
    fName: ''
  }

  componentWillMount() {
    f = PixelRatio.getFontScale(); //Font Factor
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBack());
  }

  onlineRender() {
    if (this.state.online === 0) {
      return (
        <Image source={onlineImg} style={styles.imageStyle} />
      );
    } else if (this.state.online === 1) {
      return (
        <View style={{ flex: 1, justifyContent: 'space-around' }}>

          <TouchableOpacity
            style={styles.basicStyle}
            onPress={() => this.setState({ online: 2 })}
          >
            <Image source={hostImg} style={{ resizeMode: 'contain', width: '100%' }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.basicStyle}
            onPress={() => this.setState({ online: 3 })}
          >
            <Image source={joinImg} style={{ resizeMode: 'contain', width: '100%' }} />
          </TouchableOpacity>

        </View>
      );
    } else if (this.state.online === 2) {
      return (
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <Text style={{ color: 'black', fontSize: f * 14, textAlign: 'center' }}>
            {'\n'}Your friend must choose 'Join Game'.{'\n\n'}
            They should then enter your name - which they had set{'\n'}
            as Friend Name while adding you as friend.{'\n'}
          </Text>
          <TouchableOpacity
            style={styles.basicStyle}
            onPress={() => {
              AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/1821690665');
              AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
                () => this.props.navigation.navigate('mainFrameOnline', {
                  uid: this.props.navigation.state.params.myUid, host: 1 })
              );
              ToastAndroid.show('Loading Game...', ToastAndroid.LONG);
              AdMobRewarded.addEventListener('adClosed',
                () => this.props.navigation.navigate('mainFrameOnline', {
                  uid: this.props.navigation.state.params.myUid, host: 1 })
              );
            }}
          >
            <Image source={batImg} style={{ resizeMode: 'contain', width: '100%' }} />
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.online === 3) {
      return (
        <View style={{ flex: 1, justifyContent: 'space-around' }}>
          <Text style={{ color: 'black', fontSize: f * 18, textAlign: 'center' }}>
            {'\n\n'}Insert Host Friend{"'"}s Name:{'\n\n'}
          </Text>
          <TextInput
           placeholder="Host Friend's Name"
           underlineColorAndroid='rgba(0,0,0,0)'
           autoCapitalize="none"
           autoCorrect={false}
           style={styles.input}
           value={this.state.fName}
           onChangeText={fName => this.setState({ fName })}
          />
          <TouchableOpacity
            style={styles.basicStyle}
            onPress={() => {
              AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/1821690665');
              AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
                () => this.hostRetrieve().bind(this));
              ToastAndroid.show('Loading your Game... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
              AdMobRewarded.addEventListener('adClosed', () => this.hostRetrieve().bind(this));
          }}
          >
            <Image source={batImg} style={{ resizeMode: 'contain', width: '100%' }} />
          </TouchableOpacity>
        </View>
      );
    }
  }

  hostRetrieve() {
    const firebaseDatabaseRef = firebase.database().ref();
    const uid = this.props.navigation.state.params.myUid;
    firebaseDatabaseRef.child('users').child(uid)
    .child('friends').child(this.state.fName)
    .once('value', (snapshot) => {
      this.props.navigation.navigate('mainFrameOnline', {
        uid: snapshot.val(), thisUid: this.props.navigation.state.params.myUid, host: 0 });
    });
  }

  handleBack() {
    this.props.navigation.navigate('homePage', { myUid: this.props.navigation.state.params.myUid });
    return true;
  }

  toLogout() {
    firebase.auth().signOut();
    this.props.navigation.navigate('login');
  }

  render() {
    return (
      <ImageBackground source={backImg} style={{ flex: 1, flexDirection: 'row' }} >
        <TouchableOpacity
          style={[styles.bigImageContainerStyle, { left: '3%' }]}
          onPress={() => this.props.navigation.navigate('guide')}
        >
          <Image source={guideImg} style={styles.imageStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallImageContainerStyle, { left: '20%' }]}
          onPress={() => {
              AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/7296560388');
              AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
                () => this.props.navigation.navigate('mainFrameLocal',
                  { uid: this.props.navigation.state.params.myUid })
                );
              ToastAndroid.show('Loading Game...', ToastAndroid.LONG);
              AdMobRewarded.addEventListener('adClosed',
              () => this.props.navigation.navigate('mainFrameLocal',
              { uid: this.props.navigation.state.params.myUid }));
            }}
        >
          <Image source={localImg} style={styles.imageStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bigImageContainerStyle, { left: '40%' }]}
          onPress={() => this.setState({ online: 1 })}
        >
          {this.onlineRender()}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallImageContainerStyle, { left: '59%' }]}
          onPress={() => this.props.navigation.navigate('friends',
            { uid: this.props.navigation.state.params.myUid })
          }
        >
          <Image source={friendsImg} style={styles.imageStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.smallImageContainerStyle, { left: '80%' }]}
          onPress={() => this.toLogout()}
        >
          <Image source={logoutImg} style={styles.imageStyle} />
        </TouchableOpacity>
        <Text
        style={{
          position: 'absolute',
          textShadowColor: 'grey',
          textShadowOffset: { width: 1, height: 1 },
          color: '#2c7510',
          fontSize: f * 18,
          bottom: '10%',
          left: '42%'
        }}
        >
          Developed By
        </Text>
        <Text
          style={{
            position: 'absolute',
            textShadowColor: 'grey',
            textShadowOffset: { width: 1, height: 1 },
            color: 'black',
            fontSize: f * 23,
            bottom: '3%',
            left: '40%'
          }}
        >
          Mehul Poddar
        </Text>
      </ImageBackground>
    );
  }
}

const styles = {
  bigImageContainerStyle: {
    position: 'absolute',
    height: '80%',
    width: '18%',
    top: '0%'
  },
  smallImageContainerStyle: {
    position: 'absolute',
    height: '50%',
    width: '18%',
    top: '0%'
  },
  imageStyle: {
    resizeMode: 'stretch',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  basicStyle: {
    padding: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  input: {
    height: '20%',
    width: '100%',
    backgroundColor: '#FAD402B3',
    color: '#000',
    fontSize: f * 13,
    borderRadius: 10
  }
};

export default HomePage;
