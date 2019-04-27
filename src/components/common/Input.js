import React from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = (props) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{props.label}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={inputStyle}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    height: 40,
    width: 200,
    color: '#000',
    //paddingRight: 5,
    //paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    //flex: 1
  },

  labelStyle: {
    fontSize: 18,
    paddingLeft: 35,
    paddingRight: 50
    //flex: 1
  },

  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
};

export { Input };
