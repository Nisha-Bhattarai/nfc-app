import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import TruncatedText from "../components/TruncatedText"

const EventsCard = ({ title, location, startDate, endDate }) => {

    const dateObj = new Date(startDate);
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = dateObj.toLocaleString("en-US", { weekday: "short" }).toUpperCase();
    const date = dateObj.getDate();
    return (
        <View style={styles.eventsCard}>
            <View style={styles.calenderContainer}>
                <View style={styles.calendar}>
                    <Text style={styles.month}>{month}</Text>
                    <Text style={styles.date}>{date}</Text>
                    <Text style={styles.day}>{day}</Text>
                </View>
            </View>
            <View style={styles.eventDetails}>
                <TruncatedText text={title} style={styles.eventTitle} numberOfLines={1} ellipsizeMode="tail"/>

                <View style={styles.eventTime}>
                    <Ionicons name="time-outline" size={20} color={Colors.textSecondary} />
                    <Text style={styles.eventTimeText}>
                        {new Date(startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{" "}
                        {new Date(endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>

                <View style={styles.eventLocation}>
                    <Ionicons name="location-outline" size={20} color={Colors.textSecondary} />
                    <TruncatedText text={location} style={styles.eventLocationText}  numberOfLines={2}  wordLimit={4} ellipsizeMode="tail"/>
                </View>
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
        justifyContent: 'flex-start',
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
        flex: 1,
        flexDirection: 'column',
        gap: 4,
    },
    eventTitle: {
        flexShrink: 1,          // ✅ shrink only when needed
        flexWrap: 'nowrap',
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

