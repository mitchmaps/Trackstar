import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Course from '../models/Course';
import Evaluation from '../models/Evaluation';
import Task from '../models/Task';
import Database from '../Database';
import CourseMapperImpl from '../data_mappers/CourseMapperImpl';
import CourseMapper from '../data_mappers/CourseMapper';
import EvaluationMapper from '../data_mappers/EvaluationMapper';
import TaskMapper from '../data_mappers/TaskMapper';
import TaskMapperImpl from '../data_mappers/TaskMapperImpl';
import EvaluationMapperImpl from '../data_mappers/EvaluationMapperImpl';

const TestScreen = (props) => {
  const navigation = props.navigation;
  let courseMapper: CourseMapper = new CourseMapperImpl
  let evalMapper: EvaluationMapper = new EvaluationMapperImpl
  let taskMapper: TaskMapper = new TaskMapperImpl

    return (
      <View style={{marginTop: 100}}>
        <TouchableOpacity style={styles.button} onPress={() => {
          let cmapper = new CourseMapperImpl
          let emapper = new EvaluationMapperImpl
          let tmapper = new TaskMapperImpl
        }}>
          <Text>Init DB</Text>
        </TouchableOpacity>

        <Text>Course</Text>

        <TouchableOpacity style={styles.button} onPress={() => {Database.populateCourseTable()}}>
          <Text>Load Courses</Text>
        </TouchableOpacity>

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
            if (course == null) {
              console.log("Course not found")
            }
            else {
              console.log(`found: ${course.code}`)
            }
          })
        }}>
          <Text>Find Course 3004</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          courseMapper.find("COMP3004").then((c1) => {
            console.log(`complete (before): ${c1.complete}`)
            c1.complete = true;
            courseMapper.update(c1);
            courseMapper.find("COMP3004").then((c2) => {
              console.log(`complete (after): ${c2.complete}`)
            })
          })
        }}>
          <Text>Update 3004</Text>
        </TouchableOpacity>

        <Text>Evaluation</Text>
        <TouchableOpacity style={styles.button} onPress={() => {Database.populateEvalTable()}}>
          <Text>Load Evaluations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          evalMapper.all().then((data) => {
            let evals: Evaluation[] = data;
            console.log("All evals:")
            console.log(evals.length)
            evals.forEach(evaltn => {
              console.log(evaltn)
            })
          })
        }}>
          <Text>All Evaluations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          evalMapper.findByCourse("COMP3004").then((data) => {
            let evals: Evaluation[] = data;
            console.log("Evals for COMP3004:")
            console.log(evals.length)
            evals.forEach(evaltn => {
              console.log(evaltn)
            })
          })
        }}>
          <Text>Find for course 3004</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          evalMapper.find(1).then ((evaltn) => {
            console.log(`found: ${evaltn.title}`)
          })
        }}>
          <Text>Find Evaluation 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          evalMapper.find(1).then((e1) => {
            console.log(`complete (before): ${e1.complete}`)
            e1.complete = true;
            evalMapper.update(e1);
            evalMapper.find(1).then((e2) => {
              console.log(`complete (after): ${e2.complete}`)
            })
          })
        }}>
          <Text>Update Eval 1</Text>
        </TouchableOpacity>

        <Text>Task</Text>

        <TouchableOpacity style={styles.button} onPress={() => {Database.populateTaskTable()}}>
          <Text>Load Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          taskMapper.all().then((data) => {
            let tasks: Task[] = data;
            console.log("All tasks:")
            console.log(tasks.length)
            tasks.forEach(task => {
              console.log(task)
            })
          })
        }}>
          <Text>All Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          taskMapper.findByEval(10).then((data) => {
            let tasks: Task[] = data;
            console.log("Task for eval 10:")
            console.log(tasks.length)
            tasks.forEach(task => {
              console.log(task)
            })
          })
        }}>
          <Text>Find for eval 10</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          taskMapper.find(1).then ((task) => {
            console.log(`found: ${task.title}`)
          })
        }}>
          <Text>Find Task 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {
          taskMapper.find(1).then((task1) => {
            console.log(`complete (before): ${task1.complete}`)
            task1.complete = true;
            taskMapper.update(task1);
            taskMapper.find(1).then((task2) => {
              console.log(`complete (after): ${task2.complete}`)
            })
          })
        }}>
          <Text>Update Task 1</Text>
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