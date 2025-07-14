import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Colors from '../constants/Colors';

const SocialMediaModal = () => {
  return (
    <View style={styles.bottomSheetContainer}>
      <TouchableOpacity style={styles.socialMedia}>
        <AntDesign name="facebook-square" style={styles.icon} size={24} color="#1877F2" />
        <Text style={styles.socialMediaText}>Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialMedia}>
        <AntDesign name="instagram" style={styles.icon} size={24} color="#E1306C" />
        <Text style={styles.socialMediaText}>Instagram</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialMedia}>
        <AntDesign name="linkedin-square" style={styles.icon} size={24} color="#0A66C2" />
        <Text style={styles.socialMediaText}>LinkedIn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialMedia}>
        <FontAwesome6 name="x-twitter" style={styles.icon} size={24} color="#000000" />
        <Text style={styles.socialMediaText}>X (Twitter)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialMedia}>
        <AntDesign name="youtube" style={styles.icon} size={24} color="#FF0000" />
        <Text style={styles.socialMediaText}>YouTube</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialMedia}>
        <FontAwesome6 name="tiktok" style={styles.icon} size={24} color="#010101" />
        <Text style={styles.socialMediaText}>TikTok</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialMedia}>
        <FontAwesome6 name="reddit" style={styles.icon} size={24} color="#FF4500" />
        <Text style={styles.socialMediaText}>Reddit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialMedia}>
        <FontAwesome6 name="square-pinterest" style={styles.icon} size={24} color="#E60023" />
        <Text style={styles.socialMediaText}>Pinterest</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SocialMediaModal;

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flexDirection: 'column',
        gap: 25,
        paddingTop: 10,
        paddingBottom: 10
    },
    socialMedia: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    socialMediaText: {
        fontSize: 18,
        color: Colors.textPrimary
    },
    icon: {
        width: 30,
    }
})