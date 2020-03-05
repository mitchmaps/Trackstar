import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Card,
  Divider,
  Title,
  Badge,
  Paragraph,
  Button
} from "react-native-paper";
import { iOSUIKit } from "react-native-typography";
import Evaluation from "../../models/Evaluation";
import Task from "../../models/Task";

export interface Props {
  code: string;
  name: string;
  term: string;
  minGrade: number;
}

export default function CourseView({ code, name, term, minGrade }: Props) {
  const [courseEvals, setCourseEvals] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const evalData = retrieveEvalData(code).then((data: Evaluation[]) => {
      setCourseEvals(data);
    });

    const taskData = retrieveTaskData().then((data: Task[]) => {
      setTasks(data);
    })
  }, []);

  const evaluationsMarkup = generateEvaluationMarkup(courseEvals);
  // Fix after demo
  const filteredTasks = filterTasks(1, tasks);
  const tasksMarkup = generateTaskMarkup(filteredTasks);

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
        <Text style={iOSUIKit.largeTitleEmphasized}>{code}</Text>
        <Text style={iOSUIKit.subhead}>{name}</Text>
        <View style={{paddingTop: 10}}><Text style={iOSUIKit.title3Emphasized}>Evaluations</Text></View>
        <Paragraph>{completedGradeText}</Paragraph>
        <View style={{ paddingVertical: 20 }}>{evaluationsMarkup}</View>
        <Text style={iOSUIKit.title3Emphasized}>Tasks</Text>
        {tasksMarkup}
        <Button mode="contained" onPress={() => {}}>
          Add new task
        </Button>
      </ScrollView>
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

function filterTasks(evalId, allTasks: Task[]) {
  const evalTasks: Task[] = [];

  allTasks.forEach((task) => {
    if (task.evaluation_id === evalId) {
      evalTasks.push(task);
    }
  });

  return evalTasks;
}

function generateTaskMarkup(tasks: Task[]) {
  return tasks.reduce((allTasks, currTask) => {
    const { title, due_date, est_duration } = currTask;

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
            <Card.Title title={title} subtitle={`Estimated ${est_duration} minutes`} />
            <Text>{subTitle}</Text>
            {badgeMarkup}
          </Card.Content>
        </Card>
      </View>
    );

    allTasks.push(taskMarkup);

    return allTasks;
  }, []);
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
  const evals = await Evaluation.findByCourseCode(code);

  return evals;
}

async function retrieveTaskData() {
  const tasks = await Task.all();

  return tasks;
}
