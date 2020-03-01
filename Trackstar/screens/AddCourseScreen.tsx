import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles/CourseStyles';

const AddCourseScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Adding Courses Screen</Text>
      </View>
    );
};

export default AddCourseScreen;