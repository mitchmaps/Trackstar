import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Course from '../models/Course';
import Evaluation from '../models/Evaluation';
import Task from '../models/Task';
import Database from '../Database';

const TestScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={{marginTop: 100}}>
        <TouchableOpacity style={styles.button} onPress={() => {Database.init()}}>
          <Text>Init DB</Text>
        </TouchableOpacity>

        <Text>Course</Text>

        <TouchableOpacity style={styles.button} onPress={() => {Database.populateCourseTable()}}>
          <Text>Load Courses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
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

        <TouchableOpacity style={styles.button} onPress={() => {
          let newCourse = new Course("COMP3004", "OOP", 90)
          newCourse.save()
        }}>
        <Text>Add Course</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {Course.find("COMP3008")}}>
          <Text>Find Course 3008</Text>
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