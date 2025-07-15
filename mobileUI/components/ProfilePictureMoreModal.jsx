import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../constants/Colors';

const ProfilePictureMoreModal = () => {
  return (
    <View style={styles.bottomSheetContainer}>
      <TouchableOpacity style={styles.addPicture}>
        <EvilIcons name="camera" style={styles.icon} size={30} color="black" />
        <Text style={styles.addPictureText}>Add Picture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deletePicture}>
        <AntDesign name="delete" style={styles.icon} size={24} color={Colors.delete} />
        <Text style={styles.deletePictureText}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfilePictureMoreModal

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flexDirection: 'column',
        gap: 25,
        paddingTop: 20,
        paddingBottom: 20
    },
    addPicture: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    addPictureText: {
        fontSize: 18,
        color: Colors.textPrimary
    },
    deletePicture: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',

    },
    deletePictureText: {
        color: Colors.delete,
        fontSize: 18,
    },
    icon: {
        width: 30,
    }
})