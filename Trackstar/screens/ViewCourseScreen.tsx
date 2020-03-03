import React from "react";
import { Text, View, Button } from "react-native";
import Styles from "../Styles/CourseStyles";

import CourseView from "../components/Courses/CourseView";

const ViewCourseScreen = ({ route, navigation }) => {
  const { code, name, term } = route.params;

  return (
    <View style={Styles.content}>
      <CourseView code={code} name={name} term={term} />
    </View>
  );
};

export default ViewCourseScreen;
