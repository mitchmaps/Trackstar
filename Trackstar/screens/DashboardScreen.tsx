import React from 'react';
import { useEffect, useState, useCallback } from "react";
import { Text, View, TouchableOpacity, SectionList, StyleSheet } from "react-native";
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import Task from "../models/Task";
import Evaluation from "../models/Evaluation";
import Course from '../models/Course';
import DataBase from '../Database'
import TaskMapper from '../data_mappers/TaskMapper';
import TaskMapperImpl from '../data_mappers/TaskMapperImpl';
import EvaluationMapper from '../data_mappers/EvaluationMapper';
import EvaluationMapperImpl from '../data_mappers/EvaluationMapperImpl';
import CourseMapper from '../data_mappers/CourseMapper';
import CourseMapperImpl from '../data_mappers/CourseMapperImpl';

const HomeScreen = (props) => {
  const [formattedTaskData, setFormattedTaskData] = useState([]);
  const navigation = props.navigation;

  useEffect(() => {
    const formattedTasks = formatData().then((data) => {
      console.log("formatted");
      console.log(data);
      setFormattedTaskData(data);
      console.log('state');
      console.log(formattedTaskData);
    })
  }, []);

  const singleItem = (data) => {
    const item = data.item
    const formatted_title = `${item.priority}. ${item.title}`
    if(item.complete == true)console.log("item is checked off");
    else console.log("item is not checked off");
      return (
        // TO DO: figure out if we wanna keep the alerts Haohao set up. I like it as opposed to going to a new screen
        // TO DO: align checkbox properly
        <Card style={{width: 350, marginBottom: 10}}>
            <Card.Title title={formatted_title}/>
            <Card.Content style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{flex: 8}}>{item.course} - {item.evaluation}</Text>
              <Text style={{flex: 80}}>{(item.due_date).toDateString()}</Text>
              <CircleCheckBox
                style={{flex: 2}}
                // checked={item.title == "1. Read Chapter 3" ? true : false}
                outerColor = {'#5273eb'}
                innerColor = {'#5273eb'}
                onToggle={(checked) =>{
                  console.log('My state is: ', checked);
                  item.complete = true;
                }}
              />
            </Card.Content>
        </Card>
      );
  };

  return(
    <LinearGradient
      colors={['#bcf7ed', '#5273eb']}
      style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}
    >
      <View style={{flexDirection: 'column', marginTop: 100}}>
        <Text style={{fontSize: 45, color: "white", textAlign: "center"}}>Welcome Back!</Text>
        <Text style={{fontSize: 15, color: "white", textAlign: "center"}}>Next Evaluation: PHIL 1200 - Test 1</Text>
        <Text style={{fontSize: 15, color: "white", textAlign: "center"}}>Due March 10th</Text>
      </View>
      {/* TO DO: figure out how to raise this section */}
      <SectionList
        style={{marginTop: 50}}
        sections={formattedTaskData}
        renderItem={singleItem}
      />
    </LinearGradient>
  );
};

async function formatData() {

console.log("CALLING DATABASE INITT ----------------------------------------------------\n\n\n\n\n\n\n");

  DataBase.init();

  DataBase.populateTaskTable();
  DataBase.populateEvalTable();
  DataBase.populateCourseTable();

  let taskMapper: TaskMapper = new TaskMapperImpl;
  let evalMapper: EvaluationMapper = new EvaluationMapperImpl;
  let courseMapper: CourseMapper = new CourseMapperImpl;

  // let rawData: Task[] = await Task.all();
  let rawData: Task[] = await taskMapper.all();
  
  const formattedData = [];

  console.log("raw");
  console.log(rawData);
  
  for (let i = 0; i < rawData.length; i++) {
    let task = rawData[i];
    
    let evaluation: Evaluation = evalMapper.all().then((data) => {
      let evals: Evaluation[];
      data.forEach(element => {
        if(element.id == task.evaluation_id)
          evals.push(element);
      })
      return evals;
    })

    let course: Course = courseMapper.all().then((data) => {
      let courses: Course[];
      data.forEach(element => {
        if(element.code == evaluation.course_code)
          courses.push(element);
      })
      return courses;
    })

    const taskInfo = {
      title: task.title,
      data: [
        {
          title: task.title,
          priority: task.priority,
          due_date: task.due_date,
          est_duration: task.est_duration,
          complete: task.complete,
          evaluation: evaluation.title,
          course: course.code
        }
      ]
    };
    formattedData.push(taskInfo);
  };

  return formattedData;
}

export default HomeScreen;