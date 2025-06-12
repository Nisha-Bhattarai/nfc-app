import { View, Text, StyleSheet, ScrollView,  } from 'react-native';
import Colors from "../constants/Colors";
import BoothScanOverviewCard, { PeakScanTimeCard } from "../components/boothScanOverviewCard";
import ScansOverTimeCard from "../components/ScansOverTimeCard";
import DetailedAnalyticsCard from "../components/detailedAnalyticsCard"
import EventsList from "../components/eventsList"

const EventAnalytics = () => {
  return (    
      <View style={styles.background}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.eventName}>
                <Text style={styles.eventNameText}>Tech Conference 2025</Text>
            </View>
        <View style={styles.cardContainer}>
          <BoothScanOverviewCard 
            title='Booth 1 Total Scans'
            number='1250'
            text='Scans'
          />
          <BoothScanOverviewCard 
            title='Booth 2 Total Scans'
            number='70'
            text='Scans'
          />
        </View>
        <View style={styles.cardContainer}>
          <PeakScanTimeCard 
            title='Booth 1 Peak Scan Time'
            text='Between'
            time='2PM - 4PM'
          />
          <PeakScanTimeCard 
            title='Booth 2 Peak Scan Time'
            text='Between'
            time='2PM - 4PM'
          />
        </View>
        <EventsList />
        <ScansOverTimeCard />
        <View>
          <Text style={styles.detailedAnalyticsTitle}>Detailed Analytics</Text>
          <DetailedAnalyticsCard
        date = 'September 15, 2024' 
        time = '10:30 AM'
        deviceName = 'iPhone' 
        location = 'Booth 1' 
        ipAddress = '45.67.189.23' />
        <DetailedAnalyticsCard 
        date= 'May 12, 2025'
        time= '2:34 PM'
        deviceName= 'Android'
        location = 'Booth 2'
        ipAddress = '36.59.198.25'
        />
        </View>
        
        </ScrollView>
      </View>
  );
};

export default EventAnalytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
  },
  eventName: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  eventNameText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
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
  greetingHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Lato_400Regular",
    color: Colors.textPrimary,
  },
  image: {
    width: 42,
    height: 42,
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