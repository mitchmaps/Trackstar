import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, Button } from "react-native";
import Styles from "../Styles/CourseStyles";

// change this to use index files
import CourseView from '../components/Course/CourseView';
import CourseEdit from '../components/Course/CourseEdit';
import TaskCreate from '../components/Tasks/TaskCreate';


const ViewCourseScreen = ({ route, navigation }) => {
  const Stack = createStackNavigator();
  const { code, name, term, minGrade } = route.params;

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Course view"
        component={CourseView}
        initialParams={{
          code: code,
          name: name,
          term: term,
          minGrade: minGrade
        }}
      />
      <Stack.Screen name="Course Edit" component={CourseEdit} />
      <Stack.Screen name="Task Create" component={TaskCreate} />
    </Stack.Navigator>
  );
};

export default ViewCourseScreen;
