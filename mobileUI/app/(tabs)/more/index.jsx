// screens/More.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Linking, Alert } from 'react-native';
import Colors from '../../../constants/Colors';
import LabeledInput from '../../../components/labeledInput'
import { MaterialIcons } from '@expo/vector-icons';
import { clearSession } from '../../../utils/sessionStorage'
import { getSession } from '../../../utils/sessionStorage';
import { useRouter } from 'expo-router';

const More = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogout = async () => {
    try {
      // Clear session data
      await clearSession();
      // Reset navigation & go to login
      router.replace('/(auth)');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

   const handleConnectHubSpot = async () => {
    try {
      const session = await getSession();
    if (!session?.user?.id) return Alert.alert("Error", "User not found");
        const userId = session.user.id;

      // 1. Open backend OAuth redirect
      const url = `https://nfc-be.onrender.com/api/v1/hubspotauth/connect?userId=${userId}`;
      Linking.openURL(url);
      Alert.alert("Redirecting", "Please complete HubSpot connection in your browser.");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to connect HubSpot.");
    }
  };


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

          <TouchableOpacity style={styles.updateButton}>
            <MaterialIcons name="update" size={22} color="white" />
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={22} color={Colors.accent} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title="Connect HubSpot CRM" onPress={handleConnectHubSpot} />
          </View>
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
  updateButton: {
    height: 50,
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  updateButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Lato_400Regular',
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
