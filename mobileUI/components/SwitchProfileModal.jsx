import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../constants/Colors'
import RadioButton from './RadioButton';
import ToggleButton from './ToggleButton';

const SwitchProfileModal = () => {
    const [selectedProfile, setSelectedProfile] = useState('advisor');
    const [eventProfile1, setEventProfile1] = useState(true);
    const [eventProfile2, setEventProfile2] = useState(false);

      const handleToggle1 = (value) => {
    setEventProfile1(value);
    if (value) setEventProfile2(false);
  };

  const handleToggle2 = (value) => {
    setEventProfile2(value);
    if (value) setEventProfile1(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <AntDesign name="contacts" size={28} color="black" />
          <Text style={styles.headerText}>Primary Profile</Text>
        </View>
        <View style={styles.profileRow(selectedProfile === 'advisor')}>
          <Image source={require('../assets/images/avatar.png')} style={styles.profileImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Mary Wilson</Text>
            <Text style={styles.profileSubtitle}>Financial Advisor Profile</Text>
          </View>
          <RadioButton selected={selectedProfile === 'advisor'} onPress={() => setSelectedProfile('advisor')} />
        </View>
        <View style={styles.profileRow(selectedProfile === 'freelancer')}>
          <Image source={require('../assets/images/avatar.png')} style={styles.profileImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Mary Wilson</Text>
            <Text style={styles.profileSubtitle}>Freelancer Profile</Text>
          </View>
          <RadioButton selected={selectedProfile === 'freelancer'} onPress={() => setSelectedProfile('freelancer')} />
        </View>
        <View style={styles.headerRow}>
          <Ionicons name="calendar" size={24} color="#000" />
          <Text style={styles.headerText}>Event Profile</Text>
        </View>
        <View style={[styles.eventRow, { borderBottomWidth: 0.5, borderColor: '#ccc' }]}>
          <Text>Smart Money Moves Event Profile</Text>
          <ToggleButton value={eventProfile1} onValueChange={handleToggle1} />
        </View>
        <View style={styles.eventRow}>
          <Text>Smart Money Moves Event Profile</Text>
          <ToggleButton value={eventProfile2} onValueChange={handleToggle2} />
        </View>
      </View>
    </ScrollView>
  )
}

export default SwitchProfileModal

const styles = StyleSheet.create({
    container: { 
        padding: 10, 
        backgroundColor: Colors.white, 
        width: '100%'
    },
    headerRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 10,
    },
    headerText: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginLeft: 10 
    },
    profileRow: selected => ({ 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: "space-between", 
        padding: 10, 
        backgroundColor: selected ? Colors.secondary : '#fff', 
        borderRadius: 8, 
        marginBottom: 10,
        width: '100%' 
    }),
    profileImage: { 
        width: 60, 
        height: 60, 
        borderRadius: 8, 
        marginRight: 10 
    },
    profileName: { 
        fontSize: 16, 
        fontWeight: '600' 
    },
    profileSubtitle: { 
        color: '#7c7c7c' 
    },
    eventRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 10,
        width: '100%' 
    },
})