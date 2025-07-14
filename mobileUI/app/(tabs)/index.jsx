import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button  } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import Colors from "../../constants/Colors";
import EventAnalytics from "../../components/eventAnalytics"
import ProfileAnalytics from "../../components/profileAnalytics"
import BottomSheet from '../../components/BottomSheet';

const Home = () => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  return (
    <>
    <View style={styles.container}>
      <View style={styles.greetingHeader}>
        <Text style={styles.headerText}>Hello, Mary!</Text>
        <TouchableOpacity
        onPress={() => setIsSheetVisible(true)}>
          <Image 
          style={styles.image}
          source={require('../../assets/images/avatar.png')} />
        </TouchableOpacity>
        
      </View>
      <ProfileAnalytics />
      {/* <EventAnalytics /> */}
      {/* <AuthTabView/> */}
    </View>

    <BottomSheet visible={isSheetVisible} onClose={() => setIsSheetVisible(false)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          Bottom Sheet Content
        </Text>
      </BottomSheet>
    
    </>

  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
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
});