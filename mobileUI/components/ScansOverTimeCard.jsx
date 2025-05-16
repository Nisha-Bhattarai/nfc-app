import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const ScansOverTimeCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scans Over Time</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 16,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 18,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textPrimary,
    }
})
export default ScansOverTimeCard