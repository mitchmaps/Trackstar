import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Course from '../models/Course';
import Evaluation from '../models/Evaluation';
import Task from '../models/Task';
import Database from '../Database';
import CourseMapperImpl from '../data_mappers/CourseMapperImpl';
import CourseMapper from '../data_mappers/CourseMapper';

const TestScreen = (props) => {
  const navigation = props.navigation;
  let courseMapper: CourseMapper = new CourseMapperImpl

    return (
      <View style={{marginTop: 100}}>
        {/* <TouchableOpacity style={styles.button} onPress={() => {Database.init()}}>
          <Text>Init DB</Text>
        </TouchableOpacity> */}

        <Text>Course</Text>

        <TouchableOpacity style={styles.button} onPress={() => {
          let mapper = new CourseMapperImpl
          mapper.createTable()
        }}>
          <Text>Init</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button} onPress={() => {Database.populateCourseTable()}}>
          <Text>Load Courses</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.button} onPress={() => {
          courseMapper.all().then((data) => {
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

        <TouchableOpacity style={styles.button} onPress={() => {
          let newCourse = new Course("OOP", "COMP3004", 90)
          courseMapper.insert(newCourse)
        }}>
        <Text>Add 3004</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          let newCourse = new Course("OOP", "COMP3004", 90)
          courseMapper.delete(newCourse)
        }}>
          <Text>Delete 3004</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          courseMapper.find("COMP3004").then ((course) => {
            console.log(`found: ${course.code}`)
          })
        }}>
          <Text>Find Course 3004</Text>
        </TouchableOpacity>

        <Text>Evaluation</Text>
        <TouchableOpacity style={styles.button} onPress={() => {Database.populateEvalTable()}}>
          <Text>Load Evaluations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {Evaluation.all()}}>
          <Text>All Evaluations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {Evaluation.find(1)}}>
          <Text>Find Evaluation 1</Text>
        </TouchableOpacity>

        <Text>Task</Text>

        <TouchableOpacity style={styles.button} onPress={() => {Database.populateTaskTable()}}>
          <Text>Load Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {Task.all()}}>
          <Text>All Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.wipe} onPress={() => {
          Database.deleteTaskData()
          Database.deleteEvalData()
          Database.deleteCourseData()
        }}>
          <Text>Delete Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.wipe} onPress={() => {
          Database.deleteTaskTable()
          Database.deleteEvalTable()
          Database.deleteCourseTable()
        }}>
          <Text>Drop Tables</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    backgroundColor: "pink",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 10
  },
  wipe: {
    width: 200,
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 10,
  }
})

export default TestScreen;