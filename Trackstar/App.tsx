import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { CourseDashboard } from "./components/CourseDashboard/CourseDashboard";

const AppNavigator = createBottomTabNavigator({
  CourseDashboard: { screen: CourseDashboard }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}