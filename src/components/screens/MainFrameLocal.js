import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  BackHandler,
  PixelRatio,
  StatusBar
} from 'react-native';
import Sound from 'react-native-sound';
import { AdMobBanner, AdMobInterstitial, AdMobRewarded } from 'react-native-admob';

const background = require('../../images/background.jpg');
const sciButton = require('../../images/sciButton.png');
const rockButton = require('../../images/rockButton.png');
const paperButton = require('../../images/paperButton.png');
const arrowImg = require('../../images/activeArrow.png');
const songImg = require('../../images/changeSong.png');
const noSongImg = require('../../images/noSong.png');
const speedImg = require('../../images/fast.png');
const inArrowImg = require('../../images/inactiveArrow.png');
const happy1 = require('../../images/happy1.png');
const happy2 = require('../../images/happy2.png');
const sad1 = require('../../images/sad1.png');
const sad2 = require('../../images/sad2.png');
const rage1 = require('../../images/rage1.png');
const rage2 = require('../../images/rage2.png');

const rockImg = require('../../images/Rocks/rock.png');
const bolImg = require('../../images/Rocks/boulder.png');
const monImg = require('../../images/Rocks/monument.png');
const hillImg = require('../../images/Rocks/hill.png');
const mountImg = require('../../images/Rocks/mountain.png');
const volImg = require('../../images/Rocks/volcano.png');
const metImg = require('../../images/Rocks/meteor.png');
const planImg = require('../../images/Rocks/planet.png');
const sunImg = require('../../images/Rocks/sun.png');
const galImg = require('../../images/Rocks/galaxy.png');

const paperImg = require('../../images/Papers/paper.png');
const giftImg = require('../../images/Papers/gift.png');
const novImg = require('../../images/Papers/novel.png');
const cardImg = require('../../images/Papers/cardboard.png');
const foilImg = require('../../images/Papers/foil.png');
const sandImg = require('../../images/Papers/sandPaper.png');
const wallImg = require('../../images/Papers/wallpaper.png');
const furImg = require('../../images/Papers/fur.png');
const carpImg = require('../../images/Papers/carpet.png');
const leathImg = require('../../images/Papers/leather.png');

const sciImg = require('../../images/Scissors/scissors.png');
const scaImg = require('../../images/Scissors/scale.png');
const dagImg = require('../../images/Scissors/dagger.png');
const shearImg = require('../../images/Scissors/shears.png');
const swissImg = require('../../images/Scissors/swissKnife.png');
const hackImg = require('../../images/Scissors/hackSaw.png');
const shuriImg = require('../../images/Scissors/shuriken.png');
const swordImg = require('../../images/Scissors/sword.png');
const axeImg = require('../../images/Scissors/axe.png');
const chainImg = require('../../images/Scissors/chainSaw.png');

const gameStats = {
  scissors: {
    won: 0,
    lost: 0,
    draw: 0
  },
  rock: {
    won: 0,
    lost: 0,
    draw: 0
  },
  paper: {
    won: 0,
    lost: 0,
    draw: 0
  }
};

const paper = [
  {
    name: 'Paper',
    atk: 5,
    img: paperImg
  },
  {
    name: 'Gift Wrap',
    atk: 6,
    img: giftImg
  },
  {
    name: 'Novel',
    atk: 8,
    img: novImg
  },
  {
    name: 'Cardboard',
    atk: 10,
    img: cardImg
  },
  {
    name: 'Foil Paper',
    atk: 12,
    img: foilImg
  },
  {
    name: 'Sand Paper',
    atk: 15,
    img: sandImg
  },
  {
    name: 'Wallpaper',
    atk: 17,
    img: wallImg
  },
  {
    name: 'Fur',
    atk: 21,
    img: furImg
  },
  {
    name: 'Carpet',
    atk: 24,
    img: carpImg
  },
  {
    name: 'Leather',
    atk: 27,
    img: leathImg
  }
];

const rock = [
  {
    name: 'Rock',
    atk: 6,
    img: rockImg
  },
  {
    name: 'Boulder',
    atk: 8,
    img: bolImg
  },
  {
    name: 'Monument',
    atk: 10,
    img: monImg
  },
  {
    name: 'Hill',
    atk: 13,
    img: hillImg
  },
  {
    name: 'Mountain',
    atk: 16,
    img: mountImg
  },
  {
    name: 'Volcano',
    atk: 21,
    img: volImg
  },
  {
    name: 'Meteor',
    atk: 24,
    img: metImg
  },
  {
    name: 'Planet',
    atk: 28,
    img: planImg
  },
  {
    name: 'Sun',
    atk: 34,
    img: sunImg
  },
  {
    name: 'Galaxy',
    atk: 39,
    img: galImg
  }
];

const scissors = [
  {
    name: 'Scissors',
    atk: 7,
    img: sciImg
  },
  {
    name: 'Metal Scale',
    atk: 9,
    img: scaImg
  },
  {
    name: 'Dagger',
    atk: 12,
    img: dagImg
  },
  {
    name: 'Shears',
    atk: 16,
    img: shearImg
  },
  {
    name: 'Swiss Knife',
    atk: 20,
    img: swissImg
  },
  {
    name: 'Hack Saw',
    atk: 25,
    img: hackImg
  },
  {
    name: 'Shuriken',
    atk: 29,
    img: shuriImg
  },
  {
    name: 'Sword',
    atk: 35,
    img: swordImg
  },
  {
    name: 'Axe',
    atk: 42,
    img: axeImg
  },
  {
    name: 'Chain Saw',
    atk: 49,
    img: chainImg
  }
];

let tap1 = 0;
let tap2 = 0;
let CPUMem = 0;
let CPUMemCount = 1;
let Ad = 1;
let f = 1;
let delay = 1000;

class MainFrameLocal extends Component {

  constructor() {
    super();
    this.backtrack = new Sound('background.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        ToastAndroid.show('Music could not play! :(', ToastAndroid.short);
      } else {
        this.backtrack.setNumberOfLoops(-1);
        this.backtrack.play(() => { this.backtrack.release(); });
      }
    });

    AdMobRewarded.removeAllListeners();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    this.backButtonEvent = this.backButtonEvent.bind(this);
  }

  state = {
    winner: 0,
    winMem: 0,
    supCh: 0,
    song: songImg,
    inactive: false,

    batImg1: null,
    batImg2: null,
    winImg1: happy1,
    winImg2: happy2,

    hp1: 300,
    mana1: 0,
    pStat1: 0,
    rStat1: 0,
    sStat1: 0,

    hp2: 300,
    mana2: 0,
    pStat2: 0,
    rStat2: 0,
    sStat2: 0
  };

  componentWillMount() {
    f = PixelRatio.getFontScale(); //Font Factor
  }

  componentDidMount() {
    this.uid = this.props.navigation.state.params.uid;

    AdMobRewarded.addEventListener('rewarded',
      () => {
        if (this.state.song === songImg) {
          this.backtrack.play(() => { this.backtrack.release(); });
        }
        const tempM = this.state.mana1 + 3;
        this.setState({ mana1: tempM });
      });

    BackHandler.addEventListener('hardwareBackPress', this.backButtonEvent);
  }

  backButtonEvent() {
    Alert.alert(
      'Going Back?',
      'Are you sure you want to go back? :O\n'
      + 'This page will miss you!',
      [
       // Left to right order
        { text: 'Yes, Please ^_^',
          onPress: () => {
            this.backtrack.stop();
            BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
            AdMobRewarded.removeAllListeners();
            this.props.navigation.navigate('homePage', { myUid: this.uid });
          }
        },
        { text: 'OMG! No' }
     ],
     { cancelable: false } // Prevents user from ignoring the alert
    );
    return true;
  }

  playTrack(name) {
    this.track = new Sound(name + '.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        ToastAndroid.show('Music could not play! :(', ToastAndroid.short);
      } else if (delay === 1000) {
        this.track.play(() => { this.track.release(); });
      }
    });
  }

  manaChecker(p, bm) {
    // p = player (1 or 2), bm = base move (1, 2 or 3)

    if (p === 1) {
      switch (bm) {
        case 1: if (this.state.mana1 >= 2) {
          return (
            <Image source={arrowImg} style={styles.arrowStyle} />
          );
        }
        return <Image source={inArrowImg} style={styles.arrowStyle} />;

        case 2: if (this.state.mana1 >= 3) {
          return (
            <Image source={arrowImg} style={styles.arrowStyle} />
          );
        }
        return <Image source={inArrowImg} style={styles.arrowStyle} />;

        case 3: if (this.state.mana1 >= 4) {
          return (
            <Image source={arrowImg} style={styles.arrowStyle} />
          );
        }
        return <Image source={inArrowImg} style={styles.arrowStyle} />;

        default:
      }
    }

    switch (bm) {
      case 1: if (this.state.mana2 >= 2) {
        return (
          <Image source={arrowImg} style={styles.arrowStyle} />
        );
      }
      return <Image source={inArrowImg} style={styles.arrowStyle} />;

      case 2: if (this.state.mana2 >= 3) {
        return (
          <Image source={arrowImg} style={styles.arrowStyle} />
        );
      }
      return <Image source={inArrowImg} style={styles.arrowStyle} />;

      case 3: if (this.state.mana2 >= 4) {
        return (
          <Image source={arrowImg} style={styles.arrowStyle} />
        );
      }
      return <Image source={inArrowImg} style={styles.arrowStyle} />;

      default:
    }
  }

  manaUser(p, bm) {
    // p = player (1 or 2), bm = base move (1, 2 or 3)

    if (p === 1) {
      let m = this.state.mana1;

      switch (bm) {

        case 1: if (m >= 2) {
          const stat = this.state.pStat1;
          if (stat === 9) {
            Alert.alert('Max Evolution',
              'How much more do you want to evolve?\n\n(▀̿Ĺ̯▀̿ ̿)');
          } else {
            Alert.alert('Woah!',
              paper[stat].name + ' evolved to ' + paper[stat + 1].name
              + '\n\n:･ﾟ✧  ʕ ␥_␥ʔ  :･ﾟ✧');
            m -= 2;
            this.setState({ mana1: m, pStat1: stat + 1 });
          }
        } else {
          Alert.alert('Insufficient Mana', "Oops! You ain't got that kind of Mana."
          + 'You need at least 2.\n\n ¯\\_(ツ)_/¯\n'
          + 'Want to watch a Video to earn 3 mana?',
            [
             // Left to right order
              { text: 'Hell Yeah!ヾ(⌐■_■)ノ',
                onPress: () => {
                  this.backtrack.stop();
                  ToastAndroid.show('Fetching Video...', ToastAndroid.LONG);
                  AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/9891752373');
                  AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
                    () => {
                      if (this.state.song === songImg) {
                        this.backtrack.play(() => { this.backtrack.release(); });
                      }
                      ToastAndroid.show('Video not available currently :(', ToastAndroid.SHORT);
                  });
                }
              },
              { text: 'Not now...' }
           ],
           { cancelable: false } // Prevents user from ignoring the alert
          );
        }
        break;

        case 2: if (m >= 3) {
          const stat = this.state.rStat1;
          if (stat === 9) {
            Alert.alert('Max Evolution',
              'How much more do you want to evolve?\n\n(▀̿Ĺ̯▀̿ ̿)');
          } else {
            Alert.alert('Woah!',
              rock[stat].name + ' evolved to ' + rock[stat + 1].name
              + '\n\n:･ﾟ✧ ┌༼▀̿̿Ĺ̯̿̿▀̿༽┘ :･ﾟ✧');
            m -= 3;
            this.setState({ mana1: m, rStat1: stat + 1 });
          }
        } else {
          Alert.alert('Insufficient Mana', "Oops! You ain't got that kind of Mana."
          + 'You need at least 3.\n\n ¯\\_(ツ)_/¯\n'
          + 'Want to watch a Video to earn 3 mana?',
            [
             // Left to right order
              { text: 'Hell Yeah!ヾ(⌐■_■)ノ',
                onPress: () => {
                  this.backtrack.stop();
                  ToastAndroid.show('Fetching Video...', ToastAndroid.LONG);
                  AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/9891752373');
                  AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
                    () => {
                      if (this.state.song === songImg) {
                        this.backtrack.play(() => { this.backtrack.release(); });
                      }
                      ToastAndroid.show('Video not available currently :(', ToastAndroid.SHORT);
                  });
                }
              },
              { text: 'Not now...' }
           ],
           { cancelable: false } // Prevents user from ignoring the alert
          );
        }
        break;

        case 3: if (m >= 4) {
          const stat = this.state.sStat1;
          if (stat === 9) {
            Alert.alert('Max Evolution',
              'How much more do you want to evolve?\n\n(▀̿Ĺ̯▀̿ ̿)');
          } else {
            Alert.alert('Woah!',
              scissors[stat].name + ' evolved to ' + scissors[stat + 1].name
              + '\n\n:･ﾟ✧ ┌(★o☆)┘ :･ﾟ✧');
            m -= 4;
            this.setState({ mana1: m, sStat1: stat + 1 });
          }
        } else {
          Alert.alert('Insufficient Mana', "Oops! You ain't got that kind of Mana."
          + 'You need at least 4.\n\n ¯\\_(ツ)_/¯\n'
          + 'Want to watch a Video to earn 3 mana?',
            [
             // Left to right order
              { text: 'Hell Yeah!ヾ(⌐■_■)ノ',
                onPress: () => {
                  this.backtrack.stop();
                  ToastAndroid.show('Fetching Video...', ToastAndroid.LONG);
                  AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/9891752373');
                  AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
                    () => {
                      if (this.state.song === songImg) {
                        this.backtrack.play(() => { this.backtrack.release(); });
                      }
                      ToastAndroid.show('Video not available currently  :(', ToastAndroid.SHORT);
                  });
                }
              },
              { text: 'Not now...' }
           ],
           { cancelable: false } // Prevents user from ignoring the alert
          );
        }
        break;

        default:
      }
    } else {
      let m = this.state.mana2;

      switch (bm) {

        case 1: if (m >= 2) {
          const stat = this.state.pStat2;
          if (stat === 9) {
            Alert.alert('Max Evolution',
              'How much more do you want to evolve?\n\n(▀̿Ĺ̯▀̿ ̿)');
          } else {
            Alert.alert('Woah!',
              paper[stat].name + ' evolved to ' + paper[stat + 1].name
              + '\n\n:･ﾟ✧  ʕ ␥_␥ʔ  :･ﾟ✧');
            m -= 2;
            this.setState({ mana2: m, pStat2: stat + 1 });
          }
        } else {
          Alert.alert('Insufficient Mana', "Oops! You ain't got that kind of Mana."
          + 'You need at least 2.\n\n ¯\\_(ツ)_/¯');
        }
        break;

        case 2: if (m >= 3) {
          const stat = this.state.rStat2;
          if (stat === 9) {
            Alert.alert('Max Evolution',
              'How much more do you want to evolve?\n\n(▀̿Ĺ̯▀̿ ̿)');
          } else {
            Alert.alert('Woah!',
              rock[stat].name + ' evolved to ' + rock[stat + 1].name
              + '\n\n:･ﾟ✧ ┌༼▀̿̿Ĺ̯̿̿▀̿༽┘ :･ﾟ✧');
            m -= 3;
            this.setState({ mana2: m, rStat2: stat + 1 });
          }
        } else {
          Alert.alert('Insufficient Mana', "Oops! You ain't got that kind of Mana."
          + 'You need at least 3.\n\n ¯\\_(ツ)_/¯');
        }
        break;

        case 3: if (m >= 4) {
          const stat = this.state.sStat2;
          if (stat === 9) {
            Alert.alert('Max Evolution',
              'How much more do you want to evolve?\n\n(▀̿Ĺ̯▀̿ ̿)');
          } else {
            Alert.alert('Woah!',
              scissors[stat].name + ' evolved to ' + scissors[stat + 1].name
              + '\n\n:･ﾟ✧ ┌(★o☆)┘ :･ﾟ✧');
            m -= 4;
            this.setState({ mana2: m, sStat2: stat + 1 });
          }
        } else {
          Alert.alert('Insufficient Mana', "Oops! You ain't got that kind of Mana."
          + 'You need at least 4.\n\n ¯\\_(ツ)_/¯');
        }
        break;

        default:
      }
    }
  }

  trioRan(x) {
    const ran = Math.random();
    if (x === 2) {
      if (ran < 0.3) {
        return true;
      }
    } else if (x === 3) {
      if (ran < 0.45) {
        return true;
      }
    } else if (x >= 4) {
      return true;
    }
    return false;
  }

  CPUEvolve() {
    const m = this.state.mana2;
    if (m === 2) {
      if (this.trioRan(2)) {
        this.manaUser(2, 1);
      }
    } else if (m === 3) {
      if (this.trioRan(3)) {
        this.manaUser(2, 2);
      }
    } else if (m === 4) {
        this.manaUser(2, 3);
    }
  }

  CPUPlay() {
    // const ran = Math.round((Math.random() * (max - min)) + min);

    if (tap1 === CPUMem) {
      CPUMemCount += 1;
    }

    if (this.trioRan(CPUMemCount - 1)) {
      if (CPUMem === 1) {
        tap2 = 3;
      } else if (CPUMem === 2) {
        tap2 = 1;
      } else if (CPUMem === 3) {
        tap2 = 2;
      }
    } else {
      tap2 = Math.round((Math.random() * (3 - 1)) + 1);
    }

    if (CPUMem !== tap1) {
     CPUMemCount = 1;
   }
   CPUMem = tap1;
    this.decider();
  }

  supChDisp(p, v) {
    if (p === this.state.supCh) {
      return v * 2;
    }
    return v;
  }

  decider() {
    // paper = 1, rock = 2, scissors = 3

    if (!(tap1 === 0 || tap2 === 0)) {
      let bi1 = null;
      let bi2 = null;
      let bn1 = '';
      let bn2 = '';
      let wi1 = null;
      let wi2 = null;
      let w = 0;
      let h1 = this.state.hp1;
      let h2 = this.state.hp2;
      let m1 = this.state.mana1;
      let m2 = this.state.mana2;
      let wm = this.state.winMem;
      let sc = this.state.supCh;
      let c = 1;

      switch (tap1) {
        case 1: bi1 = paper[this.state.pStat1].img;
                bn1 = paper[this.state.pStat1].name; break;
        case 2: bi1 = rock[this.state.rStat1].img;
                bn1 = rock[this.state.rStat1].name; break;
        case 3: bi1 = scissors[this.state.sStat1].img;
                bn1 = scissors[this.state.sStat1].name; break;
        default:
      }
      bn1 = (bn1.replace(' ', '_')).toLowerCase();
      switch (tap2) {
        case 1: bi2 = paper[this.state.pStat2].img;
                bn2 = paper[this.state.pStat2].name; break;
        case 2: bi2 = rock[this.state.rStat2].img;
                bn2 = rock[this.state.rStat2].name; break;
        case 3: bi2 = scissors[this.state.sStat2].img;
                bn2 = scissors[this.state.sStat2].name; break;
        default:
      }
      bn2 = (bn2.replace(' ', '_')).toLowerCase();

      if ((tap1 === 1 && tap2 === 2) || (tap1 === 2 && tap2 === 3) || (tap1 === 3 && tap2 === 1)) {
        w = 1;
        m1++;
        wi1 = happy1;
        wi2 = sad2;
        if (tap1 === 1) {
          gameStats.paper.won += 1;
        } else if (tap1 === 2) {
          gameStats.rock.won += 1;
        } else {
          gameStats.scissors.won += 1;
        }
      } else if (tap1 !== tap2) {
        w = 2;
        m2++;
        wi1 = sad1;
        wi2 = happy2;
        if (tap1 === 1) {
          gameStats.paper.lost += 1;
        } else if (tap1 === 2) {
          gameStats.rock.lost += 1;
        } else {
          gameStats.scissors.lost += 1;
        }
      } else {
        w = 0;
        wi1 = happy1;
        wi2 = happy2;
        if (tap1 === 1) {
          gameStats.paper.draw += 1;
        } else if (tap1 === 2) {
          gameStats.rock.draw += 1;
        } else {
          gameStats.scissors.draw += 1;
        }
      }

      if (sc !== 0) {
        c = 2;
      }
      if (w === 1) {
        switch (tap1) {
          case 1: h2 -= c * paper[this.state.pStat1].atk; break;
          case 2: h2 -= c * rock[this.state.rStat1].atk; break;
          case 3: h2 -= c * scissors[this.state.sStat1].atk; break;
          default: h2 = 0;
        }
      } else if (w === 2) {
        switch (tap2) {
          case 1: h1 -= c * paper[this.state.pStat2].atk; break;
          case 2: h1 -= c * rock[this.state.rStat2].atk; break;
          case 3: h1 -= c * scissors[this.state.sStat2].atk; break;
          default: h1 = 0;
        }
      }

      if (w === wm) {
        if (wm === 1) {
          sc = 1;
          wi1 = rage1;
        } else if (wm === 2) {
          sc = 2;
          wi2 = rage2;
        }
      } else if (w === 0) {
        if (sc === 0) {
          wm = 0;
        } else {
          if (wm === 1) {
            wi1 = rage1;
          } else if (wm === 2) {
            wi2 = rage2;
          }
        }
      } else {
        sc = 0;
        wm = w;
      }

      tap1 = 0;
      tap2 = 0;

      if (h1 <= 0) {
          Alert.alert('Game Over', 'YOU LOSE! What a great Battle!'
        + '\nLet us have a look at the statistics of your game!.'
      + "\n\n\n ̿̿ ̿̿ ̿̿ ̿'̿'\\͇̿̿\\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿ ",
      [
       // Left to right order
        { text: 'Show Stats (~_^)',
          onPress: () => {
            this.backtrack.stop();
            AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/1079045515');
            AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
              () => {
                AdMobRewarded.removeAllListeners();
                BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                this.props.navigation.navigate('statsPage', { myUid: this.uid, gameStats });
            });
            ToastAndroid.show('Calculating Game Stats... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
            AdMobRewarded.addEventListener('adClosed',
              () => {
                AdMobRewarded.removeAllListeners();
                BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
                this.props.navigation.navigate('statsPage', { myUid: this.uid, gameStats });
              }
            );
          }
        }
     ],
     { cancelable: false }
    );
  } else if (h2 <= 0) {
      Alert.alert('Game Over', 'YOU WIN! What a great Battle!'
    + '\nLet us have a look at the statistics of your game!'
  + "\n\n\n ̿̿ ̿̿ ̿̿ ̿'̿'\\͇̿̿\\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿ ",
  [
   // Left to right order
    { text: 'Show Stats (~_^)',
      onPress: () => {
        this.backtrack.stop();
        AdMobRewarded.setAdUnitID('ca-app-pub-5251664647281296/1079045515');
        AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd()).catch(
          () => {
            AdMobRewarded.removeAllListeners();
            BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
            this.props.navigation.navigate('statsPage', { myUid: this.uid, gameStats });
        });
        ToastAndroid.show('Calculating Game Stats... (▀̿Ĺ̯▀̿ ̿)', ToastAndroid.LONG);
        AdMobRewarded.addEventListener('adClosed',
          () => {
            AdMobRewarded.removeAllListeners();
            BackHandler.removeEventListener('hardwareBackPress', this.backButtonEvent);
            this.props.navigation.navigate('statsPage', { myUid: this.uid, gameStats });
          }
        );
      }
    }
 ],
 { cancelable: false }
);
  }

      this.playTrack(bn1);
      this.setState({
        winner: w,
        winMem: wm,
        supCh: sc,
        inactive: true,

        batImg1: bi1,
        batImg2: null,

        hp1: h1,
        hp2: h2,
        mana1: m1,
        mana2: m2
      }, () => {
        setTimeout(() => {
          this.playTrack(bn2);
          this.setState({ batImg2: bi2 }, () => {
            setTimeout(() => {
              if (w === 1) {
                this.playTrack('woo_hoo');
              } else if (w === 2) {
                this.playTrack('oh_no');
              }
              this.setState({ winImg1: wi1, winImg2: wi2, inactive: false }, this.CPUEvolve);
            }, delay);
          });
        }, delay);
        if (Math.round((this.state.hp1 + this.state.hp2) / 2) < 240 && Ad === 0) {
          Ad = 1;
          AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/9943314140');
          AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
        } else if (Math.round((this.state.hp1 + this.state.hp2) / 2) < 180 && Ad === 1) {
          Ad = 2;
          AdMobInterstitial.setAdUnitID('ca-app-pub-5251664647281296/3508803709');
          AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
        }
      });
    }
  }

  songHandler(x) {
    if (x === songImg) {
      this.backtrack.stop();
      this.setState({ song: noSongImg });
    } else {
      this.backtrack.play(() => { this.backtrack.release(); });
      this.setState({ song: songImg });
    }
  }

  delayHandler() {
    if (delay === 1000) {
      delay = 0;
    } else {
      delay = 1000;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={{ flexDirection: 'row' }}>
          <AdMobBanner
            adSize="smartbanner"
            adUnitID="ca-app-pub-5251664647281296/5549198598"
          />
          <AdMobBanner
            adSize="smartbanner"
            adUnitID="ca-app-pub-5251664647281296/1374163175"
          />
          <AdMobBanner
            adSize="smartbanner"
            adUnitID="ca-app-pub-5251664647281296/4837947221"
          />
        </View>
        <ImageBackground source={background} style={{ flex: 1 }}>

          <View style={styles.statsStyle} >
            {/* Stats Area */}
            <TouchableOpacity
              style={styles.muteStyle}
              onPress={() => this.songHandler(this.state.song)}
            >
              <Image source={this.state.song} style={{ resizeMode: 'contain', height: '100%' }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.speedStyle}
              onPress={() => this.delayHandler()}
            >
              <Image source={speedImg} style={{ resizeMode: 'contain', height: '100%' }} />
            </TouchableOpacity>

            <View style={[styles.statsContainerStyle, { left: '15%', borderColor: 'blue' }]}>
              <Text style={[styles.textStyle, { color: 'blue', padding: 5, fontSize: f * 13 }]}>
                HP : {this.state.hp1}{'\n'}
                MANA : {this.state.mana1}{'\n'}
                {scissors[this.state.sStat1].name} : {this.supChDisp(1, scissors[this.state.sStat1].atk)}{'\n'}
                {rock[this.state.rStat1].name} : {this.supChDisp(1, rock[this.state.rStat1].atk)}{'\n'}
                {paper[this.state.pStat1].name} : {this.supChDisp(1, paper[this.state.pStat1].atk)}{'\n'}
              </Text>
            </View>

            <View style={[styles.statsContainerStyle, { left: '48%', borderColor: 'red' }]}>
              <Text style={[styles.textStyle, { color: 'red', padding: 5, fontSize: f * 13 }]}>
              HP : {this.state.hp2}{'\n'}
              MANA : {this.state.mana2}{'\n'}
              {scissors[this.state.sStat2].name} : {this.supChDisp(2, scissors[this.state.sStat2].atk)}{'\n'}
              {rock[this.state.rStat2].name} : {this.supChDisp(2, rock[this.state.rStat2].atk)}{'\n'}
              {paper[this.state.pStat2].name} : {this.supChDisp(2, paper[this.state.pStat2].atk)}{'\n'}
              </Text>
            </View>

          </View>
          <View style={{ flex: 0.6, flexDirection: 'row' }}>
            {/* Bottom Area */}
            <View style={{ flex: 0.65 }} >
              {/* Left Bottom Area */}
              <View style={{ flex: 0.65 }}>
                {/* Characters Area */}
                <Image source={this.state.winImg1} style={styles.p1Style} />
                <Image source={this.state.winImg2} style={styles.p2Style} />
              </View>
              <View style={{ flex: 0.35 }}>
                {/* Weapon Area */}
                <Text style={[styles.pLabelStyle, { color: 'blue', left: '15%' }]}>PLAYER</Text>
                <Image source={this.state.batImg1} style={styles.p1WeaponStyle} />
                <Image source={this.state.batImg2} style={styles.p2WeaponStyle} />
                <Text style={[styles.pLabelStyle, { color: 'red', left: '82%', bottom: '70%' }]}>CPU</Text>
              </View>
            </View>
            <View style={{ flex: 0.35, justifyContent: 'flex-end' }} >
              {/* Buttons Area */}

              <View style={{ width: '100%', height: '25%', flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ width: '75%' }}
                  disabled={this.state.inactive}
                  onPress={() => {
                    tap1 = 3;
                    this.CPUPlay();
                  }}
                >
                  <Image source={sciButton} style={styles.buttonStyle} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: 'blue' }]}>
                      {scissors[this.state.sStat1].name}
                    </Text>
                    <Text style={[styles.textStyle, { color: 'red' }]}>
                      ATK: {this.supChDisp(1, scissors[this.state.sStat1].atk)}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: '25%' }}
                  onPress={() => this.manaUser(1, 3)}
                >
                  {this.manaChecker(1, 3)}
                </TouchableOpacity>
              </View>
              {/*---------------------------------------------------------------*/}
              <View style={{ width: '100%', height: '25%', flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ width: '75%' }}
                  disabled={this.state.inactive}
                  onPress={() => {
                    tap1 = 2;
                    this.CPUPlay();
                  }}
                >
                  <Image source={rockButton} style={styles.buttonStyle} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: 'blue' }]}>
                      {rock[this.state.rStat1].name}
                    </Text>
                    <Text style={[styles.textStyle, { color: 'red' }]}>
                      ATK: {this.supChDisp(1, rock[this.state.rStat1].atk)}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: '25%' }}
                  onPress={() => this.manaUser(1, 2)}
                >
                  {this.manaChecker(1, 2)}
                </TouchableOpacity>
              </View>
              {/*---------------------------------------------------------------*/}
              <View style={{ width: '100%', height: '25%', flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{ width: '75%' }}
                  disabled={this.state.inactive}
                  onPress={() => {
                    tap1 = 1;
                    this.CPUPlay();
                  }}
                >
                  <Image source={paperButton} style={styles.buttonStyle} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, { color: 'blue' }]}>
                      {paper[this.state.pStat1].name}
                    </Text>
                    <Text style={[styles.textStyle, { color: 'red' }]}>
                      ATK: {this.supChDisp(1, paper[this.state.pStat1].atk)}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: '25%' }}
                  onPress={() => this.manaUser(1, 1)}
                >
                  {this.manaChecker(1, 1)}
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = {
  p1Style: {
    resizeMode: 'contain',
    position: 'absolute',
    height: '100%',
    width: '50%',
    top: '5%',
    left: '0%'
  },
  p2Style: {
    resizeMode: 'contain',
    position: 'absolute',
    height: '100%',
    width: '50%',
    top: '0%',
    left: '65%'
  },
  p1WeaponStyle: {
    resizeMode: 'contain',
    position: 'absolute',
    height: '80%',
    width: '50%',
    bottom: '35%',
    left: '15%'
  },
  p2WeaponStyle: {
    resizeMode: 'contain',
    position: 'absolute',
    height: '80%',
    width: '50%',
    bottom: '35%',
    left: '43%'
  },
  buttonStyle: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0%'
  },
  arrowStyle: {
    resizeMode: 'stretch',
    position: 'absolute',
    width: '90%',
    height: '100%',
    right: '0%'
  },
  textContainer: {
    flex: 1,
    left: '10%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: f * 15,
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 },
    fontStyle: 'italic'
  },
  statsContainerStyle: {
    position: 'absolute',
    top: '20%',
    borderWidth: 3,
    borderRadius: 15
  },
  statsStyle: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pLabelStyle: {
    fontSize: f * 15,
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 },
    bottom: '65%',
    position: 'absolute',
    fontStyle: 'italic'
  },
  muteStyle: {
    position: 'absolute',
    top: '1%',
    left: '0%',
    height: '40%',
    width: '20%'
  },
  speedStyle: {
    position: 'absolute',
    top: '43%',
    left: '-4%',
    height: '31%',
    width: '21%'
  }
};

export default MainFrameLocal;
