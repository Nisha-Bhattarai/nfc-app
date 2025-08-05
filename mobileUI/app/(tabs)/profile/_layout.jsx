import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ProfileLayout = () => {

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen name='index' options={{title: 'Profile'}} />
        <Stack.Screen name='primaryProfileList' options={{title: 'Primary Profile'}} />
        <Stack.Screen name='createPrimaryProfile' options={{title: 'Create Primary Profile'}} />
        <Stack.Screen name='eventProfileList' options={{ title: 'Event Profile' }} />
        <Stack.Screen name='createEventProfile' options={{ title: 'Create Event Profile' }} />
        </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}

export default ProfileLayout
