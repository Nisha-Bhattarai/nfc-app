import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const ProfileLayout = () => {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}

export default ProfileLayout