import { View, Text, StyleSheet, ScrollView,  } from 'react-native';
import Colors from "../constants/Colors";
import ScanOverviewCard, { PeakScanTimeCard, TopLocationCard } from "../components/scanOverviewCard";
import ScansOverTimeCard from "../components/ScansOverTimeCard";
import ScansByDayAndHourTab from "../components/ScansByDayAndHourTab";
import DetailedAnalyticsCard from "../components/detailedAnalyticsCard"


const ProfileAnalytics = () => {
  return (
    <View style={styles.background}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <ScanOverviewCard 
            title='Total Scans'
            number='1250'
            text='Scans'
          />
          <ScanOverviewCard 
            title='Unique Scanners'
            number='70'
            text='Scans'
          />
        </View>
        <View style={styles.cardContainer}>
          <TopLocationCard 
            title='Top Location'
            number
            locationText='Toronto, ON'
          />
          <PeakScanTimeCard 
            title='Peak Scan Time'
            text='Between'
            time='2PM - 4PM'
          />
        </View>
        <ScansOverTimeCard />
        <ScansByDayAndHourTab />
        <View style={styles.detailedAnalytics}>
          <Text style={styles.detailedAnalyticsTitle}>Detailed Analytics</Text>
          <DetailedAnalyticsCard
        date = 'September 15, 2024' 
        time = '10:30 AM'
        deviceName = 'iPhone' 
        location = 'North York' 
        ipAddress = '45.67.189.23' />
        <DetailedAnalyticsCard 
        date= 'May 12, 2025'
        time= '2:34 PM'
        deviceName= 'Android'
        location = 'Scarborough'
        ipAddress = '36.59.198.25'
        />
        </View>
        
        </ScrollView>
      </View>
  )
}

export default ProfileAnalytics

const styles = StyleSheet.create({
  heading: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular'
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'lato_400Regular'
  },
  background: {
    backgroundColor: Colors.secondary,
    margin: 16,
    flex: 1,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    width: '100%',
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    width: '100%'
  },
  detailedAnalyticsTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.textPrimary,
    marginTop: 8,
    marginBottom: 8,
  }
});