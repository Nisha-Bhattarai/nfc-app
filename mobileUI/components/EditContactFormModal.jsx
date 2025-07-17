import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import FormInput from './formInput'
import Colors from '../constants/Colors'

const EditContactFormModal = () => {
  return (
    <View style={styles.bottomSheetContainer}>
        <View style={styles.container}>
            <Image style={styles.avatarImage} source={require('../assets/images/avatar.png')}/>
            <Text style={styles.textName}>John Doe</Text>
            <View style={styles.emailInput}>
                <Ionicons name="mail-outline" size={30} color="#555" />
                <FormInput 
                placeholder="Email"/>
            </View>
            <View style={styles.phoneInput}>
                <AntDesign name="phone" size={30} color="black" />
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
        <MaterialIcons name="update" size={22} color={Colors.accent} />
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EditContactFormModal

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