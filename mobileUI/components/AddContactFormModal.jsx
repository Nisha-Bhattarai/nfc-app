import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import FormInput from './formInput'
import Colors from '../constants/Colors'

const AddContactFormModal = () => {
  return (
    <View style={styles.bottomSheetContainer}>
        <View style={styles.container}>
            <Image style={styles.avatarImage} source={require('../assets/images/avatar.png')}/>
            <Text style={styles.textName}>John Doe</Text>
            <View style={styles.emailInput}>
                <Ionicons name="mail-outline" size={28} color={Colors.primary} />
                <FormInput 
                placeholder="Email"/>
            </View>
            <View style={styles.phoneInput}>
                <AntDesign name="phone" size={28} color={Colors.primary} />
                <FormInput 
                placeholder="Phone"/>
            </View>
        </View>
        <View style={styles.note}>
            <Text style={styles.noteTitle}>Note:</Text>
            <FormInput 
            placeholder="Enter your notes here..."
            multiline={true}
            numberOfLines={5} 
            style={{ height: 120 }} />
        </View>
        <TouchableOpacity style={styles.updateButton}>
        <AntDesign name="adduser" size={24} color={Colors.accent} />
        <Text style={styles.updateButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddContactFormModal

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 10
    },
    avatarImage: {
        width: 62,
        height: 62,
        borderRadius: 50,
        marginBottom: 10,
    },
    textName: {
        marginBottom: 15,
    },
    emailInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    phoneInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    note: {
        flexDirection: 'column',
        gap: 20,
    },
    noteTitle: {
        fontFamily: 'Lato_700Bold',
        fontSize: 16,
    },
    updateButton: {
    height: 40,
    borderColor: Colors.accent,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  },
  updateButtonText: {
    color: Colors.accent,
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
})