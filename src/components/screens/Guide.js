import React from 'react';
import { Image, ScrollView, ImageBackground, PixelRatio } from 'react-native';

const backImg = require('../../images/backgroundBlur.jpg');
const page1 = require('../../images/guide/page1.png');
const page2 = require('../../images/guide/page2.png');
const page3 = require('../../images/guide/page3.png');
const page4 = require('../../images/guide/page4.png');

const f = PixelRatio.getFontScale();

const Guide = () => {
  return (
    <ImageBackground source={backImg} style={{ flex: 1 }} >
      <ScrollView style={{ flex: 1 }}>
        <Image source={page1} style={styles.imageStyle} />
        <Image source={page2} style={styles.imageStyle} />
        <Image source={page3} style={styles.imageStyle} />
        <Image source={page4} style={styles.imageStyle} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = {
  imageStyle: {
    resizeMode: 'contain',
    height: f * 400,
    width: '100%'
  }
};

export default Guide;
