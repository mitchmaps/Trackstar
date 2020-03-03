import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';// import {createStackNavigator} from 'react-navigation-stack';
import { createStackNavigator } from '@react-navigation/stack';
import {createAppContainer} from "react-navigation";
import { AntDesign } from '@expo/vector-icons';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


import HomeScreen from './screens/DashboardScreen';
import GradesScreen from './screens/GradesScreen';
import CoursesDashboard from './screens/CoursesDashboard';

import ViewCourseScreen from './screens/ViewCourseScreen';
import CourseCreate from './screens/CourseCreate';

const Stack = createStackNavigator();

// Dashboard Stack Navigation - HaoHao
const CoursesStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={CoursesDashboard} />
      <Stack.Screen name="Course" component={ViewCourseScreen} />
      <Stack.Screen name="Add" component={CourseCreate} />
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
        activeTintColor: '#5273eb',
        inactiveTintColor: 'gray',
      }}
    >
      
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={CoursesStack} /> 
      <Tab.Screen name="Grades" component={GradesScreen} />
    </Tab.Navigator>
  );
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
          <MyTabs />
        </NavigationContainer>
      </PaperProvider>
    )
  }
}