import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ navigation, title, back }) => {
  return (
    <View style={styles.header}>
      {back && (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
