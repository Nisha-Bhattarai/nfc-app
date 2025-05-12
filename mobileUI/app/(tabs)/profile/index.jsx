import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'
import { AntDesign } from '@expo/vector-icons'

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Hello Mary! Welcome to your profile page.</Text>
        <Text  style={styles.subtitle}>Manage your profiles below — choose what to share and when.</Text>
        <View style={styles.primaryProfileContainer}>
          <Text style={styles.text}>Primary Profile</Text>
          <AntDesign style={styles.rightIcon} name="right" size={24} color="black" />
        </View>
        <View style={styles.eventProfileContainer}>
          <Text style={styles.text}>Event Profile</Text>
          <AntDesign style={styles.rightIcon} name="right" size={24} color="black" />
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,            
    backgroundColor: '#fff',
  },
  subContainer: {
    margin: 16, 
    justifyContent: 'center',   
    alignItems: 'center', 
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center"
  },
  primaryProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 72,
    backgroundColor: Colors.secondary,
    width: '100%',
    borderRadius: 15,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Lato_700Bold'
  },
  rightIcon: {
    fontSize: 16,
  },
  eventProfileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 72,
    backgroundColor: Colors.secondary,
    width: '100%',
    borderRadius: 15,
    marginBottom: 16,
  },
})