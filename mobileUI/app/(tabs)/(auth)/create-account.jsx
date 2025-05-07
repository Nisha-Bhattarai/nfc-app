import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CreateAccount = () => {
  return (
    <View style={styles.container}>
      <Text>Create Account Screen</Text>
    </View>
  )
}

export default CreateAccount

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // 👈 important
      justifyContent: 'center',
      alignItems: 'center',
    },
  });