import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../constants/Colors'

const ContactsMoreModal = ({ onEditPress, onDeletePress, deleting, onDownloadPress }) => {
  return (
    <View style={styles.bottomSheetContainer}>
      <TouchableOpacity style={styles.download} onPress={onDownloadPress}>
        <AntDesign name='download' style={styles.icon} size={24} color={Colors.primary} />
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.edit} onPress={onEditPress}>
        <Feather name="edit" style={styles.icon} size={24} color={Colors.primary} /> 
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.delete} onPress={onDeletePress}>
        <AntDesign name="delete" style={styles.icon} size={24} color={Colors.delete} />
        <Text style={styles.deleteText}>{deleting ? 'Deleting...' : 'Delete'}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default ContactsMoreModal

const styles=StyleSheet.create({
    bottomSheetContainer: {
        flexDirection: 'column',
        gap: 25,
        paddingTop: 20,
        paddingBottom: 20,
    },
    download: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    downloadText: {
        fontSize: 18,
        color: Colors.textPrimary
    },
    edit:{
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
    },
    editText: {
      fontSize: 18,
    },
    delete: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
    },
    deleteText: {
      color: Colors.delete,
      fontSize: 18,
    },
    icon: {
      width: 30,
    }
})