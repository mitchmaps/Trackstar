import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles/CourseStyles';

import CourseCreate from '../components/Courses/CourseCreate';

const AddCourseScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={Styles.content}>
        <CourseCreate />
      </View>
    );
};

export default AddCourseScreen;