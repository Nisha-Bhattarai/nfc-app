import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Colors from "../constants/Colors";
import BoothScanOverviewCard, { PeakScanTimeCard } from "../components/boothScanOverviewCard";
import ScansOverTimeCard from "../components/ScansOverTimeCard";
import DetailedAnalyticsCard from "../components/detailedAnalyticsCard"
import EventsList from "../components/eventsList"
import EventsScanOverTime from "../components/eventsScanOvertime"
import { useHomeEventAnalyticsState } from '../states/useHomeEventAnalyticsState';

const EventAnalytics = () => {
  const { analytics, loading, error, reload } = useHomeEventAnalyticsState();
  if (loading) return <ActivityIndicator size="large" color={Colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>;
  return (
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {analytics?.analytics.map((item, index) => (

          <View key={item.profile._id} style={{ marginBottom: 20 }}>
            <Text style={styles.eventNameText}>
              {item.profile.eventName}
            </Text>
            <View style={styles.cardContainer}>
              <BoothScanOverviewCard
                title="Total Scans"
                number={String(item.totalScans ?? 0)}
                text="Scans"
              />
              <PeakScanTimeCard
                title="Peak Scan Time"
                text="Between"
                time={item.peakScanTime ?? "-"}
              />
            </View>
          </View>
        ))}

        {analytics?.recentProfiles?.length > 0 && (
          <EventsList recentProfiles={analytics.recentProfiles} />
        )}

        <EventsScanOverTime scanOverTimesData={analytics?.scanOverTimesData}/>


        <View>
          <Text style={styles.detailedAnalyticsTitle}>Detailed Analytics</Text>

          {analytics?.detailedAnalytics?.map((item) => (
            item.scans?.length > 0 && (
              <View key={item.profile} style={{ marginBottom: 16 }}>
                <Text style={styles.eventNameText}>{item.profile}</Text>

                {item.scans.map((scan, index) => {
                  const dateObj = new Date(scan.createdAt);
                  const date = dateObj.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                  const time = dateObj.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <DetailedAnalyticsCard
                      key={scan.deviceId + index}
                      date={date}
                      time={time}
                      deviceName={scan.device}
                      location={scan.location}
                      ipAddress={scan.ipAddress}
                    />
                  );
                })}
              </View>
            )
          ))}
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
    textAlign: 'start',
    marginBottom: 10
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
    width: '100%'
  },
  detailedAnalyticsTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.textPrimary,
    marginBottom: 8,
  }
});