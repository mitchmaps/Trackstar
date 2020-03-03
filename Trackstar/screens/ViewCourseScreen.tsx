import React from "react";
import { Text, View, Button } from "react-native";
import Styles from "../Styles/CourseStyles";

import CourseView from "../components/Courses/CourseView";

const ViewCourseScreen = ({ route, navigation }) => {
  const { code, name, term, minGrade } = route.params;

  return (
    <View style={Styles.content}>
      <CourseView code={code} name={name} term={term} minGrade={minGrade} />
    </View>
  );
};

export default ViewCourseScreen;
