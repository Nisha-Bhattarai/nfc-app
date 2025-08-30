import { View, Text, StyleSheet, ScrollView,ActivityIndicator } from 'react-native';
import Colors from "../constants/Colors";
import ScanOverviewCard, { PeakScanTimeCard, TopLocationCard } from "../components/scanOverviewCard";
import ScansOverTimeCard from "../components/ScansOverTimeCard";
import ScansByDayAndHourTab from "../components/ScansByDayAndHourTab";
import DetailedAnalyticsCard from "../components/detailedAnalyticsCard"
import { useHomeAnalyticsState } from '../states/useHomeAnalyticsState';

const ProfileAnalytics = () => {
  const { homeAnalytics, loading, error, reload } = useHomeAnalyticsState();
  if (loading) return <ActivityIndicator size="large" color={Colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>;

  return (
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <ScanOverviewCard
            title='Total Scans'
            number={homeAnalytics?.totalScans || 0}
            text='Scans'
          />
          <ScanOverviewCard
            title='Unique Scanners'
            number={homeAnalytics?.uniqueScanners || 0}
            text='Scans'
          />
        </View>
        <View style={styles.cardContainer}>
        
          <TopLocationCard
            title='Top Location'
            locationText={homeAnalytics?.topLocation || 'N/A'}
          />
          <PeakScanTimeCard
            title='Peak Scan Time'
            text='Between'
            time={homeAnalytics?.peakScanTime || 'N/A'}
          />
        </View>
        <ScansOverTimeCard data={homeAnalytics} activeTab="day" />
        <ScansByDayAndHourTab data={homeAnalytics} />

         <View style={styles.detailedAnalytics}>
            <Text style={styles.detailedAnalyticsTitle}>Detailed Analytics</Text>
            {homeAnalytics?.latestScans?.map((scan, index) => {
                const scanDate = new Date(scan.date);
                const formattedDate = scanDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                });
                const formattedTime = scanDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });

                return (
                    <DetailedAnalyticsCard
                        key={index}
                        date={formattedDate}
                        time={formattedTime}
                        deviceName={scan.device}
                        location={scan.location}
                        ipAddress={scan.ipAddress}
                    />
                );
            })}
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