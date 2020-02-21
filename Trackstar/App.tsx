import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { HomeDashboard } from './components/HomeDashboard/HomeDashboard';
import { Courses } from './components/Courses/Courses';

const AppNavigator = createBottomTabNavigator({
  Dashboard: HomeDashboard,
  Courses: Courses,
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