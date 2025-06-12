import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import EventProfileCard from './eventProfileCard'
import { useRouter } from 'expo-router'

const EventProfileList = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
        <View style={styles.backgroundContainer}>
            <View style={styles.addNewContactButton}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/createEventProfile')}>
                    <Text style={styles.buttonText}>+ Add a New Profile</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <EventProfileCard 
            name='Mary Wilson'
            position='Financial Advisor Profile'
            createdDate='April 3, 2025'
            modifiedDate='April 7, 2025'
            />
            <EventProfileCard 
            name='Mary Wilson'
            position='Freelancer Profile'
            createdDate='April 20, 2025'
            modifiedDate='May 6, 2025'
            />
            <EventProfileCard 
            name='Mary Wilson'
            position='Freelancer Profile'
            createdDate='April 20, 2025'
            modifiedDate='May 6, 2025'
            />
            </ScrollView>
            
        </View>
    </View>
  )
}

export default EventProfileList

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
    },
    addNewContactButton: {
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: Colors.accent,
    fontSize: 14,
  },
})