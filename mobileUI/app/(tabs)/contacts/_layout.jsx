import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ContactsLayout = () => {

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen name='index' options={{title: 'Contacts'}} />
        </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}

export default ContactsLayout
