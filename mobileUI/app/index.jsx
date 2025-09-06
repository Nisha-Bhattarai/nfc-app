import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from "../constants/Colors";
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === null) return;

    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/(auth)');
    }
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#E7721A" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
  },
  greetingHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Lato_400Regular",
    color: Colors.textPrimary,
  },
  image: {
    width: 42,
    height: 42,
  },
});
