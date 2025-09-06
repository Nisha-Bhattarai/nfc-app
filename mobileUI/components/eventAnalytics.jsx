import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../constants/Colors";
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import BoothScanOverviewCard, { PeakScanTimeCard } from "../components/boothScanOverviewCard";
import DetailedAnalyticsCard from "../components/detailedAnalyticsCard"
import EventsList from "../components/eventsList"
import EventsScanOverTime from "../components/eventsScanOvertime"
import { useHomeEventAnalyticsState } from '../states/useHomeEventAnalyticsState';

const EventAnalytics = () => {
  const [selectedProfileId, setSelectedProfileId] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);

  const { analytics, loading, error, reload } = useHomeEventAnalyticsState(selectedProfileId);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    reload();
    setRefreshing(false);
  }, [reload]);

  if (loading) return <ActivityIndicator size="large" color={Colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  if (error) return <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{error}</Text>;

  const dropdownItems =
    analytics?.comparingProfiles?.map((profile) => ({
      label: profile.eventName,
      value: profile._id,
    })) || [];


  return (
    <View style={styles.background}>


      <View style={styles.header}>
        <Text style={styles.title}>Event Analytics</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={dropdownItems}
          labelField="label"
          valueField="value"
          placeholder="Filter"
          value={selectedProfileId}
          maxHeight={300}                                 // scrollable if too many items
          renderItem={(item) => (
            <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
              <Text style={{ fontSize: 14, color: "#000" }}>{item.label}</Text>
            </View>
          )}
          dropdownStyle={{                            // ✅ make dropdown width flexible
            minWidth: 0,                               // remove fixed width
            alignSelf: "flex-start",                   // width expands to content
          }}
          dropdownPosition="auto"
          onChange={(item) => setSelectedProfileId(item.value)}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} />}
      >
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

        <EventsScanOverTime scanOverTimesData={analytics?.scanOverTimesData} />


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
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  background: {
    backgroundColor: Colors.secondary,
    margin: 16,
    flex: 1,
    borderRadius: 18,
    padding: 16,
    width: "100%",
  },
  dropdown: {
    width: 160,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "#fff",
    numberOfLines: 1,
    ellipsizeMode: "tail"

  },

  selectedTextStyle: {
    fontSize: 14,
    color: "#000",
    numberOfLines: 1,               // ✅ single line
    ellipsizeMode: "tail",          // ✅ ellipsis at end
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#888",
    numberOfLines: 1,
    ellipsizeMode: "tail"
  },

  title: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.textPrimary,
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