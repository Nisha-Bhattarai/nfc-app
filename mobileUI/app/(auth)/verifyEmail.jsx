import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { verifyEmailOtp, resendEmailOtp } from '../../viewmodels/auth/VerifyEmailViewModel';
import { useVerifyEmailState } from '../../states/useVerifyEmailState';
import Colors from "../../constants/Colors"


const VerifyEmail = () => {
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const [code, setCode] = useState(['', '', '', '', '', '']);

  const {
    loading, setLoading,
    otpLoading, setOtpLoading,
    error, setError,
    success, setSuccess,
  } = useVerifyEmailState();

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

  const handleVerifyEmail = async () => {
    const otp = code.join('');
    setError('');
    setSuccess('');
    if (otp.length !== 6) {
      setError('Please enter the 6-digit code.');
      return;
    }
    setLoading(true);

    await verifyEmailOtp(
      email,
      otp,
      (message) => {
        setLoading(false);
        setSuccess(message);
        router.replace('/(auth)');
      },
      (message) => {
        setLoading(false);
        setError(message);
      }
    );
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    setOtpLoading(true);

    try {
      await resendEmailOtp(
        email,
        (message) => {
          setOtpLoading(false);
          setSuccess(message);
        },
        (message) => {
          setOtpLoading(false);
          setError(message);
        }
      );
    } catch (err) {
      setOtpLoading(false);
      setError(err ?? 'Failed to resend OTP. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Verify your email</Text>
      <Text style={styles.subtitle}>
        Enter code we've sent to your inbox at{' '}
        <Text style={styles.emailText}>{email}</Text>
      </Text>

      {/* OTP boxes */}
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

      {/* Resend row */}
      {otpLoading ? (
        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn’t get the code?</Text>
          <ActivityIndicator size="small" color="#E7721A" style={{ marginLeft: 6 }} />
        </View>
      ) : (
        <Text style={[styles.resendText, { marginTop: 10 }]}>
          Didn’t get the code?{' '}
          <Text onPress={handleResendOtp} style={styles.resendLink}>
            Resend it.
          </Text>
        </Text>
      )}

      {/* Error / Success messages */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      {/* Continue button */}
      <TouchableOpacity
        style={[styles.continueButton, loading && { opacity: 0.7 }]}
        onPress={handleVerifyEmail}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.continueButtonText}>Continue</Text>
        )}
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
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
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
    paddingHorizontal: 10,
  },
  codeBox: {
    width: 50,
    height: 55,
    backgroundColor: '#F5F5F5',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  resendLink: {
    color: '#E7721A',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: Colors.delete,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
  },

  successText: {
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Lato_400Regular',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#E7721A',
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
