import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Colors from "../constants/Colors"

const DayRoute = () => (
  <View style={styles.scene}>
    <Text>This is the Day tab</Text>
  </View>
);

const DayHourRoute = () => (
  <View style={styles.scene}>
    <Text>This is the Day & Hour tab</Text>
  </View>
);

const HourRoute = () => (
  <View style={styles.scene}>
    <Text>This is the Hour tab</Text>
  </View>
);

const initialLayout = { width: Dimensions.get('window').width - 40 };

const ScansByDayAndHourTab = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'day', title: 'Day' },
    { key: 'dayHour', title: 'Day&Hour' },
    { key: 'hour', title: 'Hour' },
  ]);

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
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  tabBar: {
    backgroundColor: Colors.white,
    elevation: 0,
    shadowOpacity: 0,
  },
  indicator: {
    backgroundColor: Colors.accent,
    height: 2,
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'none',
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScansByDayAndHourTab