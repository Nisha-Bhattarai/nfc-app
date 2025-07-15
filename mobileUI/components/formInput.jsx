// components/FormInput.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const FormInput = ({ placeholder, style, ...rest }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}
      placeholderTextColor={Colors.inputBorder}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20, // Space between input fields
    width: '100%', // Ensure inputs take full width
    fontFamily: 'Lato_400Regular',
  },
});

export default FormInput;
