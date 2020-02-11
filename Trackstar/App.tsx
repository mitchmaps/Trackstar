import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import { HomeDashboard } from './components/HomeDashboard/HomeDashboard';
import { Courses } from './components/Courses/Courses';

import { CourseCreate } from './components/Courses/components/CourseCreate'; 

const dashboardStack = createStackNavigator({
  Dashboard: HomeDashboard,
});

const coursesStack = createStackNavigator({
  Courses: Courses,
  AddCourse: CourseCreate,
});

const AppNavigator = createBottomTabNavigator({
  Dashboard: dashboardStack,
  Courses: coursesStack,
  },
  {
    initialRouteName: 'Courses',
  }
);

const AppContainer = createAppContainer(AppNavigator);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3e7cf9",
    accent: "#3ef9bb",
  }
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppContainer />
    </PaperProvider>
  );
}