import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const MoreLayout = () => {

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen name='index' options={{title: 'My Account'}} />
        </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}

export default MoreLayout
