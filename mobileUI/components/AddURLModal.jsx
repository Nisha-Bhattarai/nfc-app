import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import Colors from '../constants/Colors'
import FormInput from './formInput'

const AddURLModal = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  
  const handleAdd = () => {
    // if (!title.trim() || !url.trim()) return;
    onAdd(title.trim(), url.trim());
    setTitle('');
    setUrl('');
  };

  return (
    <View style={styles.bottomSheetContainer}>
      <Text style={styles.title}>Add a New URL</Text>
     <FormInput
        placeholder="URL Title"
        value={title}
        onChangeText={setTitle}
      />
      <FormInput
        placeholder="Add your URL here"
        value={url}
        onChangeText={setUrl}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add URL</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddURLModal

const styles = StyleSheet.create({
    bottomSheetContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        color: Colors.accent,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 10,
    },
    addButton: {
        height: 50,
        backgroundColor: Colors.accent,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular'
    },
})