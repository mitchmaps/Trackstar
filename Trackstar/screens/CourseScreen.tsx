import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles/CourseStyles';

const Courses = (props) => {
  const navigation = props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Courses View!</Text>
      </View>
    );
};

Courses.navigationOptions = () => {
  return {
    headerShown: false
  };
};

export default Courses;