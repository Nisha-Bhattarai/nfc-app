import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import TruncatedText from "../components/TruncatedText"

const EventsCard = () => {
    const fullTitle = "Smart Money Moves: Strategies for Building Wealth in Any Economy";
        const fullLocation = "Virtual (Zoom link sent upon registration)";
  return (
    <View style={styles.eventsCard}>
            <View style={styles.calenderContainer}>
                <View style={styles.calendar}>
                    <Text style={styles.month}>APR</Text>
                    <Text style={styles.date}>15</Text>
                    <Text style={styles.day}>THU</Text>
                </View>
            </View>
            <View style={styles.eventDetails}>
                <TruncatedText text={fullTitle} wordLimit={3} style={styles.eventTitle} />
                <View style={styles.eventTime}>
                    <Ionicons name="time-outline" size={24} color={Colors.textSecondary} />
                    <Text style={styles.eventTimeText}>6:00 PM – 7:30 PM</Text>
                </View> 
                <View style={styles.eventLocation}>
                    <Ionicons name="location-outline" size={24} color={Colors.textSecondary} />
                    <TruncatedText text={fullLocation} wordLimit={3} style={styles.eventLocationText} />
                </View> 
            </View>
            <View style={styles.viewMoreIcon}>
                <AntDesign name="right" size={24} color={Colors.textSecondary} />
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    eventsCard: {
        padding: 16,
        flexDirection: "row",
        backgroundColor: Colors.secondary,
        borderRadius: 18,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16
    },
    calendar: {
        padding: 6,
        backgroundColor: Colors.white,
        borderRadius: 18,
        alignItems: 'center',
        flexDirection: "column",
        gap: 6,
    },
    month: {
        backgroundColor: Colors.secondary,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
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

export default EventsCard

