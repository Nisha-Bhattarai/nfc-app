// screens/ProfileFormScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome, Entypo } from '@expo/vector-icons';
import FormInput from './formInput';
import Colors from '../constants/Colors';

const createPrimaryProfileComponent = () => {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.backgroundContainer}>
            <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <FontAwesome name="user-circle-o" size={80} color={Colors.border} />
          <View style={styles.chatIcon}>
            <Entypo name="dots-three-horizontal" size={16} color="#fff" />
          </View>
        </View>
      </View>

      <View style={styles.form}>
        {[
          'Profile Name', 'First Name', 'Last Name', 'Job Title', 'Company',
          'Location', 'Bio/Description', 'Personal Email', 'Work Email',
          'Personal Phone', 'Work Phone'
        ].map((placeholder, i) => (
        <FormInput
          key={i}
          placeholder={placeholder}
          multiline={placeholder === 'Bio/Description'}
          numberOfLines={placeholder === 'Bio/Description' ? 4 : 1}
          style={placeholder === 'Bio/Description' ? { height: 100 } : null}
        />
        ))}

        <View>
          <Text style={styles.sectionTitle}>Social Media</Text>
          <View style={styles.socialMediaLink}>
            <FontAwesome5 name="instagram" size={28} color="#e1306c" />
            <FormInput placeholder="Add your url here" style={styles.socialInput} />
            <TouchableOpacity>
              <AntDesign name="delete" size={20} color={Colors.delete} />
            </TouchableOpacity>
          </View>
          <View style={styles.socialMediaLink}>
            <View style={styles.socialMediaIcon}>
              <AntDesign name="linkedin-square" size={28} color="#0077B5" />
            </View>
            <FormInput placeholder="Add your url here" style={styles.socialInput} />
            <TouchableOpacity>
              <AntDesign name="delete" size={20} color={Colors.delete} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addMoreBtn}>
          <Text style={styles.addMoreText}>+ Add More</Text>
        </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Relevant Links (URLs)</Text>
        <View style={styles.row}>
          <FormInput placeholder="URL Title" style={styles.urlTitleInput} />
          <FormInput placeholder="Add your url here" style={styles.urlInput} />
          <TouchableOpacity>
            <AntDesign name="delete" size={20} color={Colors.delete} />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <FormInput placeholder="URL Title" style={styles.urlTitleInput} />
          <FormInput placeholder="Add your url here" style={styles.urlInput} />
          <TouchableOpacity>
            <AntDesign name="delete" size={20} color={Colors.delete} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addMoreBtn}>
          <Text style={styles.addMoreText}>+ Add More</Text>
        </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Photo Gallery</Text>
        <TouchableOpacity style={styles.addMoreBtn}>
          <Text style={styles.addMoreText}>+ Add Photos</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
        backgroundColor: "white",
},
backgroundContainer: {
        backgroundColor: Colors.secondary,
        margin: 16,
        flex: 1,
        padding: 16,
        borderRadius: 18,
    },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: { position: 'relative', alignItems: 'center' },
  chatIcon: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: Colors.textSecondary,
    borderRadius: 50,
    padding: 3,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  socialMediaLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialMediaIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  icon: { 
    width: 30 
  },
  socialInput: { 
    flex: 1, 
    marginHorizontal: 10 
  },
  urlTitleInput: { 
    width: 100, 
    marginRight: 8 
  },
  urlInput: { 
    flex: 1, marginRight: 8 
  },
  addMoreBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderColor: '#E67629',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  addMoreText: { 
    color: '#E67629', 
    fontWeight: '500' 
  },
  saveButton: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
    width: 150,
  },
  saveButtonContainer:{
    alignSelf: 'flex-end',
  },
  saveText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});

export default createPrimaryProfileComponent;
