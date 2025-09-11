import * as React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { BarChart } from 'react-native-chart-kit';
import Colors from "../constants/Colors";
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width - 60;
const initialLayout = { width: Dimensions.get('window').width - 40 };

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const shortDays = days.map(d => d.slice(0, 3));

const utcDayIndexMap = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6
};

const ScansByDayAndHourTab = ({ data }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'day', title: 'Day' },
    { key: 'dayHour', title: 'Day&Hour' },
    { key: 'hour', title: 'Hour' },
  ]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  // --- Convert UTC to local time with correct offset ---
  const localData = React.useMemo(() => {
    const dayWiseLocal = {};
    const hourWiseLocal = {};
    const dayHourWiseLocal = {};

    const timezoneOffsetMinutes = new Date().getTimezoneOffset(); // in minutes

    Object.entries(data?.dayHourWise || {}).forEach(([key, value]) => {
      const [utcDay, utcHourStr] = key.split("-");
      const utcHour = Number(utcHourStr);

      // Reference date in UTC
      const referenceDate = new Date(Date.UTC(1979, 0, 1 + utcDayIndexMap[utcDay], utcHour, 0, 0));

      // Apply local timezone offset
      referenceDate.setMinutes(referenceDate.getMinutes() - timezoneOffsetMinutes);

      const localDay = days[referenceDate.getDay() === 0 ? 6 : referenceDate.getDay() - 1];
      const localHour = referenceDate.getHours();

      dayWiseLocal[localDay] = (dayWiseLocal[localDay] || 0) + value;
      hourWiseLocal[localHour] = (hourWiseLocal[localHour] || 0) + value;
      const localKey = `${localDay}-${localHour}`;
      dayHourWiseLocal[localKey] = (dayHourWiseLocal[localKey] || 0) + value;
    });

    return { dayWise: dayWiseLocal, hourWise: hourWiseLocal, dayHourWise: dayHourWiseLocal };
  }, [data]);

  // --- Chart data ---
  const dayData = {
    labels: shortDays,
    datasets: [{ data: days.map(d => localData.dayWise[d] || 0) }]
  };

  const hourData = {
    labels: hours.map((h, i) => {
      if (i === 0) return "12 AM";
      if (i === 6) return "6 AM";
      if (i === 12) return "12 PM";
      if (i === 18) return "6 PM";
      return "";
    }),
    datasets: [{ data: hours.map(h => localData.hourWise[h] || 0) }]
  };

  const getHeatmapColor = (day, hour) => {
    const key = `${day}-${hour}`;
    const value = localData.dayHourWise[key];
    return value && value > 0 ? Colors.accent : "rgb(220,220,220)";
  };

  // --- Chart routes ---
  const DayRoute = () => (
    <ScrollView horizontal>
      <View style={{ marginLeft: -20 }}>
        <BarChart
          data={dayData}
          width={screenWidth}
          height={260}
          fromZero
          showValuesOnTopOfBars
          yAxisLabel=""
          withInnerLines={false}
          chartConfig={{
            backgroundColor: Colors.white,
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            decimalPlaces: 0,
            color: (opacity = 1, index) => dayData.datasets[0].data[index] > 0 ? Colors.accent : 'transparent',
            labelColor: () => Colors.textPrimary,
            barPercentage: 0.6,
            useShadowColorFromDataset: false,
            fillShadowGradient: Colors.accent,
            fillShadowGradientOpacity: 1,
          }}
          verticalLabelRotation={0}
          yLableOffset={0}
        />
      </View>
    </ScrollView>
  );

  const DayHourRoute = () => (
    <>
      <View style={styles.helperPill} accessible accessibilityRole="text" accessibilityLabel="Swipe left">
        <FontAwesome
          name="long-arrow-left"
          size={16}
          color="#1f3a52"
          style={styles.helperIcon}
        />
        <Text style={styles.helperText}>Scroll left</Text>
      </View>


      <ScrollView horizontal>
        <View style={{ flexDirection: "column", paddingLeft: 16 }}>
          {days.map((day, rowIndex) => (
            <View key={rowIndex} style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ width: 40, fontSize: 12 }}>{day.slice(0, 3)}</Text>
              {hours.map((hour, colIndex) => (
                <View
                  key={colIndex}
                  style={[styles.heatmapCell, { backgroundColor: getHeatmapColor(day, hour) }]}
                />
              ))}
            </View>
          ))}
          <View style={{ flexDirection: "row", marginLeft: 40, marginTop: 4 }}>
            {hours.map((h, i) =>
              i % 6 === 0 ? (
                <Text key={i} style={{ width: 40, textAlign: "center", fontSize: 10 }}>
                  {i === 0 ? "12 AM" : i === 6 ? "6 AM" : i === 12 ? "12 PM" : i === 18 ? "6 PM" : ""}
                </Text>
              ) : <View key={i} style={{ width: 30 }} />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );

  const HourRoute = () => (
    <ScrollView horizontal>
      <View style={{ marginLeft: -20 }}>
        <BarChart
          data={hourData}
          width={screenWidth}
          height={260}
          fromZero
          showValuesOnTopOfBars
          yAxisLabel=""
          withInnerLines={false}
          chartConfig={{
            backgroundColor: Colors.white,
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            decimalPlaces: 0,
            color: (opacity = 1, index) => hourData.datasets[0].data[index] > 0 ? Colors.accent : 'transparent',
            labelColor: () => Colors.textPrimary,
            barPercentage: 0.6,
            useShadowColorFromDataset: false,
            fillShadowGradient: Colors.accent,
            fillShadowGradientOpacity: 1,
          }}
          formatXLabel={(x, i) => (i % 6 === 0 ? x : '')}
          verticalLabelRotation={0}
          yLableOffset={0}
        />
      </View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    day: DayRoute,
    dayHour: DayHourRoute,
    hour: HourRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      activeColor={Colors.accent}
      inactiveColor={Colors.textPrimary}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          swipeEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 10, alignItems: "center" },
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    width: '100%',
    height: 340,
    overflow: 'hidden',
  },
  tabBar: { backgroundColor: Colors.white, elevation: 0, shadowOpacity: 0 },
  indicator: { backgroundColor: Colors.accent, height: 2 },
  label: { fontWeight: 'bold', textTransform: 'none' },
  heatmapCell: { width: 30, height: 30, margin: 0.5, justifyContent: "center", alignItems: "center" },
  helperPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f0f4f8',
    borderRadius: 6,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  helperIcon: { marginRight: 6 },
  helperText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f3a52',
  },
});

export default ScansByDayAndHourTab;
