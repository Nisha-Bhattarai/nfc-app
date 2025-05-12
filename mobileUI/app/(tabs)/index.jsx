import { View, Text, StyleSheet,  } from 'react-native';
import { Link } from 'expo-router';

const App = () => {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to NFC App</Text>

      <Link style={styles.text} href="/(auth)">Tab</Link>
      <Link style={styles.text} href="/(auth)/login">Login</Link>
      <Link style={styles.text} href="/(auth)/create-account">Create An Account</Link>
      <Link style={styles.text} href="/(auth)/verifyEmail">Verify Email</Link>
    </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  heading: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular'
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'lato_400Regular'
  }
});
