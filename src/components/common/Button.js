import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  const { textStyle, buttonStyle } = styles;
  return (
      <TouchableOpacity onPress={props.onPress} style={buttonStyle}>
        <Text style={textStyle}>{props.children}</Text>
      </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#007aff',
    paddingTop: 10,
    paddingBottom: 10,
    textShadowColor: '#ddd',
    textShadowOffset: { height: 3, width: 2 }
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    flex: 1,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5
  }
};

export { Button };
