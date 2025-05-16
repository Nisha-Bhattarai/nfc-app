import { View, Text, StyleSheet, Image,  } from 'react-native';
import { Link } from 'expo-router';
import Colors from "../../constants/Colors"

const App = () => {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.greetingHeader}>
        <Text style={styles.headerText}>Hello, Mary!</Text>
        <Image 
          style={styles.image}
          source={require('../../assets/images/avatar.png')} />
      </View>
      <View style={styles.background}>
        <Text>a</Text>
      </View>
    </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
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
  background: {
    backgroundColor: Colors.secondary,
    margin: 16,
    flex: 1,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
});
