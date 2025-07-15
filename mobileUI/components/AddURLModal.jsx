import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import FormInput from './formInput'

const AddURLModal = () => {
  return (
    <View style={styles.bottomSheetContainer}>
      <Text style={styles.title}>Add a New URL</Text>
      <FormInput 
      placeholder='URL Title'
      />
      <FormInput 
      placeholder='Add your URL here'
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add URL</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddURLModal

const styles = StyleSheet.create({
    bottomSheetContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        color: Colors.accent,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 10,
    },
    addButton: {
        height: 50,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular'
    },
})