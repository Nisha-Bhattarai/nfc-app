import * as React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { BarChart } from 'react-native-chart-kit';
import Colors from "../constants/Colors";

const screenWidth = Dimensions.get("window").width - 60;
const initialLayout = { width: Dimensions.get('window').width - 40 };

const ScansByDayAndHourTab = ({ data }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'day', title: 'Day' },
    { key: 'dayHour', title: 'Day&Hour' },
    { key: 'hour', title: 'Hour' },
  ]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const shortDays = days.map(d => d.slice(0, 3)); // ["Mon", "Tue", "Wed", ...]

  // Day chart data
  const dayData = {
    labels: shortDays,
    datasets: [{
      data: days.map(d => {
        const value = data?.dayWise?.[d] || 0;
        return value === 0 ? null : value; // hide 0 values
      })
    }]
  };

  // Hour chart data (6-hour interval labels)

  // const hourData = {
  //   labels: ["12 AM", "6 AM", "12 PM", "6 PM", "12 AM"], // chartkit uses these only for display
  //   datasets: [{
  //     data: hours.map(h => {
  //       const value = data?.hourWise?.[h];
  //       return value && value !== 0 ? value : null; // hide 0 bars
  //     })
  //   }]
  // };

  const hourData = {
    labels: hours.map((h, i) => {
      if (i === 0) return "12 AM";
      if (i === 6) return "6 AM";
      if (i === 12) return "12 PM";
      if (i === 18) return "6 PM";
      return ""; // blank for other hours
    }),
    datasets: [{
      data: hours.map(h => data?.hourWise?.[h] || 0) // 0 for missing hours
    }]
  };

  // Heatmap color function (orange based on value)
  const getHeatmapColor = (day, hour) => {
    const key = `${day}-${hour}`;
    const value = data?.dayHourWise?.[key];

    // get number of items in dayHourWise
    const listLength = data?.dayHourWise ? Object.keys(data.dayHourWise).length : 0;

    if (value !== undefined && value !== 0 && listLength > 0) {
      const ratio = listLength / 24; // assuming max possible = 24 hours
      const baseR = 231, baseG = 114, baseB = 26;

      // darker for smaller listLength, lighter for bigger
      const r = Math.round(baseR + (255 - baseR) * ratio);
      const g = Math.round(baseG + (255 - baseG) * ratio);
      const b = Math.round(baseB + (255 - baseB) * ratio);

      return `rgb(${r},${g},${b})`;
    } else {
      return "rgb(220,220,220)"; // grey for 0, undefined, or empty list
    }
  };

  // Day chart
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
            // color: () => Colors.accent,
            color: (opacity = 1, index) => {
              const value = dayData.datasets[0].data[index];
              return value > 0 ? Colors.accent : 'transparent';
            },
            labelColor: () => Colors.textPrimary,
            barPercentage: 0.6,
            useShadowColorFromDataset: false,
            fillShadowGradient: Colors.accent,       // force solid bar color
            fillShadowGradientOpacity: 1,
          }}
          verticalLabelRotation={0}
          yLableOffset={0}
          yAxisMax={10}
          formatYLabel={y => {
            // Always show nice rounded labels: 0, 2, 4, 6, 8, 10
            const max = 10; // or compute maxValue dynamically
            const step = max / 5;
            const rounded = Math.round(y / step) * step;
            return rounded;
          }}

        />
      </View>

    </ScrollView>
  );

  // Heatmap grid
  const DayHourRoute = () => (
    <ScrollView horizontal>
      <View style={{ flexDirection: "column", paddingLeft: 16 }}>
        {/* Heatmap rows */}
        {days.map((day, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Day label */}
            <Text style={{ width: 40, fontSize: 12 }}>{day.slice(0, 3)}</Text>
            {hours.map((hour, colIndex) => {
              const key = `${day}-${hour}`;
              const value = data?.dayHourWise?.[key];
              return (
                <View
                  key={colIndex}
                  style={[
                    styles.heatmapCell,
                    { backgroundColor: getHeatmapColor(day, hour) }
                  ]}
                >
                  {/* {value !== undefined && value !== 0 && (
                  <Text style={styles.heatmapValue}>{value}</Text>
                )} */}
                </View>
              );
            })}
          </View>
        ))}

        {/* Bottom X-axis labels */}
        <View style={{ flexDirection: "row", marginLeft: 40, marginTop: 4 }}>
          {hours.map((h, i) =>
            i % 6 === 0 ? (
              <Text key={i} style={{ width: 40, textAlign: "center", fontSize: 10 }}>
                {i === 0 ? "12 AM" : i === 6 ? "6 AM" : i === 12 ? "12 PM" : i === 18 ? "6 PM" : ""}
              </Text>
            ) : (
              <View key={i} style={{ width: 30 }} />
            )
          )}
        </View>
      </View>
    </ScrollView>
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
            color: (opacity = 1, index) => {
              const value = hourData.datasets[0].data[index];
              return value > 0 ? Colors.accent : 'transparent';
            },
            labelColor: () => Colors.textPrimary,
            barPercentage: 0.6,
            useShadowColorFromDataset: false,
            fillShadowGradient: Colors.accent,
            fillShadowGradientOpacity: 1,
          }}
          formatXLabel={(x, i) => (i % 6 === 0 ? x : '')} // show label every 6 hours

          verticalLabelRotation={0}
          yLableOffset={0}
          yAxisMax={10}
          formatYLabel={y => {
            // Always show nice rounded labels: 0, 2, 4, 6, 8, 10
            const max = 10; // or compute maxValue dynamically
            const step = max / 5;
            const rounded = Math.round(y / step) * step;
            return rounded;
          }}

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
    height: 320,
    overflow: 'hidden',
  },
  tabBar: { backgroundColor: Colors.white, elevation: 0, shadowOpacity: 0 },
  indicator: { backgroundColor: Colors.accent, height: 2 },
  label: { fontWeight: 'bold', textTransform: 'none' },
  heatmapCell: {
    width: 30,
    height: 30,
    margin: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  heatmapValue: { fontSize: 10, color: "#fff", fontWeight: "bold" }
});

export default ScansByDayAndHourTab;
