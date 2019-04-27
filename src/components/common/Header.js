// Importing
import React from 'react';
import { Text, View } from 'react-native';

// Creating
const Header = (props) => (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{props.children}</Text>
    </View>
  );

const styles = {
  textStyle: {
    fontSize: 30,
    color: '#007aff',
    textShadowColor: '#ddd',
    textShadowOffset: { height: 3, width: 2 }
  },
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    elevation: 5,
    position: 'relative'
  }
};
// Exporting
export { Header };
