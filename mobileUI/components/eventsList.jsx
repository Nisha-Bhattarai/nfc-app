import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import EventsCard from "../components/eventsCard"



const EventsList = ({ recentProfiles }) => {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Upcoming Events</Text>
            <Text style={styles.titleText}>See all</Text>
        </View>  
        {recentProfiles.map((profile) => (
        <EventsCard
          key={profile._id}
          title={profile.eventName}
          location={profile.location}
          startDate={profile.startDate}
          endDate={profile.endDate}
        />
      ))}
    </View>
  )
}

export default EventsList

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 16,
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
    }
})