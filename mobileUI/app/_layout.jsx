import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts as usePoppins, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts as useLato, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import 'react-native-reanimated';
import { Slot } from 'expo-router';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeScreen from '../components/SafeScreen';

export default function RootLayout() {
  const [poppinsLoaded] = usePoppins({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });
  const [latoLoaded] = useLato({ Lato_400Regular, Lato_700Bold });

  if (!poppinsLoaded || !latoLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        {/* <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Home" }} />
          <Stack.Screen name="+not-found" />
        </Stack> */}
          <Slot />
        <StatusBar style="auto" />
      </SafeScreen>
    </SafeAreaProvider>
  );
}
