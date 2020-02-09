import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

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
    initialRouteName: 'Dashboard',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}