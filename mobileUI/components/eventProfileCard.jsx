import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';

const EventProfileCard = ({ images, name, position, createdDate, modifiedDate, onDelete, onEdit, deleting }) => {
  const imageSource =
    images && images.length > 0 && typeof images[0] === 'string'
      ? { uri: images[0] }
      : require('../assets/images/avatar.png');
  return (
    <View style={styles.cardContainer}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imageSource} resizeMode="cover" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.otherText} numberOfLines={1} ellipsizeMode="tail">{position}</Text>
          <Text style={styles.otherText} numberOfLines={1} ellipsizeMode="tail" >Date Created: {createdDate}</Text>
          <Text style={styles.otherText} numberOfLines={1} ellipsizeMode="tail" >Date Modified: {modifiedDate}</Text>
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
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,  
    overflow: 'hidden', 
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
    gap: 4,
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