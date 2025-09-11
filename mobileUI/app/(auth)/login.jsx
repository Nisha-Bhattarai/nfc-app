import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from "../../constants/Colors";
import { useRouter } from 'expo-router';
import { useLoginState } from '../../states/useLoginState';
import { loginUser } from '../../viewmodels/auth/LoginViewModel';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';

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

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.trim().length < 5) {
      setError('Please enter a valid password (at least 5 characters).');
      return;
    }

    setLoading(true);

    await loginUser(
      email,
      password,
      (userData) => {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
        });
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
        {/* Email Input */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#718096"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input with eye toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#718096"
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={22}
              color="#4A5568"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        {/* <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity> */}

        {/* Error Message */}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={{ height: 20 }} />
        )}

        {/* Sign In Button */}
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
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    width: '100%',
    fontFamily: 'Lato_400Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    marginBottom: 20,
    height: 60,
    paddingRight: 8,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  eyeIcon: {
    paddingHorizontal: 8,
  },
  forgotText: {
    color: Colors.accent,
    marginBottom: 32,
    textAlign: 'right',
    fontFamily: 'Lato_400Regular',
    fontSize: 16,
  },
  errorText: {
    color: Colors.delete,
    marginBottom: 20,
    textAlign: 'start',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
  },
  signInButton: {
    height: 60,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
  },
});
