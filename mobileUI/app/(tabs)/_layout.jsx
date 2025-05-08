import { Tabs } from 'expo-router';
import React from 'react';
import Colors from '@/constants/Colors';
import TabBar from "../../components/TabBar"

const TabLayout = () => {
  return (
    <Tabs
  
    tabBar={props=> <TabBar {...props} />}
    >
      <Tabs.Screen 
      name="index"
      options={{
        title: "Home"
      }}
      />
      <Tabs.Screen 
      name="profile"
      options={{
        title: "Profile"
      }}
      />
      <Tabs.Screen 
      name="contacts"
      options={{
        title: "Contacts"
      }}
      />
      <Tabs.Screen 
      name="more"
      options={{
        title: "More"
      }}
      />
    </Tabs>
  );
}

export default TabLayout