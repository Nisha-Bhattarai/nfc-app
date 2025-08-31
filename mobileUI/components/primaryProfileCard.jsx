import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';

const PrimaryProfileCard = ({ profilePicture, name, position, createdDate, modifiedDate, onDelete, onEdit, deleting }) => {

  const isValidUrl = (url) => {
    return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
            source={
              isValidUrl(profilePicture)
                ? { uri: profilePicture, height: 100, width: 100 }
                : require('../assets/images/avatar.png')
            }
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.otherText} numberOfLines={1} ellipsizeMode="tail">{position}</Text>
          <Text style={styles.otherText} numberOfLines={1} ellipsizeMode="tail">Date Created: {createdDate.trim()}</Text>
          <Text style={styles.otherText} numberOfLines={1} ellipsizeMode="tail">Date Modified: {modifiedDate.trim()}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>{deleting ? 'Deleting...' : 'Delete'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PrimaryProfileCard

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
    flex: 1,     
    flexDirection: 'column',
    gap: 6,
    flexShrink: 1,  
  },
  nameText: {
    fontSize: 15,
    color: Colors.textPrimary
  },
  otherText: {
    fontSize: 12,
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