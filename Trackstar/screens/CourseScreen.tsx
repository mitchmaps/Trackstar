import React from 'react';
import { Text, View, Button } from 'react-native';
import Styles from '../Styles/CourseStyles';

import CourseCreate from '../components/Courses/CourseCreate';

const CoursesScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Courses View!</Text>
        <CourseCreate />
      </View>
    );
};

export default CoursesScreen;