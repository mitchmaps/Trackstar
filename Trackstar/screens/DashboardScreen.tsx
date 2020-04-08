import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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
  TaskMapperImpl,
} from "../data_mappers";
import { useFocusEffect } from "@react-navigation/native";

interface TaskDescriptor {
  task: Task;
  evalName: string;
  courseCode: string;
}

const HomeScreen = (props) => {
  const [formattedTaskData, setFormattedTaskData] = useState<TaskDescriptor[]>(
    []
  );
  const [fakeState, setFakeState] = useState(new Date());
  const [modalActive, setModalActive] = useState(false);
  const [taskBeingCompleted, setTaskBeingCompleted] = useState<TaskDescriptor>(
    null
  );
  const [currActualDuration, setCurrActualDuration] = useState("");

  const [nextEval, setNextEval] = useState<Evaluation>(null);
  const [nextCourseCode, setNextCourseCode] = useState(""); //for evaluation display
  const [nextEvalDueDate, setNextEvalDueDate] = useState("n/a"); //if you change this string you have to change alert if ("")
  const [nextEvalTitle, setNextEvalTitle] = useState(
    "no evaluations coming up"
  );

  const taskDataRef = useRef(formattedTaskData);
  const setTaskData = (data) => {
    taskDataRef.current = data;
    setFormattedTaskData(data);
  };

  const taskCompletedRef = useRef(taskBeingCompleted);
  const setTaskCompleted = (data) => {
    taskCompletedRef.current = data;
    setTaskBeingCompleted(data);
  };

  const currActualDurationRef = useRef(currActualDuration);
  const setCurrActualDurationRef = (data) => {
    currActualDurationRef.current = data;
    setCurrActualDuration(data);
  };

  const navigation = props.navigation;

  useFocusEffect(
    React.useCallback(() => {
      const formattedTasks = formatData().then((data) => {
        setTaskData(data);
      });

      const evalData = getEvalData().then((data) => {
        setNextEval(data[0]);
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
    (id) => {
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

  const noTasksMarkup =
    taskDataRef.current.length === 0 ? (
      <Card>
        <Card.Title
          title="You don't have any tasks yet"
        />
        <Card.Content>
          <Text>
            You can create them for course evaluations and they will appear here in prioritized order.
          </Text>
        </Card.Content>
      </Card>
    ) : null;

  const modalMarkup =
    taskBeingCompleted !== null ? (
      <Modal isVisible={modalActive} hasBackdrop={true}>
        <View
          style={{
            height: "55%",
            // marginBottom: 40,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Content style={{ marginTop: "10%" }}>
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
                onChangeText={(text) => {
                  setCurrActualDurationRef(text);
                }}
                value={currActualDuration}
              />
              <Button
                disabled={currActualDurationRef.current === ""}
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

  const nextEvalMarkup = nextEval ? (
    <View style={{ flexDirection: "column", marginTop: 100 }}>
      <Text style={{ fontSize: 45, color: "white", textAlign: "center" }}>
        Welcome Back!
      </Text>
      <Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>
        Next Evaluation: {nextEval.course_code} - {nextEval.title}
      </Text>
      <Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>
        Due: {nextEval.due_date.toLocaleString()}
      </Text>
    </View>
  ) : (
    <View style={{ flexDirection: "column", marginTop: 100 }}>
      <Text style={{ fontSize: 45, color: "white", textAlign: "center" }}>
        Welcome Back!
      </Text>
      <Text style={{ flex: 1, flexWrap: "wrap", textAlign: "center" }}>
        You haven't added any evaluations yet. When you do, the one due soonest
        will be displayed here.
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#bcf7ed", "#5273eb"]}
      style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
    >
      {nextEvalMarkup}
      <ScrollView style={{ marginTop: 50 }}>
        {modalMarkup}
        {noTasksMarkup}
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
      courseCode,
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
    ) : (
      <Text>Complete</Text>
    );

    const taskMarkup = (
      <View opacity={opacity}>
        <Card style={{ width: 350, marginBottom: 10 }}>
          <Card.Title title={formatted_title} />
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ flex: 8, color: "#7c7c7c" }}>
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
      courseCode: course.code,
    };

    formattedData.push(taskInfo);
    //checkForNoEvaluations();
  }

  return formattedData;
}

async function getEvalData() {
  const evalMapper: EvaluationMapper = new EvaluationMapperImpl();
  let evalList: Evaluation[] = [];

  const rawData: Evaluation[] = await evalMapper.all();
  evalList = rawData.sort((a, b) => {
    return a.due_date.getTime() - b.due_date.getTime();
  });

  return evalList;
}

async function updateTask(task: TaskDescriptor) {
  const taskMapper: TaskMapper = new TaskMapperImpl();

  taskMapper.update(task.task, true);
}

function findTaskById(tasks: TaskDescriptor[], id) {
  let task: TaskDescriptor;
  tasks.forEach((item) => {
    if (item.task.id === id) {
      task = item;
    }
  });

  return task;
}

export default HomeScreen;
