import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import CircleCheckBox, { LABEL_POSITION } from "react-native-circle-checkbox";
import Modal from "react-native-modal";
import { iOSUIKit } from "react-native-typography";

import { Task, Evaluation, Course } from "../models";
import {
  CourseMapper,
  CourseMapperImpl,
  EvaluationMapper,
  EvaluationMapperImpl,
  TaskMapper,
  TaskMapperImpl
} from "../data_mappers";
import { useFocusEffect } from "@react-navigation/native";

interface TaskDescriptor {
  task: Task;
  evalName: string;
  courseCode: string;
}

const HomeScreen = props => {
  const [formattedTaskData, setFormattedTaskData] = useState<TaskDescriptor[]>(
    []
  );
  const [fakeState, setFakeState] = useState(new Date());
  const [modalActive, setModalActive] = useState(false);
  const [taskBeingCompleted, setTaskBeingCompleted] = useState<TaskDescriptor>(
    null
  );
  const [currActualDuration, setCurrActualDuration] = useState("");

  const [nextCourseCode, setNextCourseCode] = useState("Temporary Evaluation Course Code");  //for evaluation display
  const [nextEvalDueDate, setNextEvalDueDate] = useState("Temporary Evaluation Due Date");
  const [nextEvalTitle, setNextEvalTitle] = useState("Temporary Evaluation Title");




  const taskDataRef = useRef(formattedTaskData);
  const setTaskData = data => {
    taskDataRef.current = data;
    setFormattedTaskData(data);
  };

  const taskCompletedRef = useRef(taskBeingCompleted);
  const setTaskCompleted = data => {
    taskCompletedRef.current = data;
    setTaskBeingCompleted(data);
  };

  const currActualDurationRef = useRef(currActualDuration);
  const setCurrActualDurationRef = data => {
    currActualDurationRef.current = data;
    setCurrActualDuration(data);
  };

  const navigation = props.navigation;

  useFocusEffect(
    React.useCallback(() => {
      const formattedTasks = formatData().then(data => {
        setTaskData(data);
      });
    }, [])
  );

  const handleTaskCompletion = useCallback(() => {
    const taskToUpdate: TaskDescriptor = taskCompletedRef.current;

    taskToUpdate.task.complete = true;
    taskToUpdate.task.actual_duration = +currActualDurationRef.current;
    updateTask(taskToUpdate);
    setCurrActualDurationRef("");
    setModalActive(false);
    // trigger re render
    setFakeState(new Date());
  }, []);

  const handleTaskSelection = useCallback(
    id => {
      const task = findTaskById(taskDataRef.current, id);
      setTaskCompleted(task);
      setModalActive(true);
    },
    [taskDataRef.current]
  );

  const tasksMarkup = generateTasksMarkup(
    formattedTaskData,
    handleTaskSelection
  );

  function getNextEval(){
    const taskMapper: TaskMapper = new TaskMapperImpl();
    const evalMapper: EvaluationMapper = new EvaluationMapperImpl();
  
    let evalList = new Map();
    let evalDDList: Date[] = [];
    let finalList: Evaluation[] = [];
    let currentEval: Evaluation;
  
    evalMapper.all().then(evals=>{ // get all evaluations for user
      
        evals.forEach( evals_element =>{ // for each task check which evaluation it maps to
            if(!(evals_element.complete)){
              evalDDList.push(evals_element.due_date); // push evaluation due date to a list
              evalList.set(evals_element.due_date, evals_element); // push evaluation due date and its respective evaluation to a map
            }
        });

        evalDDList = evalDDList.sort((a,b)=>{return b.getTime()-a.getTime()}); // sort the evaluation due date list
        evalDDList.forEach(element=>{
          finalList.push(evalList.get(element)); // retrieve all the evaluation objects based off of due date and store them into a final list
        })
        currentEval = finalList[0]; // take the largest one and reset states equal to that

        setNextCourseCode(currentEval.course_code);  // make sure that all of this resides in the .then statement so that it acts synchronously
        setNextEvalDueDate(currentEval.due_date.toDateString());
        setNextEvalTitle(currentEval.title);
      })
  }
	
  function checkForNoEvaluations(){
	  if(nextEvalDueDate == "Temporary Evaluation Due Date"){
		  return(
		  Alert.alert(
			  "You currently have no evaluations",
			  "Please use the course screen to edit and add evaluations",
			  [{text: 'Back'}]));}
  }
	

  const modalMarkup =
    taskBeingCompleted !== null ? (
      <Modal isVisible={modalActive} hasBackdrop={true}>
        <View
          style={{
            height: "55%",
            // marginBottom: 40,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Card.Content style={{marginTop: "10%"}}>
            <Text style={iOSUIKit.largeTitleEmphasized}>Complete task</Text>
            <Text style={iOSUIKit.subheadEmphasized}>
              {taskBeingCompleted.task.title}
            </Text>
            <View style={{ flex: 1, marginTop: 20 }}>
              <Text
                style={{ marginBottom: 20 }}
              >{`When you created this task you estimated it would take ${taskBeingCompleted.task.est_duration} minutes.`}</Text>
              <Text>How long did you actually spend on this task?</Text>
              <TextInput
                label="Time (in minutes)"
                keyboardType="numeric"
                onChangeText={text => {
                  setCurrActualDurationRef(text);
                }}
                value={currActualDuration}
              />
              <Button
                disabled={currActualDurationRef.current === ''}
                style={{ marginTop: 20 }}
                mode="contained"
                onPress={() => {
                  handleTaskCompletion();
                }}
              >
                Submit
              </Button>
              <Button
                style={{ marginTop: 20, backgroundColor: "red" }}
                mode="contained"
                onPress={() => {
                  setModalActive(false);
                }}
              >
                Cancel
              </Button>
            </View>
          </Card.Content>
        </View>
      </Modal>
    ) : null;

  return (
    <LinearGradient
      colors={["#bcf7ed", "#5273eb"]}
      style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
    >
    {checkForNoEvaluations()}
      <View style={{ flexDirection: "column", marginTop: 100 }}>
        <Text style={{ fontSize: 45, color: "white", textAlign: "center" }}>
          Welcome Back!
          </Text>
        <Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>
			    Next Evaluation: {nextCourseCode} - {nextEvalTitle}
        </Text>
        <Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>
          Due: {nextEvalDueDate}
        </Text>
      </View>
      <ScrollView style={{ marginTop: 50 }}>
        {modalMarkup}
        {tasksMarkup}
      </ScrollView>
    </LinearGradient>
  );
};

function generateTasksMarkup(tasks: TaskDescriptor[], handleModalChange) {
  const allTasks = [];

  tasks.forEach((currTask: TaskDescriptor) => {
    const {
      task: { title, complete, priority, id },
      evalName,
      courseCode
    } = currTask;

    const formatted_title = `${priority}. ${title}`;
    const opacity = complete ? 0.5 : 1;

    const statusMarkup = !complete ? (
      <CircleCheckBox
      style={{ flex: 2 }}
      // checked={item.title == "1. Read Chapter 3" ? true : false}
      checked={complete ? true : false}
      outerColor={"#5273eb"}
      innerColor={"#5273eb"}
      onToggle={() => {
        handleModalChange(id);
      }}
    />
    ) : <Text>Complete</Text>;

    const taskMarkup = (
      <View opacity={opacity}>
        <Card style={{ width: 350, marginBottom: 10 }}>
          <Card.Title title={formatted_title} />
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ flex: 8, color: "#7c7c7c"}}>
              {courseCode} - {evalName}
            </Text>
            {statusMarkup}
          </Card.Content>
        </Card>
      </View>
    );

    allTasks.push(<View key={id}>{taskMarkup}</View>);
  });

  return allTasks;
}

async function formatData() {
  const taskMapper: TaskMapper = new TaskMapperImpl();
  const evalMapper: EvaluationMapper = new EvaluationMapperImpl();
  const courseMapper: CourseMapper = new CourseMapperImpl();

  const formattedData = [];
  const rawData: Task[] = await taskMapper.all();

  for (let i = 0; i < rawData.length; i++) {
    const task = rawData[i];
    const evaluation: Evaluation = await evalMapper.find(task.evaluation_id);
    const course: Course = await courseMapper.find(evaluation.course_code);


    const taskInfo: TaskDescriptor = {
      task: task,
      evalName: evaluation.title,
      courseCode: course.code
    };

    formattedData.push(taskInfo);
    checkForNoEvaluations();
  }

  return formattedData;
}

async function updateTask(task: TaskDescriptor) {
  const taskMapper: TaskMapper = new TaskMapperImpl();

  taskMapper.update(task.task, true);
}

function findTaskById(tasks: TaskDescriptor[], id) {
  let task: TaskDescriptor;
  tasks.forEach(item => {
    if (item.task.id === id) {
      task = item;
    }
  });

  return task;
}

export default HomeScreen;
