import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Course from '../models/Course';

const TestScreen = (props) => {
  const navigation = props.navigation;
    return (
      <TouchableOpacity style={{marginTop: 100}}onPress={() => {Course.all()}}>
        <Text>All Courses</Text>
      </TouchableOpacity>
    );
};

export default TestScreen;