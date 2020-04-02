import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  Card,
  Divider,
  Title,
  Badge,
  Paragraph,
  Button
} from "react-native-paper";
import { iOSUIKit } from "react-native-typography";
import { AntDesign } from "@expo/vector-icons";

import Evaluation from "../../models/Evaluation";
import Task from "../../models/Task";

import {
  EvaluationMapper,
  EvaluationMapperImpl,
  TaskMapper,
  TaskMapperImpl
} from "../../data_mappers";
import CalendarHelper from "../../models/CalendarHelper";
import { Icon } from "react-native-elements";

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
  const filteredTasks = filterTasks(courseEvals, tasks);

  const tasksMarkup =
    filteredTasks.length > 0 ? (
      generateTaskMarkup(filteredTasks, props)
    ) : (
      <View>
        <Text>You haven't added any tasks yet.</Text>
      </View>
    );

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
        <View style={{ flexDirection: "row" }}>
          <Text style={iOSUIKit.largeTitleEmphasized}>{code}</Text>
          <Button
            onPress={() => {
              props.navigation.navigate("Course Edit", {
                code: code,
                title: name,
                minGrade: minGrade,
                evals: courseEvals
              });
            }}
          >
            Edit
          </Button>
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
            courseMinGrade: minGrade
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
    const { title, due_date, weight, complete } = currEval;

    const evalMarkup = (
      <Card style={{ marginBottom: 10 }}>
        <Card.Content>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text style={iOSUIKit.subheadEmphasized}>{title}</Text>
              <Text
                style={{ color: "#aaaaaa" }}
              >{`Due on ${due_date.toLocaleDateString()}`}</Text>
            </View>
            <View>
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
          </View>
        </Card.Content>
      </Card>
    );

    if (currEval.title !== "General tasks") {
      allEvals.push(<View key={currEval.id}>{evalMarkup}</View>);
    }

    return allEvals;
  }, []);

  return gradingSchemeMarkup;
}

function filterTasks(evaluations: Evaluation[], allTasks: Task[]) {
  const courseTasks: Task[] = [];
  evaluations.forEach(evaluation => {
    allTasks.forEach(task => {
      if (task.evaluation_id === evaluation.id) {
        courseTasks.push(task);
      }
    });
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

    const notificationMarkup =
      Platform.OS === "ios" ? (
        <TouchableOpacity>
          <Icon
            name="bell-plus-outline"
            type="material-community"
            color="#517fa4"
            onPress={() => {
              notificationAlert(currTask);
            }}
          />
        </TouchableOpacity>
      ) : null;

    const calendarMarkup = (
      <TouchableOpacity style={{ paddingRight: 10 }}>
        <Icon
          name="calendar-plus"
          type="material-community"
          color="#517fa4"
          onPress={() => {
            calendarAlert(currTask);
          }}
        />
      </TouchableOpacity>
    );

    const taskMarkup = (
      <View key={title} style={{ paddingVertical: 5 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <View>
                <Text style={iOSUIKit.subheadEmphasized}>{title}</Text>
                <Text
                  style={{ color: "#aaaaaa" }}
                >{`Estimated to take ${est_duration} minutes`}</Text>
              </View>
              <Button
                onPress={() => {
                  props.navigation.navigate("Task Edit", {
                    title: title,
                    dueDate: due_date,
                    duration: est_duration,
                    id: id,
                    courseCode: code,
                    courseName: name,
                    courseMinGrade: minGrade
                  });
                }}
              >
                Edit
              </Button>
            </View>
            <View
              style={{
                paddingTop: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                {calendarMarkup}
                {notificationMarkup}
              </View>
              {badgeMarkup}
            </View>
          </Card.Content>
        </Card>
      </View>
    );

    allTasks.push(taskMarkup);

    return allTasks;
  }, []);
}

function calendarAlert(task: Task) {
  Alert.alert(
    "Add to calendar?",
    `This will add '${task.title}' to your phone's calendar app`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => CalendarHelper.addEvent(task) }
    ]
  );
}

function notificationAlert(task: Task) {
  Alert.alert(
    "Set a reminder?",
    `This will add '${task.title}' to your phone's reminders app`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => CalendarHelper.addEvent(task, true) }
    ]
  );
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
