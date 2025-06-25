import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,ActivityIndicator} from 'react-native';
import Colors from "../../constants/Colors"
import { useRouter } from 'expo-router';
import { useLoginState } from '../../states/useLoginState';
import { loginUser } from '../../viewmodels/auth/LoginViewModel';

const Login = () => {
  const router = useRouter();
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    error,
    setError,
  } = useLoginState();

  const handleSignIn = async () => {
    setLoading(true);
    setError('');

    await loginUser(email, password,
      (userData) => {
        setLoading(false);
        router.replace('/(tabs)');
      },
      (message) => {
        setLoading(false);
        setError(message);
      }
    );
  };
  return (
    <View style={styles.container}>
      
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#718096"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#718096"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}


          {/* <TouchableOpacity style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity> */}

           <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signInButtonText}>Sign In</Text>
          )}
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
      height: 60,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 10,
      paddingHorizontal: 16,
      fontSize: 16,
      marginBottom: 20, // Space between input fields
      width: '100%', // Ensure inputs take full width
      fontFamily: 'Lato_400Regular'
    },
    forgotText: {
      color: Colors.accent,
      marginBottom: 32, // Space between Forgot Password? and the Sign In button
      textAlign: 'right',
      fontFamily: 'Lato_400Regular',
      fontSize: 16,
    },
    signInButton: {
      height: 60,
      backgroundColor: Colors.accent,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%', // Ensure the button takes the full width
    },
    signInButtonText: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'Poppins_400Regular'
    },
  });
  