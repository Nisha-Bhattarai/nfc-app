import { View, Text, StyleSheet, Platform } from 'react-native'
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react'
import Colors from "../constants/Colors"

const TabBar = ({ state, descriptors, navigation }) => {
    const { buildHref } = useLinkBuilder();
    const insets = useSafeAreaInsets();

    const icons = {
        index: (props)=> <AntDesign name="home" size={24} color={Colors.textSecondary} {...props} />,
        profile: (props)=> <AntDesign name="user" size={24} color={Colors.textSecondary} {...props} />,
        contacts: (props)=> <AntDesign name="contacts" size={24} color={Colors.textSecondary} {...props} />,
        more: (props)=> <Feather name="more-horizontal" size={24} color={Colors.textSecondary} {...props} />
    }
  return (
    <View style={[styles.tabbar, { paddingBottom: insets.bottom + 10 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

              if(['(auth)'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <PlatformPressable
            key={route.key} 
            style={styles.tabbarItem}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {
                icons[route.name]({
                    color: isFocused ? Colors.accent : Colors.textSecondary 
                })
            }
            <Text style={{ 
                color: isFocused ? Colors.accent : Colors.textSecondary,
                fontSize: 11 
            }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 20,
      },
      tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4
      }
})

export default TabBar