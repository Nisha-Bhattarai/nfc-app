import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';


const truncateWords = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const EventsList = () => {
    const fullTitle = "Smart Money Moves: Strategies for Building Wealth in Any Economy";
    const fullLocation = "Virtual (Zoom link sent upon registration)";

  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Events</Text>
            <Text style={styles.titleText}>See all</Text>
        </View>
        <View style={styles.eventsCard}>
            <View style={styles.calenderContainer}>
                <View style={styles.calendar}>
                    <Text style={styles.month}>APR</Text>
                    <Text style={styles.date}>15</Text>
                    <Text style={styles.day}>THU</Text>
                </View>
            </View>
            <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{truncateWords(fullTitle, 3)}</Text>
                <View style={styles.eventTime}>
                    <Ionicons name="time-outline" size={24} color={Colors.textSecondary} />
                    <Text style={styles.eventTimeText}>6:00 PM – 7:30 PM</Text>
                </View> 
                <View style={styles.eventLocation}>
                    <Ionicons name="location-outline" size={24} color={Colors.textSecondary} />
                    <Text style={styles.eventLocationText}>{truncateWords(fullLocation, 3)}</Text>
                </View> 
            </View>
            <View style={styles.viewMoreIcon}>
                <AntDesign name="right" size={24} color={Colors.textSecondary} />
            </View>
        </View>
    </View>
  )
}

export default EventsList

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 16,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 18,
    },
    titleContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.textPrimary,
    },
    titleText: {
        fontSize: 12,
        fontFamily: 'Lato_400Regular',
        color: Colors.textSecondary,
    },
    eventsCard: {
        padding: 16,
        flexDirection: "row",
        backgroundColor: Colors.secondary,
        borderRadius: 18,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    calendar: {
        padding: 8,
        backgroundColor: Colors.white,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: "column",
        gap: 6,
    },
    month: {
        backgroundColor: Colors.secondary,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        padding: 16,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        fontFamily: 'Lato_400Regular',
        color: Colors.textSecondary,
    },
    date: {
        fontFamily: 'Lato_700Bold',
        fontSize: 18,
        color: Colors.textPrimary,
    },
    day: {
        fontFamily: 'Lato_400Regular',
        color: Colors.textSecondary,
    },
    viewMoreIcon: {
        color: Colors.textSecondary,
        justifyContent: 'flex-end',
    },
    eventDetails: {
        flexDirection: 'column',
        gap: 4,
    },
    eventTime: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    eventTimeText: {
        color: Colors.textSecondary
    },
    eventLocation: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    eventLocationText: {
        color: Colors.textSecondary,
    }
})