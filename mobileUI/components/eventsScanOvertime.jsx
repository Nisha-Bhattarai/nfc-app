import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Colors from "../constants/Colors";

const screenWidth = Dimensions.get("window").width - 40; // padding

const EventsScanOverTime = ({ scanOverTimesData }) => {
  if (!scanOverTimesData || scanOverTimesData.length === 0) return null;

  return (
    <View style={styles.container}>
      {scanOverTimesData.map((event, idx) => {
        const maxValue = Math.max(...event.data.map(d => d.value), 1);
        const chartData = {
          labels: event.data.map(d => d.label),
          datasets: [{ data: event.data.map(d => d.value) }],
        };

        const chartWidth = Math.max(screenWidth, event.data.length * 40);

        return (
          <View key={idx} style={styles.card}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ marginLeft: -40 }}> 
              <BarChart
                data={chartData}
                width={chartWidth}
                height={200}
                fromZero
                showValuesOnTopOfBars
                withInnerLines={false}
                chartConfig={{
                  backgroundColor: Colors.white,
                  backgroundGradientFrom: Colors.white,
                  backgroundGradientTo: Colors.white,
                  decimalPlaces: 0,
                  color: (opacity = 1, index) => {
                    const value = chartData.datasets[0].data[index];
                    return value > 0 ? Colors.accent : "#ccc";
                  },
                  labelColor: () => Colors.textPrimary,
                  barPercentage: 0.6,
                  useShadowColorFromDataset: false,
                  fillShadowGradient: Colors.accent,
                  fillShadowGradientOpacity: 1,
                }}
                verticalLabelRotation={0}
                formatXLabel={(x, i) => (i % 6 === 0 ? x : "")} 
              />
              </View>
            </ScrollView>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: Colors.textPrimary,
  },
});

export default EventsScanOverTime;
