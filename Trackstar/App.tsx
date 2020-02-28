import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';// import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './screens/DashboardScreen';
import CoursesSreen from './screens/CourseScreen';
import GradesScreen from './screens/GradesScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={CoursesSreen} />
      <Tab.Screen name="Grades" component={GradesScreen} />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    )
  }
}