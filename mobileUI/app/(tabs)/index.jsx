import { View, Text, StyleSheet, Image, ScrollView,  } from 'react-native';
import { Link } from 'expo-router';
import Colors from "../../constants/Colors";
import ScanOverviewCard, { PeakScanTimeCard, TopLocationCard } from "../../components/scanOverviewCard";
import ScansOverTimeCard from "../../components/ScansOverTimeCard";
import ScansByDayAndHourTab from "../../components/ScansByDayAndHourTab";

const App = () => {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.greetingHeader}>
        <Text style={styles.headerText}>Hello, Mary!</Text>
        <Image 
          style={styles.image}
          source={require('../../assets/images/avatar.png')} />
      </View>
      <View style={styles.background}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <ScanOverviewCard 
            title='Total Scans'
            number='1250'
            text='Scans'
          />
          <ScanOverviewCard 
            title='Unique Scanners'
            number='70'
            text='Scans'
          />
        </View>
        <View style={styles.cardContainer}>
          <TopLocationCard 
            title='Top Location'
            number
            locationText='Toronto, ON'
          />
          <PeakScanTimeCard 
            title='Peak Scan Time'
            text='Between'
            time='2PM - 4PM'
          />
        </View>
        <ScansOverTimeCard />
        <ScansByDayAndHourTab />
        </ScrollView>
      </View>
    </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
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
  }
});
