import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Linking, Alert, ActivityIndicator, AppState, AppStateStatus } from 'react-native';
import Colors from '../../../constants/Colors';
import LabeledInput from '../../../components/labeledInput'
import { MaterialIcons } from '@expo/vector-icons';
import { clearSession } from '../../../utils/sessionStorage'
import { getSession } from '../../../utils/sessionStorage';
import { useRouter } from 'expo-router';
import { useMoreMenuState } from '../../../states/useMoreMenuState';
import { disconnectHubspot, changePassword } from '../../../viewmodels/auth/MoreMenuViewModel';
import { useFocusEffect } from '@react-navigation/native';

const More = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userDetails, loading, error, reload } = useMoreMenuState();
  const [forgotPasswordLoding, setForgotPasswordLoding] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
      reload();
      return () => { };
    }, [])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        reload();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.user.firstName + ' ' + userDetails.user.lastName); // combine if needed
      setEmail(userDetails.user.email);
      setPhone(userDetails.user.phone); // assuming userDetails has phone
    }
  }, [userDetails]);


  const handleConnectHubSpot = async () => {
    try {
      const session = await getSession();
      if (!session?.user?.id) return Alert.alert("Error", "User not found");

      const userId = session.user.id;

      Alert.alert(
        "Redirecting",
        "Please complete HubSpot connection in your browser.",
        [
          {
            text: "OK",
            onPress: () => {
              const url = `https://nfc-be.onrender.com/api/v1/hubspotauth/connect?userId=${userId}`;
              Linking.openURL(url);
            },
          },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to connect HubSpot.");
    }
  };


  const handleDisconnectHubspot = async () => {
    disconnectHubspot(() => {
      reload();
    },
      (errMessage) => {
        alert(errMessage);
      }
    );
  };

  const handleChangePassword = async () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return Alert.alert("Error", "All fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert("Error", "New password and confirm password do not match.");
    }

    setForgotPasswordLoding(true);

    await changePassword(currentPassword, newPassword, (res) => {
      setForgotPasswordLoding(false);
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      alert(res);
    },
      (errMessage) => {
        setForgotPasswordLoding(false)
        alert(errMessage);
      }
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.accent} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Personal Information</Text>
            <LabeledInput
              label="Name"
              placeholder="Name"
              iconName="user-edit"
              keyboardType="default"
              value={name}
              onChangeText={setName}
              readOnly={true}
            />
            <LabeledInput
              label="Email"
              placeholder="Email"
              iconName="alternate-email"
              keyboardType="default"
              value={email}
              onChangeText={setEmail}
              iconLibrary="MaterialIcons"
              readOnly={true}
            />
            <LabeledInput
              label="Phone"
              placeholder="Phone"
              iconName="phone"
              keyboardType="default"
              value={phone}
              onChangeText={setPhone}
              readOnly={true}
            />

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.selectableButton,
                  userDetails?.hubspotConnection ? styles.selectableButtonSelected : null
                ]}
                onPress={(userDetails?.hubspotConnection) ? handleDisconnectHubspot : handleConnectHubSpot}
                activeOpacity={0.8}
              >
                <Text style={{
                  color: (userDetails?.hubspotConnection) ? Colors.white : Colors.accent,
                  fontSize: 16,
                  fontWeight: "600"
                }}>
                  {userDetails?.hubspotConnection ? 'Disconnect from Hubspot CRM' : 'Connect to Hubspot CRM'}
                </Text>
              </TouchableOpacity>
            </View>
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

            <TouchableOpacity
              style={[styles.updateButton, forgotPasswordLoding && { opacity: 0.6 }]}
              onPress={handleChangePassword}
              disabled={forgotPasswordLoding}>
              <MaterialIcons name="update" size={22} color="white" />
              <Text style={styles.updateButtonText}>
                {forgotPasswordLoding ? "Changing..." : "Change Password"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcons name="logout" size={22} color={Colors.accent} />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
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
  selectableButton: {
    height: 50,
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    marginTop: 32,
    marginBottom: 32
  },

  selectableButtonSelected: {
    backgroundColor: Colors.accent,
    marginVertical: 10,
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
