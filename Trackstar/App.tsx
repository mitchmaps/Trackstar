import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';// import {createStackNavigator} from 'react-navigation-stack';
import { createStackNavigator } from '@react-navigation/stack';
import {createAppContainer} from "react-navigation";
import { AntDesign } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import GradesScreen from './screens/GradesScreen';
import DashboardScreen from './screens/DashboardScreen';

import CourseScreen from './screens/CourseScreen';
import AddCourseScreen from './screens/AddCourseScreen';



const Stack = createStackNavigator();

const DashboardStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Add" component={AddCourseScreen} />
      <Stack.Screen name="Course" component={CourseScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Courses') {
            iconName = 'book';
          } else {
            iconName = 'calculator';
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardStack} />
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