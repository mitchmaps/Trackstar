import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import {
  Card,
  Divider,
  Title,
  Badge,
  Paragraph,
  Button
} from "react-native-paper";
import { iOSUIKit } from "react-native-typography";
import { AntDesign } from '@expo/vector-icons';

import Evaluation from "../../models/Evaluation";
import Task from "../../models/Task";

import {
  EvaluationMapper,
  EvaluationMapperImpl,
  TaskMapper,
  TaskMapperImpl
} from "../../data_mappers";
import CalendarHelper from "../../models/CalendarHelper";

export default function CourseView(props) {
  const { code, name, minGrade, term } = props.route.params;
  const [courseEvals, setCourseEvals] = useState([]);
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const evalData = retrieveEvalData(code).then((data: Evaluation[]) => {
        setCourseEvals(data);
      });

      const taskData = retrieveTaskData().then((data: Task[]) => {
        console.log(data);
        setTasks(data);
      });
    }, [])
  );

  const evaluationsMarkup = generateEvaluationMarkup(courseEvals);
  // Fix after demo
  const filteredTasks = filterTasks(courseEvals, tasks);
  const tasksMarkup = generateTaskMarkup(filteredTasks, props);

  const completedGradeText = `You have completed ${determineCompletedEvalWeight(
    courseEvals
  )}% of your total grade.`;

  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      <ScrollView
        style={{
          height: 80,
          alignSelf: "stretch",
          padding: 20
        }}
      >
        <View style={{ flexDirection: 'row'}}>
          <Text style={iOSUIKit.largeTitleEmphasized}>{code}</Text>
          <Button onPress={
            () => {
              props.navigation.navigate("Course Edit", {
                code: code,
                title: name,
                minGrade: minGrade,
                evals: courseEvals,
              });
            }
          }>Edit</Button>
        </View>
        <Text style={iOSUIKit.subhead}>{name}</Text>
        <View style={{ paddingTop: 10 }}>
          <Text style={iOSUIKit.title3Emphasized}>Evaluations</Text>
        </View>
        <Paragraph>{completedGradeText}</Paragraph>
        <View style={{ paddingVertical: 20 }}>{evaluationsMarkup}</View>
        <Text style={iOSUIKit.title3Emphasized}>Tasks</Text>
        {tasksMarkup}
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => {
          props.navigation.navigate("Task Create", {
            evals: courseEvals,
            courseCode: code,
            courseName: name,
            courseTerm: term,
            courseMinGrade: minGrade,
          });
        }}
      >
        Add new task
      </Button>
    </View>
  );
}

function generateEvaluationMarkup(evals: Evaluation[]) {
  const gradingSchemeMarkup = evals.reduce((allEvals, currEval) => {
    const evalMarkup = (
      <Card.Content>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Paragraph>{currEval.title}</Paragraph>
          <Badge
            visible={true}
            style={{
              backgroundColor: "#408ff7",
              fontWeight: "bold",
              color: "#ffffff"
            }}
          >
            {`${currEval.weight}%`}
          </Badge>
        </View>
        <Divider />
      </Card.Content>
    );

    allEvals.push(evalMarkup);
    return allEvals;
  }, []);

  return <Card>{gradingSchemeMarkup}</Card>;
}

function filterTasks(evaluations: Evaluation[], allTasks: Task[]) {
  const courseTasks: Task[] = [];
  evaluations.forEach((evaluation) => {
    allTasks.forEach((task) => {
      if (task.evaluation_id === evaluation.id) {
        courseTasks.push(task);
      }
    })
  });

  return courseTasks;
}

function generateTaskMarkup(tasks: Task[], props) {
  const { code, name, minGrade } = props.route.params;

  return tasks.reduce((allTasks, currTask) => {
    const { id, title, due_date, est_duration } = currTask;


    const formattedDate = new Date(due_date);
    const subTitle = `Due on ${formattedDate.toDateString()}`;
    const daysUntil = determineDaysUntilEval(formattedDate);
    const badgeText = `In ${daysUntil} days`;

    const badgeColor =
      daysUntil > 10
        ? "#408ff7"
        : daysUntil <= 10 && daysUntil > 5
        ? "#f48618"
        : "#fc2525";

    const badgeMarkup = (
      <Badge
        visible={true}
        style={{ backgroundColor: badgeColor, color: "#ffffff" }}
      >
        {badgeText}
      </Badge>
    );

    const taskMarkup = (
      <View key={title} style={{ paddingVertical: 5 }}>
        <Card>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={iOSUIKit.bodyEmphasized}>{title}</Text>
              <Button onPress={
                () => {
                  props.navigation.navigate("Task Edit", {
                    title: title,
                    dueDate: due_date,
                    duration: est_duration,
                    id: id,
                    courseCode: code,
                    courseName: name,
                    courseMinGrade: minGrade,
                  });
                }
              }>Edit</Button>
            </View>
            {badgeMarkup}
            <Button onPress={() => {calendarAlert(currTask)}}>Add to Calendar</Button>
          </Card.Content>
        </Card>
      </View>
    );

    allTasks.push(taskMarkup);

    return allTasks;
  }, []);
}

function calendarAlert(task: Task) {
  if (Platform.OS === 'ios') {
    Alert.alert(
      'Add to calendar?',
      `This will add '${task.title}' to your phone's calendar app`,
      [
        {text: 'OK + reminder', onPress: () => CalendarHelper.addEvent(task, true)},
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => CalendarHelper.addEvent(task)},
      ],
    )
  }
  else {
    Alert.alert(
      'Add to calendar?',
      `This will add '${task.title}' to your phone's calendar app`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => CalendarHelper.addEvent(task)},
      ],
    )
  }
}

function determineDaysUntilEval(evalDate: Date) {
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const currDate = new Date();

  return (
    (Date.UTC(evalDate.getFullYear(), evalDate.getMonth(), evalDate.getDate()) -
      Date.UTC(
        currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate()
      )) /
    oneDayInMs
  );
}

function determineCompletedEvalWeight(evals: Evaluation[]) {
  let totalGradeCompleted = 0;

  evals.forEach(currEval => {
    if (currEval.complete) {
      totalGradeCompleted += currEval.weight;
    }
  });

  return totalGradeCompleted;
}

async function retrieveEvalData(code: string) {
  const evalMapper: EvaluationMapper = new EvaluationMapperImpl();
  let evals: Evaluation[] = await evalMapper.findByCourse(code);

  return evals;
}

async function retrieveTaskData() {
  const taskMapper: TaskMapper = new TaskMapperImpl();
  let tasks: Task[] = await taskMapper.all();

  return tasks;
}
