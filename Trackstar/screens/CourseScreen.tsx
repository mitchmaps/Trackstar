import React from 'react';
import { Text, View, Button } from 'react-native';
import Styles from '../Styles/CourseStyles';

const CourseScreen = props => {
  const navigation = props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Courses View!</Text>
      </View>
    );
};

export default CourseScreen;