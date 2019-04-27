import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ListView,
  Clipboard,
  Text,
  Image,
  ImageBackground,
  TextInput,
  BackHandler,
  PixelRatio,
  ToastAndroid
} from 'react-native';
import firebase from 'firebase';

const backImg = require('../../images/friendsBg.jpg');
const rowImg = require('../../images/row.png');

let f = 1;

class HomePage extends Component {
  constructor(props) {
    super(props);
    const firebaseDatabaseRef = firebase.database().ref();
    this.uid = this.props.navigation.state.params.uid;
    this.userRef = firebaseDatabaseRef.child('users').child(this.uid).child('friends');
    this.userRef.child('dummyGameName123').set('dummyCode');
    Clipboard.setString(this.uid);
  }

  state = { name: '', code: '', dataSource: [] }

  componentWillMount() {
    f = PixelRatio.getFontScale(); //Font Factor

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ dataSource: ds.cloneWithRows([]) });

    let temp = [];
    this.userRef.on('value', (dataSnapshot) => {
      dataSnapshot.forEach((childSnap) => {
        if (childSnap.key !== 'dummyGameName123') {
          temp.push(childSnap.key);
        }
      });
      this.setState({ dataSource: ds.cloneWithRows(temp) });
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBack());
  }

  onAddPress() {
    if (this.state.name === '' || this.state.code === '') {
      ToastAndroid.show('Add Friend Details', ToastAndroid.SHORT);
    } else {
      this.userRef.child(this.state.name).set(this.state.code);
      this.setState({ name: '', code: '' });
    }
  }

  handleBack() {
    this.props.navigation.navigate('homePage', { myUid: this.uid });
    return true;
  }

  renderRow(friend) {
    return (
      <View style={{ flex: 1 }}>
        <Image source={rowImg} style={styles.rowStyle} />
        <Text style={[styles.buttonText, { fontSize: f * 22, padding: '5%' }]}>
          {friend}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ImageBackground
          source={backImg}
          style={{ width: '100%', height: '100%', flexDirection: 'row' }}
      >

        <View style={{ flex: 0.65 }}>
          <View style={{ flex: 0.5, justifyContent: 'center' }} >
            <TextInput
              placeholder="Friend Name"
              returnKeyType="next"
              underlineColorAndroid='rgba(0,0,0,0)'
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            />

            <TextInput
              placeholder="Friend GAME CODE"
              underlineColorAndroid='rgba(0,0,0,0)'
              style={styles.input}
              returnKeyType="go"
              value={this.state.code}
              onChangeText={code => this.setState({ code })}
            />

            <TouchableOpacity
             style={styles.addContainer}
             onPress={this.onAddPress.bind(this)}
            >
              <Text style={styles.buttonText}>Add Friend</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 0.5 }} />
        </View>

        <View style={{ flex: 0.35 }} >
          <ListView
            style={{ flex: 1, top: '12%', right: '10%' }}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>

      </ImageBackground>
    );
  }
}

const styles = {
  input: {
    height: '20%',
    width: '50%',
    backgroundColor: '#FAD402B3',
    color: 'black',
    fontSize: f * 13,
    top: '5%',
    marginBottom: '2%',
    borderRadius: f * 10,
    left: '15%'
  },
  addContainer: {
    backgroundColor: '#e64460',
    width: '30%',
    paddingVertical: '1%',
    top: '5%',
    borderRadius: f * 5,
    left: '25%'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    fontSize: f * 15,
    textShadowColor: '#e64460',
    textShadowOffset: { width: 2, height: 2 },
    fontStyle: 'italic'
  },
  rowStyle: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    top: '3%'
  }
};

export default HomePage;
