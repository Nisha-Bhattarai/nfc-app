import PrimaryProfileEmpty from '../../../components/primaryProfileEmpty'

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import PrimaryProfileCard from '../../../components/primaryProfileCard'
import { useRouter } from 'expo-router'
import { usePrimaryProfileListState } from '../../../states/usePrimaryProfileListState';

const PrimaryProfileList = () => {
    const router = useRouter();
      const { profiles, loading, error } = usePrimaryProfileListState();

  return (
    <View style={styles.container}>
        <View style={styles.backgroundContainer}>
            <View style={styles.addNewContactButton}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/createPrimaryProfile')}>
                    <Text style={styles.buttonText}>+ Add a New Profile</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
          <ActivityIndicator size="large" color={Colors.accent} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {profiles.map((profile) => (
              <PrimaryProfileCard
                key={profile._id}
                name={`${profile.firstName} ${profile.lastName}`}
                position={`${profile.jobTitle} - ${profile.company}`}
                createdDate={new Date(profile.createdAt).toDateString()}
                modifiedDate={new Date(profile.updatedAt).toDateString()}
              />
            ))}
          </ScrollView>
        )}
            
        </View>
    </View>
  )
}

export default PrimaryProfileList

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

