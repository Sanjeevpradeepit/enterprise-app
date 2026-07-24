import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from '@/design-system/icons';
import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { ProfileScreen } from '@/features/home/screens/ProfileScreen';

export type BottomTabParamList = {
  Home: undefined;
  Jobs: undefined;
  Candidates: undefined;
  Interviews: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return (
                <Icon
                  name="home"
                  size={size}
                  color={color}
                />
              );

            case 'Jobs':
              return (
                <Icon
                  name="job"
                  size={size}
                  color={color}
                />
              );

            case 'Candidates':
              return (
                <Icon
                  name="users"
                  size={size}
                  color={color}
                />
              );

            case 'Interviews':
              return (
                <Icon
                  name="calendar"
                  size={size}
                  color={color}
                />
              );

            case 'Profile':
              return (
                <Icon
                  name="user"
                  size={size}
                  color={color}
                />
              );

            default:
              return null;
          }
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Jobs"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My Jobs',
        }}
      />

      <Tab.Screen
        name="Candidates"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My Candidates',
        }}
      />

      <Tab.Screen
        name="Interviews"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My Interview',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}