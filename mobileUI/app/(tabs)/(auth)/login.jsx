import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#718096"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#718096"
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
   
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1, // Ensure the container takes up the full screen
      backgroundColor: 'white',
      justifyContent: 'flex-start', // Align children to the top
    },
    formContainer: {
      paddingHorizontal: 16, // Padding left and right for the form
      paddingBottom: 32, // Space at the bottom of the form
    },
    input: {
      height: 65,
      borderWidth: 1,
      borderColor: '#d3d3d3',
      borderRadius: 10,
      paddingHorizontal: 16,
      fontSize: 16,
      marginBottom: 20, // Space between input fields
      width: '100%', // Ensure inputs take full width
    },
    forgotText: {
      color: '#E7721A',
      marginBottom: 32, // Space between Forgot Password? and the Sign In button
      textAlign: 'right',
    },
    signInButton: {
      height: 65,
      backgroundColor: '#E7721A',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%', // Ensure the button takes the full width
    },
    signInButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
  });
  