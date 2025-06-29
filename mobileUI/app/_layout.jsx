import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts as usePoppins, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts as useLato, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeScreen from '../components/SafeScreen';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  const [poppinsLoaded] = usePoppins({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });
  const [latoLoaded] = useLato({ Lato_400Regular, Lato_700Bold });

  if (!poppinsLoaded || !latoLoaded) return null;

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SafeScreen>
          <Slot /> 
          <StatusBar style="auto" />
          <Toast />
        </SafeScreen>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
