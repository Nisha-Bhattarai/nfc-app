import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import FormInput from './formInput';
import Colors from '../constants/Colors';
import { useCreateContactState } from '../states/useCreateContactState';
import { createContact } from '../viewmodels/auth/ContactViewModel'


const EditContactFormModal = ({ isEdit = false, contactData = {}, onClose }) => {

  useEffect(() => {
    if (isEdit && contactData) {
      setName(contactData.name || '');
      setEmail(contactData.email || '');
      setPhone(contactData.phone || '');
      setNote(contactData.note || '');
    }
  }, [isEdit, contactData]);

  const {
    name, setName,
    email, setEmail,
    phone, setPhone,
    note, setNote,
    loading, error, success,
    setLoading, setError, setSuccess
  } = useCreateContactState()

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      Alert.alert('Validation Error', 'Name, email, and phone are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const contactData = {
      name,
      email,
      phone,
      note,
      image: '', // Optional for now
    };

    await createContact(
      contactData,
      (res) => {
        setLoading(false);
        setSuccess('Contact saved successfully!');
        Alert.alert(
          'Success',
          res.message || 'Contact saved!',
          [
            { text: 'OK', onPress: () => onClose && onClose() }
          ],
          { cancelable: false }
        ); if (onClose) onClose();
      },
      (err) => {
        setLoading(false);
        setError(errorMsg);
        Alert.alert('Error', err?.message || 'Something went wrong');
      }
    );
  };

  return (
    <View style={styles.bottomSheetContainer}>
      <View style={styles.container}>
        <Image style={styles.avatarImage} source={require('../assets/images/avatar.png')} />
        <Text style={styles.textName}>John Doe</Text>

        <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
  <Text style={{ color: Colors.accent }}>Close Sheet Directly</Text>
</TouchableOpacity>

        <View style={styles.emailInput}>
          <Ionicons name="person-outline" size={30} color="#555" />
          <FormInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName} />
        </View>

        <View style={styles.emailInput}>
          <Ionicons name="mail-outline" size={30} color="#555" />
          <FormInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail} />
        </View>
        <View style={styles.phoneInput}>
          <AntDesign name="phone" size={30} color="black" />
          <FormInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone} />
        </View>
      </View>
      <View style={styles.note}>
        <Text style={styles.noteTitle}>Note:</Text>
        <FormInput
          placeholder="Enter your notes here..."
          multiline={true}
          numberOfLines={5}
          style={{ height: 120 }}
          value={note}
          onChangeText={setNote} />
      </View>

      <TouchableOpacity
        style={[styles.updateButton, loading && { opacity: 0.5 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <MaterialIcons name="update" size={22} color={Colors.accent} />
        <Text style={styles.updateButtonText}>
          {loading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update' : 'Create')}

        </Text>
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