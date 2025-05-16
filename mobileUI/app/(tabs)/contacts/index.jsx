import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import ContactListCard from '../../../components/contactListCard';

const Contacts = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ContactListCard
            image={require('../../../assets/images/avatar.png')}
            name="John Doe"
            date="April 3, 2025"
            email="johndoe@gmail.com"
            phone="5596634498"
            note="Met at technical conference and talked about partnership!"
          />
          <ContactListCard
            image={require('../../../assets/images/avatar-female.webp')}
            name="Jaz Miller"
            date="April 3, 2025"
            email="jazzmiller@gmail.com"
            phone="5596634498"
            note="Might consider hiring"
          />
          <ContactListCard
            image={require('../../../assets/images/avatar.png')}
            name="Jack Cooper"
            date="May 15, 2025"
            email="jack.cooper@ultratech.com"
            phone="9865745362"
            note="Met at Toronto conference. Interesting person!"
          />
          <ContactListCard
            image={require('../../../assets/images/avatar-female.webp')}
            name="Sarah Lee"
            date="May 1, 2025"
            email="lee.sarah24@outlook.com"
            phone="4374563425"
            note="Tech conference. Said she's a graphic designer" 
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  background: {
    backgroundColor: Colors.secondary,
    margin: 16,
    flex: 1,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
  },
});