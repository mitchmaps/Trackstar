import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Course from '../models/Course';

const TestScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View>
        <TouchableOpacity style={{marginTop: 100}}onPress={() => {Course.all()}}>
          <Text>All Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          let newCourse = new Course("COMP3004", "OOP", 90)
          newCourse.save()
        }}>
        <Text>Add Course</Text>
        </TouchableOpacity>
      </View>
    );
};

export default TestScreen;