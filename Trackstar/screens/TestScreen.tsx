import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Course from '../models/Course';
import Evaluation from '../models/Evaluation';
import Database from '../Database';

const TestScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View>

        <TouchableOpacity style={{marginTop: 100}}onPress={() => {Database.init()}}>
          <Text>Init DB</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 100}} onPress={() => {Database.populateCourseTable()}}>
          <Text>Load Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 100}}onPress={() => {
          Course.all().then((data) => {
            let courses: Course[] = data;
            console.log("All courses:")
            console.log(courses.length)
            courses.forEach(course => {
              console.log(course)
            })
          })
        }}>
          <Text>All Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          let newCourse = new Course("COMP3004", "OOP", 90)
          newCourse.save()
        }}>
        <Text>Add Course</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 100}} onPress={() => {Evaluation.all()}}>
          <Text>All Evaluations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 100}} onPress={() => {
          // Database.deleteTaskTable()
          Database.deleteEvalTable()
          Database.deleteCourseTable()
        }}>
          <Text>Wipe DB</Text>
        </TouchableOpacity>
      </View>
    );
};

export default TestScreen;