import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import HomeDashboard from './screens/DashboardScreen';
import Courses from './screens/CourseScreen';

const AppNavigator = createStackNavigator({
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