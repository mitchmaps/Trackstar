import { useEffect, useState, useCallback } from "react";
import React from "react";
import { useFocusEffect } from '@react-navigation/native';

import {
  SectionList,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Switch,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph
} from "react-native-paper";
import { red100 } from "react-native-paper/lib/typescript/src/styles/colors";
import { mockData_CourseDashboard } from "../mockData_CourseDashboard";
import Styles from "../Styles/CoursesDashboardStyles";
import { iOSUIKit } from "react-native-typography";

import {Course} from "../models";
import { CourseMapper, CourseMapperImpl } from "../data_mappers";

interface CourseDescriptor {
  code: string;
  title: string;
  minGrade: number;
}

const CoursesDashboard = props => {
  const [showComplete, setShowComplete] = useState(false); // hook state for toggle
  const [formattedCourseData, setFormattedCourseData] = useState([]);
  const navigation = props.navigation;

  useFocusEffect(
    React.useCallback(() => {
      const formattedCourses = formatData(showComplete).then(data => {
        setFormattedCourseData(data);
      });
    }, [])
  );

  const coursesMarkup = generateCoursesMarkup(formattedCourseData, navigation)

  return (
    <LinearGradient
      colors={["#bcf7ed", "#5273eb"]}
      style={{
        flex: 1,
      }}
    >
    <View style={{
      flexDirection: "column",
      width: "100%",
      alignItems: "flex-end",
      paddingTop: 10,
      paddingRight: 10
    }}>
      <Text>Show Completed</Text>
      <Switch
        value={showComplete}
        onValueChange={() => {
          setShowComplete(!showComplete);
          const formattedCourses = formatData(!showComplete).then(data => {
            setFormattedCourseData(data);
          });
        }}
      />
    </View>

    <View style={{
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 10,
        maxHeight: "85%"
    }}>
      <ScrollView style={{}}>
        {coursesMarkup}
      </ScrollView>

        <View style={{paddingTop: 20}}>
          <Button
            onPress={() => {
              props.navigation.navigate("Add");
            }}
            mode="contained"
          >
            Add Course
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

function generateCoursesMarkup(courses: CourseDescriptor[], navigation) {
  const allCourses = [];

  courses.forEach((currCourse: CourseDescriptor) => {
    const courseMarkup = (
      <View>
        <Card
          style={{ width: 350, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("Course", {
              code: currCourse.code,
              name: currCourse.title,
              minGrade: currCourse.minGrade
            });
          }}
        >
          <Card.Title title={currCourse.code} />
          <Card.Content style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ flex: 8, color: "#7c7c7c"}}>
              {currCourse.title}
            </Text>
          </Card.Content>
        </Card>
      </View>
    );

    allCourses.push(<View key={currCourse.code}>{courseMarkup}</View>);
  });

  return allCourses;
}

async function formatData(complete: boolean) {
  const formattedData = [];

  const courseMapper: CourseMapper = new CourseMapperImpl();
  const rawData: Course[] = await courseMapper.all(complete);

  rawData.forEach(course => {
    const courseInfo: CourseDescriptor = {
      code: course.code,
      title:  course.title,
      minGrade: course.min_grade
    };
    formattedData.push(courseInfo);
  });

  return formattedData;
}

export default CoursesDashboard;
