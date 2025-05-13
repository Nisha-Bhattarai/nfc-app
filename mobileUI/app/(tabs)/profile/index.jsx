import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../../constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Profile = () => {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Mary! Welcome to your profile page.</Text>
      <Text  style={styles.subtitle}>Manage your profiles below — choose what to share and when.</Text>
      <View style={styles.profileContainer}>
        <Text style={styles.text}>Primary Profile</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/primaryProfile')}>
          <AntDesign style={styles.rightIcon} name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.text}>Event Profile</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/eventProfile')}>
          <AntDesign style={styles.rightIcon} name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,         
    backgroundColor: '#fff',
    padding: 16,   
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontFamily: "Lato_700Bold",
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center'
  },
  subtitle: {
    fontFamily: "Lato_400Regular",
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center"
  },
  profileContainer: {
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
})