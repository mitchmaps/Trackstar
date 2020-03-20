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
<<<<<<< HEAD
import Database from "../Database";
=======
>>>>>>> 59a517b149612b56afb68e4b0d6666f600586af8

const HomeScreen = props => {
  const [formattedTaskData, setFormattedTaskData] = useState([]);
  const [nextTask, setNextTask] = useState(new Task ("Study unit 1", new Date("2020-04-11"), 120, 10, false, 1))
  const [nextEval, setNextEval] = useState(new Evaluation ("Deliverable 5", new Date(), 50, "COMP3004"))
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

<<<<<<< HEAD
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

  // let taskMapper: TaskMapper = new TaskMapperImpl();
  // let evalMapper: EvaluationMapper = new EvaluationMapperImpl();


  //   // let nextTask = Task.prioritizer.prioritize(taskMapper.all())

  //   // get the task with the highest priority
  //   taskMapper.all().then((tasks) => {
  //     let sortedTasks: Task[] = Task.prioritizer.prioritize(tasks)
  //       setNextTask(sortedTasks[0]);
  //   });
  
  //   // get associated evalulation
  //   evalMapper.all().then((evals) => {
  //     evals.forEach( evalElement => {
  //       if(evalElement.id = nextTask.evaluation_id)setNextEval(evalElement);
  //     })
  //   })

=======
  const singleItem = data => {
    const item = data.item;
    const formatted_title = `${item.priority}. ${item.title}`;
    return (
      // TO DO: figure out if we wanna keep the alerts Haohao set up. I like it as opposed to going to a new screen
      // TO DO: align checkbox properly
      <Card style={{ width: 350, marginBottom: 10 }}>
        <Card.Title title={formatted_title} />
        <Card.Content style={{ flex: 1, flexDirection: "row" }}>
          <Text style={{ flex: 8 }}>
            {item.course} - {item.evaluation}
          </Text>
          <CircleCheckBox
            style={{ flex: 2 }}
            // checked={item.title == "1. Read Chapter 3" ? true : false}
            outerColor={"#5273eb"}
            innerColor={"#5273eb"}
            onToggle={checked => console.log("My state is: ", checked)}
          />
        </Card.Content>
      </Card>
    );
  };

>>>>>>> 59a517b149612b56afb68e4b0d6666f600586af8
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
};

async function formatData() {
<<<<<<< HEAD

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

=======
  const taskMapper: TaskMapper = new TaskMapperImpl();
  const evalMapper: EvaluationMapper = new EvaluationMapperImpl();
  const courseMapper: CourseMapper = new CourseMapperImpl();

  const formattedData = [];
  const rawData: Task[] = await taskMapper.all();
>>>>>>> 59a517b149612b56afb68e4b0d6666f600586af8
  console.log("raw");
  console.log(rawData);
  
  for (let i = 0; i < rawData.length; i++) {
<<<<<<< HEAD
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
=======
    const task = rawData[i];
    const evaluation: Evaluation = await evalMapper.find(task.evaluation_id);
    const course: Course = await courseMapper.find(evaluation.course_code);
>>>>>>> 59a517b149612b56afb68e4b0d6666f600586af8

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
  }

  return formattedData;
}

export default HomeScreen;
