import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from "../../../constants/Colors"

const CreateAccount = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.nameRow}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#718096"
            style={[styles.input, styles.halfInput]}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#718096"
            style={[styles.input, styles.halfInput, { marginLeft: 10 }]}
          />
        </View>

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

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setIsChecked(!isChecked)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
            {isChecked && <MaterialIcons name="check" size={18} color="white" />}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.link}>Terms & Conditions</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountButtonText}>Create Account</Text>
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
    },
    halfInput: {
      flex: 1,
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
      fontSize: 14,
      color: Colors.textPrimary,
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    link: {
      color: Colors.accent,
      fontWeight: '500',
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
      fontWeight: '600',
    },
  });
  