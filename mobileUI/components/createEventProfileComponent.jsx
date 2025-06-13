import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text, ScrollView } from 'react-native';
import { AntDesign, FontAwesome5, FontAwesome, Entypo } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormInput from './formInput';
import Colors from "../constants/Colors"
import SkillsSelector from './skillsSelector';
import EventDateTimePicker from "./eventDateTimePicker"

const createEventProfileComponent = () => {

  return (
    <ScrollView style={styles.container}>
        <View style={styles.backgroundContainer}>
            

      <View style={styles.form}>
        <FormInput placeholder="Event Profile Name" />
      <FormInput placeholder="Event Name" />

      <EventDateTimePicker />

      <FormInput placeholder="Event Location" />
      <FormInput
        placeholder="About Event"
        multiline={true}
        numberOfLines={4}
        style={{ height: 100 }}
      />
      <FormInput placeholder="Registration Fee" />
      <FormInput placeholder="Personal Email" />
      <FormInput placeholder="Work Email" />
      <FormInput placeholder="Personal Phone" />
      <FormInput placeholder="Work Phone" />

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
        <View style={styles.relevantURLRow}>
          <FormInput placeholder="URL Title" style={styles.urlTitleInput} />
          <FormInput placeholder="Add your url here" style={styles.urlInput} />
          <TouchableOpacity>
            <AntDesign name="delete" size={20} color={Colors.delete} />
          </TouchableOpacity>
        </View>
        <View style={styles.relevantURLRow}>
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

        <View style={styles.skills}>
          <SkillsSelector />
        </View>
        
        <View>
            <View style={styles.certificationsRow}>
          <FormInput placeholder="Relevant Certifications or Achievements" style={styles.urlInput} />
          <TouchableOpacity>
            <AntDesign name="delete" size={20} color={Colors.delete} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addMoreBtn}>
          <Text style={styles.addMoreText}>+ Add More</Text>
        </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Event Gallery</Text>
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
 dateInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Lato_400Regular',
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
    gap: 12,
  },
  relevantURLRow: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  certificationsRow: {
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

export default createEventProfileComponent;
