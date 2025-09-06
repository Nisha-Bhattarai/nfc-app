// components/ScanOverviewCard.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from "../constants/Colors"

const ScanOverviewCard = ({ title, number, text }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const TopLocationCard = ({ title, locationText, number }) => {
    return (
        <View style={styles.locationCard}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.number}>{number}</Text>
            <Text style={styles.locationText}  numberOfLines={2} ellipsizeMode="tail" >{locationText}</Text>
        </View>
    );
};

const PeakScanTimeCard = ({ title, text, time }) => {
    return (
        <View style={styles.locationCard}>
            <Text style={styles.title}>{title}</Text>            
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.number}>{time}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 18,
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textPrimary,
  },
  number: {
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
    color: Colors.textPrimary,
  },
  text: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Lato_400Regular',
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
    color: Colors.textPrimary,
  },
  locationCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 18,
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 0,
  },
});

export default ScanOverviewCard;
export {TopLocationCard};
export {PeakScanTimeCard};
