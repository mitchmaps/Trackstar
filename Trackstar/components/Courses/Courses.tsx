import React from 'react';
import { Text, View } from 'react-native';
import Styles from './Styles';

import CourseCreate from './components/CourseCreate';

export default function Courses() {
  return (
    <View style={Styles.content}>
      <Text>Courses View!</Text>
      <CourseCreate />
    </View>
  );
}