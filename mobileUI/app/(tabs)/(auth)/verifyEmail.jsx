import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^[0-9]$/.test(text) || text === '') {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text !== '' && index < 5) {
        inputs.current[index + 1].focus();
      } else if (text === '' && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.subtitle}>
        Enter code we've sent to your inbox{' '}
        <Text style={styles.emailText}>hello@gmail.com</Text>
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeBox}
            keyboardType="number-pad"
            maxLength={1}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <Text style={styles.resendText}>
        Didn’t get the code?{' '}
        <Text style={styles.resendLink}>Resend it.</Text>
      </Text>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4A4A4A',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  emailText: {
    fontWeight: '600',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeBox: {
    width: 60,
    height: 60,
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 8,
  },
  resendText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
    color: '#4A4A4A',
  },
  resendLink: {
    color: '#E7721A',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#E7721A',
    height: 65,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
