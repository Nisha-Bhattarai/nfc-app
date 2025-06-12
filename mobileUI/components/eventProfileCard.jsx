import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';

const EventProfileCard = ({name, position, createdDate, modifiedDate}) => {
  return (
    <View style={styles.cardContainer}>
        <View style={styles.topContainer}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    source={require('../assets/images/avatar.png')} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.otherText}>{position}</Text>
                <Text style={styles.otherText}>Date Created: {createdDate}</Text>
                <Text style={styles.otherText}>Date Modified: {modifiedDate}</Text>
            </View>
        </View>   
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>   
    </View>
  );
};

export default EventProfileCard

const styles = StyleSheet.create({
   cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 15,
    marginBottom: 16,
   },
   topContainer: {
    flexDirection: 'row',
    gap: 14
   },
   image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flexDirection: 'column',
    gap: 6
  },
  nameText: {
    fontSize: 15,
    color: Colors.textPrimary
  },
  otherText: {
    fontSize: 15,
    color: Colors.textSecondary
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8
  },
  editButton: {
    backgroundColor: '#fff',
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    width: '49%'
  },
  deleteButton: {
    backgroundColor: '#fff',
    borderColor: Colors.delete,
    borderWidth: 1,
    borderRadius: 15,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    width: '49%'
  },
})