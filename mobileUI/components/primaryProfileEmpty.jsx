import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from "../constants/Colors"
import { useRouter } from 'expo-router'

const PrimaryProfileEmpty = () => {
   const router = useRouter();

  return (
    <View style={styles.container}>
        <View style={styles.backgroundContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Hi, Mary! </Text>
                <Text style={styles.text}>No profile has been created yet. </Text>
                <Text style={styles.text}>Create a new one to get started!</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/createPrimaryProfile')}>
                <Text style={styles.buttonText}>+ Create a New Profile</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    backgroundContainer: {
        backgroundColor: Colors.secondary,
        margin: 16,
        flex: 1,
        padding: 16,
        borderRadius: 18,
        alignItems: 'center',
    },
    textContainer: {
        marginTop: 100
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Lato_400Regular',
        color: Colors.textPrimary,
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
    backgroundColor: '#fff',
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 5,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16
  },
  buttonText: {
    color: Colors.accent,
    fontSize: 16,
  },
})

export default PrimaryProfileEmpty