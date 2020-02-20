import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CourseDashboard from "./screens/CourseDashboard";
import { HomeDashboard } from './components/HomeDashboard/HomeDashboard';
// import Database from './Database';

// const db = new Database();

const AppNavigator = createBottomTabNavigator({
  Dashboard: HomeDashboard,
  Courses: CourseDashboard,
  },
  {
    initialRouteName: 'Courses',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}