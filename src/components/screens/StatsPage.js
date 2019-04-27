import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  PixelRatio,
  ToastAndroid
} from 'react-native';
import { AdMobBanner, AdMobRewarded } from 'react-native-admob';

let f = 1;

const backImg = require('../../images/backgroundBlur.jpg');

const table = {
  row0: {
    cell0: {
      text: '｡◕‿◕｡',
      bgColor: '#A020F080',
      size: f * 14,
      weight: 'bold'
    },
    cell1: {
      text: 'Played',
      bgColor: '#A020F080',
    },
    cell2: {
      text: 'Won',
      bgColor: '#A020F080'
    },
    cell3: {
      text: 'Lost',
      bgColor: '#A020F080'
    },
    cell4: {
      text: 'Drew',
      bgColor: '#A020F080'
    }
  },
  row1: {
    cell0: {
      text: 'Overall',
      bgColor: '#A020F080',
      size: f * 12,
      weight: 'normal'
    },
    cell1: {
      text: 0,
      bgColor: '#0000CD66',
    },
    cell2: {
      text: 0,
      bgColor: '#0000CD66'
    },
    cell3: {
      text: 0,
      bgColor: '#0000CD66'
    },
    cell4: {
      text: 0,
      bgColor: '#0000CD66'
    }
  },
  row2: {
    cell0: {
      text: 'Scissors',
      bgColor: '#A020F080',
      size: f * 11,
      weight: 'bold'
    },
    cell1: {
      text: 0,
      bgColor: '#0000CD66',
    },
    cell2: {
      text: 0,
      bgColor: '#00FFFF66'
    },
    cell3: {
      text: 0,
      bgColor: '#00FFFF66'
    },
    cell4: {
      text: 0,
      bgColor: '#00FFFF66'
    }
  },
  row3: {
    cell0: {
      text: 'Rock',
      bgColor: '#A020F080',
      size: f * 15,
      weight: 'normal'
    },
    cell1: {
      text: 0,
      bgColor: '#0000CD66',
    },
    cell2: {
      text: 0,
      bgColor: '#00FFFF66'
    },
    cell3: {
      text: 0,
      bgColor: '#00FFFF66'
    },
    cell4: {
      text: 0,
      bgColor: '#00FFFF66'
    }
  },
  row4: {
    cell0: {
      text: 'Paper',
      bgColor: '#A020F080',
      size: f * 15,
      weight: 'normal'
    },
    cell1: {
      text: 0,
      bgColor: '#0000CD66',
    },
    cell2: {
      text: 0,
      bgColor: '#00FFFF66'
    },
    cell3: {
      text: 0,
      bgColor: '#00FFFF66'
    },
    cell4: {
      text: 0,
      bgColor: '#00FFFF66'
    }
  }
};

class StatsPage extends Component {

  constructor(props) {
    super(props);
    AdMobRewarded.removeAllListeners();
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    f = PixelRatio.getFontScale(); //Font Factor

    this.uid = this.props.navigation.state.params.uid;
    const gameStats = this.props.navigation.state.params.gameStats;

    table.row2.cell2.text = gameStats.scissors.won;
    table.row2.cell3.text = gameStats.scissors.lost;
    table.row2.cell4.text = gameStats.scissors.draw;

    table.row3.cell2.text = gameStats.rock.won;
    table.row3.cell3.text = gameStats.rock.lost;
    table.row3.cell4.text = gameStats.rock.draw;

    table.row4.cell2.text = gameStats.paper.won;
    table.row4.cell3.text = gameStats.paper.lost;
    table.row4.cell4.text = gameStats.paper.draw;

    table.row2.cell1.text = table.row2.cell2.text + table.row2.cell3.text + table.row2.cell4.text;
    table.row3.cell1.text = table.row3.cell2.text + table.row3.cell3.text + table.row3.cell4.text;
    table.row4.cell1.text = table.row4.cell2.text + table.row4.cell3.text + table.row4.cell4.text;

    table.row1.cell2.text = table.row2.cell2.text + table.row3.cell2.text + table.row4.cell2.text;
    table.row1.cell3.text = table.row2.cell3.text + table.row3.cell3.text + table.row4.cell3.text;
    table.row1.cell4.text = table.row2.cell4.text + table.row3.cell4.text + table.row4.cell4.text;

    table.row1.cell1.text = table.row1.cell2.text + table.row1.cell3.text + table.row1.cell4.text;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.handleBack());
  }

  handleBack() {
    this.props.navigation.navigate('homePage', { myUid: this.uid });
    return true;
  }

  renderRow(row) {
    //Row with 5 cells
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.cellStyle, { backgroundColor: row.cell0.bgColor }]}>
          <Text style={[styles.textStyle, { fontSize: row.cell0.size, fontWeight: row.cell0.weight }]}>{row.cell0.text}</Text>
        </View>
        <View style={[styles.cellStyle, { backgroundColor: row.cell1.bgColor }]}>
          <Text style={styles.textStyle}>{row.cell1.text}</Text>
        </View>
        <View style={[styles.cellStyle, { backgroundColor: row.cell2.bgColor }]}>
          <Text style={styles.textStyle}>{row.cell2.text}</Text>
        </View>
        <View style={[styles.cellStyle, { backgroundColor: row.cell3.bgColor }]}>
          <Text style={styles.textStyle}>{row.cell3.text}</Text>
        </View>
        <View style={[styles.cellStyle, { backgroundColor: row.cell4.bgColor }]}>
          <Text style={[styles.textStyle, {}]}>{row.cell4.text}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ImageBackground source={backImg} style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.52, padding: '1%', top: '2%' }}>
          <Text style={[styles.titleStyle, { color: '#e64460' }]}>
            GAME STATS
          </Text>
          {this.renderRow(table.row0)}
          {this.renderRow(table.row1)}
          {this.renderRow(table.row2)}
          {this.renderRow(table.row3)}
          {this.renderRow(table.row4)}
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('homePage', { myUid: this.uid })}
          >
            <Text style={[styles.titleStyle, { color: 'white' }]}>
              DONE  ᕕ(ᐛ)ᕗ
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.48, justifyContent: 'space-around' }}>
          <View style={{ marginBottom: '1%' }}>
            <AdMobBanner
              adSize="smartbanner"
              adUnitID="ca-app-pub-5251664647281296/7431565405"
            />
          </View>
          <View style={{ marginBottom: '1%' }}>
            <AdMobBanner
              adSize="largeBanner"
              adUnitID="ca-app-pub-5251664647281296/4786765355"
            />
          </View>
          <View style={{ marginBottom: '1%' }}>
            <AdMobBanner
              adSize="largeBanner"
              adUnitID="ca-app-pub-5251664647281296/7384190290"
            />
          </View>
          <View>
            <AdMobBanner
              adSize="largeBanner"
              adUnitID="ca-app-pub-5251664647281296/5747674991"
            />
          </View>
          <View style={{ marginTop: '1%' }}>
            <AdMobBanner
              adSize="smartbanner"
              adUnitID="ca-app-pub-5251664647281296/5472342820"
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  cellStyle: {
    flex: 1,
    borderColor: '#2ad8c6',
    borderWidth: 1,
    borderRadius: 7,
    alignSelf: 'stretch'
  },
  textStyle: {
    color: 'white',
    fontSize: f * 15,
    alignSelf: 'center',
    padding: '15%'
  },
  titleStyle: {
    alignSelf: 'center',
    fontSize: f * 21,
    padding: '3%',
    textShadowColor: 'grey',
    textShadowOffset: { width: 1, height: 1 },
    fontStyle: 'italic'
  }
};

export default StatsPage;
