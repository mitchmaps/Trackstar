import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  Card,
  Divider,
  Title,
  Badge,
  Paragraph,
  Button,
  List,
  TextInput,
} from "react-native-paper";
import { iOSUIKit } from "react-native-typography";
import { AntDesign } from "@expo/vector-icons";
import CircleCheckBox from "react-native-circle-checkbox";
import Modal from "react-native-modal";

import { Evaluation, Task, Course } from "../../models";
import GradesCalculator from "../GradesCalculator";

import {
  EvaluationMapper,
  EvaluationMapperImpl,
  TaskMapper,
  TaskMapperImpl,
} from "../../data_mappers";
import CalendarHelper from "../../models/CalendarHelper";
import { Icon } from "react-native-elements";

import { CourseMapper, CourseMapperImpl } from "../../data_mappers";

export default function CourseView(props) {
  const { code, name, minGrade, term, complete } = props.route.params;
  const [currCourse, setCurrCourse] = useState<Course>(null);
  const [courseEvals, setCourseEvals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [evalBeingCompleted, setEvalBeingCompleted] = useState(null);
  const [evalSelected, setEvalSelected] = useState(null);
  const [evalSelectedGrade, setEvalSelectedGrade] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [tasksRemaining, setTasksRemaining] = useState<Task[]>([]);
  const [courseStatus, setCourseStatus] = useState(complete);
  const [courseCompleteActive, setCourseCompleteActive] = useState(true);
  const [fakeState, setFakeState] = useState(new Date());

  const evalBeingCompletedRef = useRef(evalBeingCompleted);
  const setEvalBeingCompletedRef = (data) => {
    evalBeingCompletedRef.current = data;
    setEvalBeingCompleted(data);
  };

  const evalSelectedRef = useRef(evalSelected);
  const setEvalSelectedRef = (data) => {
    evalSelectedRef.current = data;
    setEvalSelected(data);
  };

  const evalSelectedGradeRef = useRef(evalSelectedGrade);
  const setEvalSelectedGradeRef = (data) => {
    evalSelectedGradeRef.current = data;
    setEvalSelectedGrade(data);
  };

  const courseStatusRef = useRef(courseStatus);
  const setCourseStatusRef = (data) => {
    courseStatusRef.current = data;
    setCourseStatus(data);
  }

  useFocusEffect(
    React.useCallback(() => {
      const courseData = retrieveCoureData(code).then((data: Course) => {
        setCurrCourse(data);
      });

      const evalData = retrieveEvalData(code).then((data: Evaluation[]) => {
        setCourseEvals(data);
      });

      const taskData = retrieveTaskData().then((data: Task[]) => {
        setTasks(data);
      });

      if (evalBeingCompletedRef.current !== null) {
        determineRemainingTasks(evalBeingCompletedRef.current).then(
          (data: Task[]) => {
            setTasksRemaining(data);
          }
        );
      }
    }, [])
  );

  const handleEvalCompletion = useCallback(() => {
    const evalToUpdate: Evaluation = evalBeingCompletedRef.current;

    evalToUpdate.complete = !evalToUpdate.complete;
    evalToUpdate.grade = +evalSelectedGradeRef.current;
    updateEval(evalToUpdate);
    setEvalSelectedGradeRef(0);
    setModalActive(false);
  }, []);

  const handleEvalSelection = useCallback((currEval: Evaluation) => {
    setEvalBeingCompletedRef(currEval);

    if (currEval.complete) {
      const evalToUpdate: Evaluation = evalBeingCompletedRef.current;
      evalToUpdate.complete = false;
      updateEval(evalToUpdate);
      // need to trigger a rerender in order to immediatley reflect the DB changes
      setFakeState(new Date());
    } else {
      setModalActive(true);
    }
  }, []);

  const handleSelectEvalForGrading = useCallback((currEval: Evaluation) => {
    setEvalSelectedRef(currEval);
  }, []);

  const handleGradeChange = useCallback((grade) => {
    setEvalSelectedGradeRef(grade.nativeEvent.text);
  }, []);

  const evaluationsMarkup = generateEvaluationMarkup(
    courseEvals,
    handleEvalSelection,
    courseStatusRef.current
  );
  const filteredTasks = filterTasks(courseEvals, tasks);

  const tasksMarkup =
    filteredTasks.length > 0 ? (
      generateTaskMarkup(filteredTasks, courseEvals, props)
    ) : (
      <View>
        <Text>You haven't added any tasks yet.</Text>
      </View>
    );

  const completedEvalWeight = determineCompletedEvalWeight(courseEvals);

  const completedGradeText = `You have completed ${determineCompletedEvalWeight(
    courseEvals
  )}% of your total grade.`;

  const modalMarkup =
    evalBeingCompleted !== null ? (
      <Modal isVisible={modalActive}>
        <View
          style={{
            marginTop: "25%",
            marginBottom: "25%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Content>
            <Text
              style={iOSUIKit.largeTitleEmphasized}
            >{`Complete ${evalBeingCompleted.title}`}</Text>
            <Text>Good job!</Text>
            <View style={{ flex: 1, marginTop: 20 }}>
              {generateRemainingTasksMarkup(tasksRemaining)}
              <TextInput
                label="Enter grade (%)"
                value={evalSelectedGrade}
                onChange={(text) => {
                  handleGradeChange(text);
                }}
                keyboardType="numeric"
              />
              <Button
                mode="contained"
                color="#C6C6C6"
                style={{ marginTop: 20 }}
                labelStyle={{ color: "white" }}
                onPress={() => {
                  setModalActive(false);
                }}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                style={{ marginTop: 10 }}
                onPress={() => {
                  handleEvalCompletion();
                }}
              >
                Submit
              </Button>
            </View>
          </Card.Content>
        </View>
      </Modal>
    ) : null;

  const courseCompletionModalMarkup =
    completedEvalWeight === 100 && !complete ? (
      <Modal isVisible={courseCompleteActive}>
        <View
          style={{
            paddingTop: "25%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Content>
            <Text style={iOSUIKit.largeTitleEmphasized}>Course complete!</Text>
            <Text
              style={iOSUIKit.subheadEmphasized}
            >{`You've finished all evaluations for ${code}: ${name}`}</Text>
            <Text style={{ marginTop: 20 }}>
              You can still visit this page from the course dashboard.
            </Text>
            <Button
              mode="contained"
              style={{ marginTop: 20 }}
              labelStyle={{ color: "white" }}
              onPress={() => {
                handleCourseComplete(code);
                setCourseCompleteActive(false);
              }}
            >
              Complete course
            </Button>
          </Card.Content>
        </View>
      </Modal>
    ) : null;

  const completedGrade = calculateCourseGrade(courseEvals, minGrade);
  const differenceBetweenMinGrade = minGrade - completedGrade.curr_grade;

  let differenceText;
  if (differenceBetweenMinGrade === 0) {
    differenceText = `You are currently at your desired mininum grade for this course.`;
  } else if (differenceBetweenMinGrade < 0) {
    differenceText = `You are currently ${Math.abs(differenceBetweenMinGrade)}% above your desired minimum grade for this course.`;
  } else {
    differenceText = `You are currently ${Math.abs(differenceBetweenMinGrade)}% below your desired minimum grade for this course.`;
  }

  const currGradeMarkup = !Number.isNaN(differenceBetweenMinGrade) ? (
    <Card>
      <Card.Content style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={iOSUIKit.largeTitleEmphasized}>{completedGrade.curr_grade}%</Text>
          <Text style={{marginLeft: 10, flex: 1, flexWrap: 'wrap', color: differenceBetweenMinGrade <= 0 ? 'dodgerblue': '#ff0100'}}>{differenceText}</Text>
      </Card.Content>
    </Card>
  ) : <Text>You haven't completed any evaluations yet.</Text>

  return (
    <View style={{ flex: 1, alignSelf: "stretch", marginTop: "15%" }}>
      <ScrollView
        style={{
          height: 80,
          alignSelf: "stretch",
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={iOSUIKit.largeTitleEmphasized}>{code}</Text>
          <Text style={iOSUIKit.subheadEmphasized}>
            {courseStatusRef.current ? "Complete" : null}
          </Text>
          <Button
            onPress={() => {
              props.navigation.navigate("Course Edit", {
                code: code,
                title: name,
                minGrade: minGrade,
                evals: courseEvals,
              });
            }}
          >
            Edit
          </Button>
        </View>
        <Text style={iOSUIKit.subhead}>{name}</Text>
        <View style={{ paddingTop: 10 }}>
          <Text style={iOSUIKit.title3Emphasized}>Current grade</Text>
        </View>
        <View style={{ paddingTop: 20}}>{currGradeMarkup}</View>
        <View style={{ paddingTop: 10 }}>
          <Text style={iOSUIKit.title3Emphasized}>Evaluations</Text>
        </View>
        <Paragraph>{completedGradeText}</Paragraph>
        {courseStatusRef.current ? (
          <Text>{`Final grade: ${completedGrade.curr_grade}%`}</Text>
        ) : null}
        <View style={{ paddingVertical: 20 }}>{evaluationsMarkup}</View>
        <Text style={iOSUIKit.title3Emphasized}>Tasks</Text>
        {tasksMarkup}
        {modalMarkup}
        {courseCompletionModalMarkup}
        <View style={{margin: 30}}>
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
      </ScrollView>
    </View>
  );
}

function calculateCourseGrade(evals: Evaluation[], desiredGrade: number) {
  const formattedEvals = [];
  evals.forEach((item) => {
    formattedEvals.push([item.grade, item.weight]);
  });

  return GradesCalculator.calculate(formattedEvals, desiredGrade);
}

function handleCourseComplete(courseCode) {
  const courseMapper: CourseMapper = new CourseMapperImpl();
  courseMapper.find(courseCode).then((data) => {
    const courseToUpdate: Course = data;

    courseToUpdate.complete = true;
    courseMapper.update(courseToUpdate);
  });
}

function generateEvaluationMarkup(
  evals: Evaluation[],
  handleEvalComplete,
  courseComplete
) {
  const gradingSchemeMarkup = evals.reduce((allEvals, currEval) => {
    const { title, due_date, weight, complete, id, grade } = currEval;

    const evalMarkup = (
      <Card style={{ marginBottom: 10 }}>
        <Card.Content>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{ flex: 1, flexDirection: "column", marginRight: 100 }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                <Text style={iOSUIKit.subheadEmphasized}>{title}</Text>
                <Text style={{marginLeft: 10}}>{complete ? `Grade: ${grade}%` : null}</Text>
              </View>
              <Text style={{ color: "#aaaaaa" }}>
                {complete ? "Complete" : null}
              </Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text
                  style={{ color: "#aaaaaa" }}
                >{`Due on ${due_date.toLocaleDateString()}`}</Text>
              </View>
            </View>
            <View>
              <Badge
                visible={true}
                style={{
                  backgroundColor: "#408ff7",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                {`${currEval.weight}%`}
              </Badge>
            </View>
            <View style={{ marginLeft: 20 }}>
              {!courseComplete ? (
                <CircleCheckBox
                  style={{ flex: 2 }}
                  onToggle={() => {
                    handleEvalComplete(currEval);
                  }}
                  checked={complete ? true : false}
                  outerColor={"#408ff7"}
                  innerColor={"#408ff7"}
                />
              ) : null}
            </View>
          </View>
        </Card.Content>
      </Card>
    );


    if (currEval.title !== 'General tasks') {
      allEvals.push(<View key={currEval.id}>{evalMarkup}</View>);
    }

    return allEvals;
  }, []);

  return gradingSchemeMarkup;
}

function generateRemainingTasksMarkup(tasks: Task[]) {
  const remainingTasksMarkup: JSX.Element[] = [];
  tasks.forEach((item) => {
    const taskMarkup = <Text>{item.title}</Text>;

    remainingTasksMarkup.push(taskMarkup);
  });

  return (
    <View>
      <Text style={iOSUIKit.subheadEmphasized}>
        You still have these tasks remaining for this evaluation:
      </Text>
      {remainingTasksMarkup}
    </View>
  );
}

function filterTasks(evaluations: Evaluation[], allTasks: Task[]) {
  const courseTasks: Task[] = [];
  evaluations.forEach((evaluation) => {
    allTasks.forEach((task) => {
      if (task.evaluation_id === evaluation.id) {
        courseTasks.push(task);
      }
    });
  });

  return courseTasks;
}

function generateTaskMarkup(tasks: Task[], evals: Evaluation[], props) {
  const { code, name, minGrade } = props.route.params;

  return tasks.reduce((allTasks, currTask) => {
    const { id, title, due_date, est_duration, evaluation_id} = currTask;

    const formattedDate = new Date(due_date);
    const subTitle = `Due on ${formattedDate.toDateString()}`;
    const daysUntil = determineDaysUntilEval(formattedDate);
    const badgeText = `In ${daysUntil} days`;
    const evalTitle = evals.find((evaluation) => {return evaluation.id == evaluation_id}).title


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
      <View key={id} style={{ paddingVertical: 5 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View style={{flex: 1}}>
                <Text style={iOSUIKit.subheadEmphasized}>{title}</Text>
                <Text
                  style={{ color: "#aaaaaa" }}
                >{evalTitle}</Text>
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
                    courseMinGrade: minGrade,
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
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
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

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function calendarAlert(task: Task) {
  const eventDate = new Date(task.due_date.getTime() - task.est_duration * 60000);
  Alert.alert(
    "Add to calendar?",
    `This will add '${task.title}' to your phone's calendar app on ${months[eventDate.getMonth()]} ${eventDate.getDate()} at ${eventDate.getHours()}:${eventDate.getMinutes()}`,
    [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => CalendarHelper.addEvent(task) },
    ]
  );
}

function notificationAlert(task: Task) {
  const eventDate = new Date(task.due_date.getTime() - task.est_duration * 60000);
  Alert.alert(
    'Set a reminder?',
    `This will add '${task.title}' to your phone's reminders app on ${months[eventDate.getMonth()]} ${eventDate.getDate()} at ${eventDate.getHours()}:${eventDate.getMinutes()}`,
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => CalendarHelper.addReminder(task)},
    ],
  )
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

  evals.forEach((currEval) => {
    if (currEval.complete) {
      totalGradeCompleted += currEval.weight;
    }
  });

  return totalGradeCompleted;
}

async function retrieveCoureData(code: string) {
  const courseMapper: CourseMapper = new CourseMapperImpl();
  let course: Course = await courseMapper.find(code);

  return course;
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

async function updateEval(updatedEval: Evaluation) {
  const evalMapper: EvaluationMapper = new EvaluationMapperImpl();

  evalMapper.update(updatedEval);
}

async function determineRemainingTasks(evalToComplete: Evaluation) {
  const taskMapper: TaskMapper = new TaskMapperImpl();
  const tasks = await taskMapper.findByEval(evalToComplete.id);
  return tasks;
}
