import { Tabs, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import TabBar from "../../components/TabBar"
import { useAuth } from '../../contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const TabLayout = () => {
  return (
   
    <Tabs
    tabBar={props=> <TabBar {...props} />}
    >
      <Tabs.Screen 
      name="index"
      options={{
        title: "Home",
        headerShown: false,
      }}
      />
      <Tabs.Screen 
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
      }}
      />
      <Tabs.Screen 
      name="contacts"
      options={{
        title: "Contacts",
        headerShown: false,
      }}
      />
      <Tabs.Screen 
      name="more"
      options={{
        title: "More",
        headerShown: false,
      }}
      />
      <Tabs.Screen
        name="(auth)"
        options={{
          headerShown: false, // hides top bar for login, signup
          tabBarButton: () => null, // removes auth from tab bar
        }}
      />
    </Tabs>
  );
}

export default TabLayout