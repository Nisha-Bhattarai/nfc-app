import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import Colors from "../constants/Colors";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`, // fallback orange
  labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: "5", strokeWidth: "2", stroke: Colors?.primary || "#f97316" },
};


const ScansOverTimeCard = ({ data, activeTab = "day" }) => {
  if (!data || !data.scansOverTime) return null;
  // Line (over time)
  const scansOverTime = {
    labels: data.scansOverTime.map((d) =>
      new Date(d.date).toLocaleDateString("en-US", { weekday: "short" })
    ),
    datasets: [{ data: data.scansOverTime.map((d) => d.count) }],
  };

  return (
    <ScrollView style={styles.card}>
      <Text style={styles.title}>Scans Over Time</Text>

      {/* <LineChart
        data={scansOverTime}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
          withDots={false} 
        style={styles.chart}
      /> */}
      <LineChart
        data={scansOverTime}
        width={screenWidth - 32}      // you can reduce further if needed
        height={220}
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => Colors.accent, // use your accent color
           fillShadowGradient: Colors.accent,               // gradient color
    fillShadowGradientOpacity: 0,       
        }}
        
        bezier
        withDots={false}  
  withInnerLines={false}          // remove horizontal grid lines
  withVerticalLines={false}               // no dots
        style={{
          ...styles.chart,
          marginLeft: -20,
          marginRight: 20               // pull chart slightly left to fix label cutoff
        }}
      />
    </ScrollView>
  );
};

export default ScansOverTimeCard;

// -------- Styles ----------
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors?.white || "#fff",
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 18,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: Colors?.textPrimary || "#111827",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: Colors?.textSecondary || "#6B7280",
    marginTop: 12,
    marginBottom: 6,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  heatWrap: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 8,
    paddingRight: 8,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    paddingLeft: 44,
  },
  legendBar: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 6,
  },
  legendText: { fontSize: 10, color: "#64748B" },
});
