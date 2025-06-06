// screens/More.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../../../constants/Colors';
import LabeledInput from '../../../components/labeledInput'
import { MaterialIcons } from '@expo/vector-icons';

const More = () => {
  const [name, setName] = useState('');
   const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Personal Information</Text>
        <LabeledInput
          label="Name"
          placeholder="Name"
          iconName="user-edit"
          keyboardType="default"
          value={name}
          onChangeText={setName}
        />
        <LabeledInput
          label="Email"
          placeholder="Email"
          iconName="alternate-email"
          keyboardType="default"
          value={name}
          onChangeText={setName}
          iconLibrary="MaterialIcons"
        />
        <LabeledInput
          label="Phone"
          placeholder="Phone"
          iconName="phone"
          keyboardType="default"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.title}>Change Password</Text>
        <LabeledInput
        label="Current Password"
        placeholder="Enter current password"
        iconName="user-lock"
        iconLibrary="FontAwesome5"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <LabeledInput
        label="New Password"
        placeholder="Enter new password"
        iconName="password"
        iconLibrary="MaterialIcons"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <LabeledInput
        label="Confirm Password"
        placeholder="Re-enter new password"
        iconName="download-done"
        iconLibrary="MaterialIcons"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      
      <TouchableOpacity style={styles.logoutButton}>
        <MaterialIcons name="logout" size={22} color={Colors.accent} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  background: {
    backgroundColor: Colors.secondary,
    margin: 16,
    flex: 1,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 20,
    marginTop: 10,
  },
  logoutButton: {
      height: 50,
      borderColor: Colors.accent,
      borderWidth: 2,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      flexDirection: 'row',
      gap: 8,
    },
    logoutButtonText: {
      color: Colors.accent,
      fontSize: 18,
      fontFamily: 'Lato_400Regular',
    },
});
