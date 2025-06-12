import { View, Text, StyleSheet, Image, ScrollView,  } from 'react-native';
import { Link } from 'expo-router';
import Colors from "../../constants/Colors";
import EventAnalytics from "../../components/eventAnalytics"
import ProfileAnalytics from "../../components/profileAnalytics"


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
      {/* <ProfileAnalytics /> */}
      <EventAnalytics />
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
