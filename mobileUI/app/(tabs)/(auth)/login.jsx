import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View style={styles.container}>
      <Text>LogIn Screen</Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', // 👈 important
      justifyContent: 'center',
      alignItems: 'center',
    },
  });