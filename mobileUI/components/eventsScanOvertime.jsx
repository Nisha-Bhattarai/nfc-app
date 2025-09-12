// EventsScanOverTime.jsx
import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Colors from "../constants/Colors";

const screenWidth = Dimensions.get("window").width - 40;

const hexToRgba = (hex = "#000000", opacity = 1) => {
  const h = hex.replace("#", "");
  const fullHex = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const intVal = parseInt(fullHex, 16);
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `rgba(${r},${g},${b},${opacity})`;
};

const EventsScanOverTime = ({ scanOverTimesData }) => {
  if (!scanOverTimesData || scanOverTimesData.length === 0) return null;

  return (
    <View style={styles.container}>
      {scanOverTimesData.map((event, idx) => {
        // create labels as "hour + a/p"
        const labels = event.data.map((d) => {
          const hour = d.hour;
          const suffix = hour >= 12 ? "p" : "a";
          const hour12 = hour % 12 === 0 ? 12 : hour % 12;
          return `${hour12}${suffix}`;
        });

        const data = event.data.map((d) => d.value);
        const maxValue = Math.max(...data, 1);
        const segments = Math.max(3, Math.min(6, Math.ceil(maxValue)));

        const accentHex = Colors.accent ?? "#FF8A65";
        const zeroColor = "#E6E6E6";
        const colors = data.map(
          (v) => (opacity = 1) => hexToRgba(v > 0 ? accentHex : zeroColor, opacity)
        );

        const chartData = { labels, datasets: [{ data, colors }] };
        const chartWidth = Math.max(screenWidth, labels.length * 50);

        return (
          <View key={idx} style={styles.card}>
            <Text style={styles.eventTitle}>{event.title}</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 0, paddingRight: 24 }} // left and right spacing
            >
              <BarChart
                data={chartData}
                width={chartWidth}
                height={220}
                fromZero
                showValuesOnTopOfBars
                withInnerLines={false}
                withVerticalLines={false}
                segments={segments}
                yAxisInterval={1}
                verticalLabelRotation={-45}
                chartConfig={{
                  backgroundGradientFrom: Colors.white,
                  backgroundGradientTo: Colors.white,
                  decimalPlaces: 0,
                  color: (opacity = 1) => hexToRgba(accentHex, opacity),
                  labelColor: (opacity = 1) =>
                    hexToRgba(Colors.textPrimary ?? "#222", opacity),
                  propsForLabels: { fontSize: 11 },
                  propsForBackgroundLines: {
                    strokeDasharray: "",
                    // strokeWidth: 0.6,
                  },
                }}
                withCustomBarColorFromData={true}
                flatColor={true}
                style={{
                  marginLeft: -40, 
                  paddingLeft: 0,
                }}
              />
            </ScrollView>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
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
