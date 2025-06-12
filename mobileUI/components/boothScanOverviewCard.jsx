import { View, Text, StyleSheet } from 'react-native';
import Colors from "../constants/Colors"

const BoothScanOverviewCard = ({ title, number, text }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};


const PeakScanTimeCard = ({ title, text, time }) => {
    return (
        <View style={styles.peakTimeCard}>
            <Text style={styles.title}>{title}</Text>            
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.number}>{time}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 18,
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textPrimary,
    textAlign: 'center'
  },
  number: {
    fontSize: 14,
    fontFamily: 'Lato_400Regular',
    color: Colors.textPrimary,
  },
  text: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontFamily: 'Lato_400Regular',
  },
  peakTimeCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 18,
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
});

export default BoothScanOverviewCard;
export {PeakScanTimeCard};

