import React from "react";
import { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SectionList,
  StyleSheet
} from "react-native";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";

import {Task, Evaluation, Course} from '../models';
import {
  CourseMapper,
  CourseMapperImpl,
  EvaluationMapper,
  EvaluationMapperImpl,
  TaskMapper,
  TaskMapperImpl,
} from "../data_mappers";
import Database from "../Database";

const HomeScreen = props => {
  const [formattedTaskData, setFormattedTaskData] = useState([]);
  const [nextTask, setNextTask] = useState(new Task ("Study unit 1", new Date("2020-04-11"), 120, 10, false, 1))
  const [nextEval, setNextEval] = useState(new Evaluation ("Project 1", new Date(), 20, "COMP3008"))
  const navigation = props.navigation;


  useEffect(() => {
    const formattedTasks = formatData().then(data => {
      console.log("formatted");
      console.log(data);
      setFormattedTaskData(data);
      console.log("state");
      console.log(formattedTaskData);
    });
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

  let taskMapper: TaskMapper = new TaskMapperImpl();
  let evalMapper: EvaluationMapper = new EvaluationMapperImpl();

  taskMapper.all().then((tasks) => {
    Task.prioritizer.prioritize(tasks)
  })

  //   // let nextTask = Task.prioritizer.prioritize(taskMapper.all())

    // get the task with the highest priority
    // taskMapper.all().then((tasks) => {
    //   let sortedTasks: Task[] = Task.prioritizer.prioritize(tasks)
    //     setNextTask(sortedTasks[0]);
    // });
  
    // // get associated evalulation
    // evalMapper.all().then((evals) => {
    //   evals.forEach( evalElement => {
    //     if(evalElement.id = nextTask.evaluation_id)setNextEval(evalElement);
    //   })
    // })

  return (
    <LinearGradient
      colors={["#bcf7ed", "#5273eb"]}
      style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
    >
      <View style={{ flexDirection: "column", marginTop: 100 }}>
        <Text style={{ fontSize: 45, color: "white", textAlign: "center" }}>
          Welcome Back!
        </Text>
        <Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>
          Next Evaluation: PHIL 1200 - Test 1
        </Text>
        <Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>
          Due March 10th
        </Text>
      </View>
      {/* TO DO: figure out how to raise this section */}
      <SectionList
        style={{ marginTop: 50 }}
        sections={formattedTaskData}
        renderItem={singleItem}
      />
    </LinearGradient>
  );


async function formatData() {

console.log("CALLING DATABASE INITT ----------------------------------------------------\n\n\n\n\n\n\n");


  Database.init();

  Database.populateTaskTable();
  Database.populateEvalTable();
  Database.populateCourseTable();

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
      data.forEach(element => {
        if(element.id == task.evaluation_id)
          {
            setNextEval(element);
            console.log(element);
          }
      });
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
          course: evaluation.course_code
        }
      ]
    };
    formattedData.push(taskInfo);
  }

  return formattedData;
}
};

export default HomeScreen;
