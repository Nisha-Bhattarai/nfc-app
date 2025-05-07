import { View, Text, StyleSheet,  } from 'react-native';
import { Link } from 'expo-router';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>123</Text>

      <Link href="/(auth)">Tab</Link>
      <Link href="/(auth)/login">Login</Link>
      <Link href="/(auth)/create-account">Create An Account</Link>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  text: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
