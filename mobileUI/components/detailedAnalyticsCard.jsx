import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const DetailedAnalyticsCard = ({ date, time, deviceName, location, ipAddress }) => {
  return (
    <View style={styles.detailedAnalyticsContainer}>
      <View style={styles.firstRow}>
        <View style={styles.dateTimeContainer}>
          <FontAwesome5 name="clock" size={24} color={Colors.textSecondary} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{date} </Text>
            <Text style={styles.text}>{time}</Text>
          </View>
        </View>
        <View style={styles.deviceContainer}>
          <FontAwesome5 name="mobile" size={24} color={Colors.textSecondary} />
          <View style={styles.textContainer}>
            <Text style={styles.textBold}>Device</Text>
            <Text style={styles.text}>{deviceName}</Text>
          </View>
        </View>
      </View>
      <View style={styles.secondRow}>
        <View style={styles.locationContainer}>
          <FontAwesome6 name="map-location-dot" size={24} color={Colors.textSecondary} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.textBold}>Location</Text>
            <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{location}</Text>
          </View>
        </View>
        <View style={styles.ipAddressContainer}>
          <MaterialCommunityIcons name="web" size={24} color={Colors.textSecondary} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.textBold}>IP Address</Text>
            <Text style={styles.text}>{ipAddress}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  detailedAnalyticsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 24,
    paddingBottom: 24,
    marginBottom: 16
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  icon: {
    alignContent: 'center'
  },
  text: {
    color: Colors.textSecondary,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  textBold: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '48%',
  },
  deviceContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '48%',
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '55%',
  },
  ipAddressContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '48%',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    flexShrink: 1,
  },
})

export default DetailedAnalyticsCard