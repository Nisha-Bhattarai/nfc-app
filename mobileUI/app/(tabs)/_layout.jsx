import { Tabs, Stack } from 'expo-router';
import React from 'react';
import TabBar from "../../components/TabBar"

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