import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../constants/Colors';

const ContactListCard = ({ image, name, date, email, phone, note, onMorePress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={image}
        />
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <TouchableOpacity style={styles.moreBtn} onPress={onMorePress}>
          <Feather name="more-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={16} color="#555" />
        <Text style={styles.infoText}>{email}</Text>
      </View>
      <View style={styles.infoRow}>
        <AntDesign name="phone" size={16} color="black" />
        <Text style={styles.infoText}>{phone}</Text>
      </View>
      <Text style={styles.noteLabel}>Note:</Text>
      <Text style={styles.note}>{note}</Text>
    </View>
  );
};

export default ContactListCard;

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  moreBtn: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E9E9E9',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    color: '#333',
    fontSize: 14,
  },
  noteLabel: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  note: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
});