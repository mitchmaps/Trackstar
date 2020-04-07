import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {createAppContainer} from "react-navigation";
import { AntDesign } from '@expo/vector-icons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


import HomeScreen from './screens/DashboardScreen';
import GradesScreen from './screens/GradesScreen';
import CoursesScreen from './screens/CoursesScreen';
import CoursesDashboard from './screens/CoursesDashboard';
import TestScreen from './screens/TestScreen';

import ViewCourseScreen from './screens/ViewCourseScreen';
import CourseCreate from './screens/CourseCreate';

const Stack = createStackNavigator();

// change this into a seperate class component
const Tab = createBottomTabNavigator();
class TabNavigator extends React.Component{
  render() {
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
          activeTintColor: '#5273eb',
          inactiveTintColor: 'gray',
        }}
      >

        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Courses" component={CoursesScreen} />
        <Tab.Screen name="Grades" component={GradesScreen} />
        <Tab.Screen name="Testing" component={TestScreen} />
      </Tab.Navigator>
    );
  }
}

export default class App extends React.Component {
  render() {
    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'dodgerblue',
        accent: 'tomato',
      },
    };

    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </PaperProvider>
    )
  }
}