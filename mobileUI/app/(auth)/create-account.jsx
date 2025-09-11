import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../constants/Colors"
import { useRouter, Link } from 'expo-router';
import { signupUser } from '../../viewmodels/auth/SignUpViewModel';
import { useSignupState } from '../../states/useSignUpState';

const CreateAccount = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess
  } = useSignupState();

  const handleCreateAccount = async () => {
    if (!firstName || firstName.trim().length < 1) {
      setError('Please enter your first name.');
      return;
    }

    if (!lastName || lastName.trim().length < 1) {
      setError('Please enter your last name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password || password.trim().length < 5) {
      setError('Please enter a valid password (at least 5 characters).');
      return;
    }

    if (!isChecked) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const user = { firstName, lastName, email, password };

    await signupUser(
      user,
      (response) => {
        setLoading(false);
        setSuccess(response.message);
        router.push({
          pathname: '/(auth)/verifyEmail',
          params: { email: response.email },
        });
      },
      (message) => {
        setLoading(false);
        setError(message);
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.nameRow}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#718096"
            style={[styles.input, styles.halfInput]}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#718096"
            style={[styles.input, styles.halfInput, { marginLeft: 10 }]}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#718096"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password with eye icon */}
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
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#718096"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setIsChecked(!isChecked)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
              {isChecked && <MaterialIcons name="check" size={18} color="white" />}
            </View>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            I agree to the{' '}
            <Link href="/terms" style={styles.link}>
              Terms & Conditions
            </Link>
          </Text>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleCreateAccount}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Lato_400Regular'
  },
  halfInput: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    marginBottom: 20,
    paddingRight: 12,
  },
  passwordInput: {
    flex: 1,
    height: 60,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center_vertical',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  termsText: {
    fontSize: 16,
    color: Colors.textPrimary,
    flexShrink: 1,
    flexWrap: 'wrap',
    fontFamily: 'Lato_400Regular'
  },
  link: {
    color: Colors.accent,
    fontWeight: '500',
  },
  errorText: {
    color: Colors.delete,
    marginBottom: 20,
    textAlign: 'start',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
  },
  successText: {
    color: 'green',
    marginBottom: 20,
    textAlign: 'start',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
  },
  createAccountButton: {
    height: 60,
    backgroundColor: Colors.accent,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  createAccountButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular'
  },
});
