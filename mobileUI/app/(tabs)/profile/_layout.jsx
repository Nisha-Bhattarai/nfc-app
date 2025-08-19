import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          header: ({ navigation, options, back }) => (
            <View style={styles.header}>
              {back ? (
                <TouchableOpacity
                  onPress={navigation.goBack}
                  style={styles.backButton}
                >
                  <Ionicons name="arrow-back" size={20} color="black" />
                </TouchableOpacity>
              ) : null}
              <Text style={styles.title}>{options.title}</Text>
            </View>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Profile' }} />
        <Stack.Screen
          name="primaryProfileList"
          options={{ title: 'Primary Profile' }}
        />
        <Stack.Screen
          name="createPrimaryProfile"
          options={{ title: 'Create Primary Profile' }}
        />
        <Stack.Screen
          name="eventProfileList"
          options={{ title: 'Event Profile' }}
        />
        <Stack.Screen
          name="createEventProfile"
          options={{ title: 'Create Event Profile' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({
  header: {
    height: 48, // reduced height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f3f3f3ff',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
