import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CoursesDashboard from "./CoursesDashboard";
import ViewCourseScreen from "./ViewCourseScreen";
import CourseCreate from "./CourseCreate";

export default class CoursesScreen extends React.Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator>
        <Stack.Screen name="My Courses" component={CoursesDashboard} />
        <Stack.Screen name="Course" component={ViewCourseScreen} />
        <Stack.Screen name="Add" component={CourseCreate} />
      </Stack.Navigator>
    );
  }
}
