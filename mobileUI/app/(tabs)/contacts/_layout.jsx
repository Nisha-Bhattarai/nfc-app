import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactsLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          header: ({ navigation, options, back }) => (
            <View style={styles.header}>
              {back && (
                <TouchableOpacity
                  onPress={navigation.goBack}
                  style={styles.backButton}
                >
                  <Ionicons name="arrow-back" size={20} color="black" />
                </TouchableOpacity>
              )}
              <Text style={styles.title}>{options.title}</Text>
            </View>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Contacts' }} />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
};

export default ContactsLayout;

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
