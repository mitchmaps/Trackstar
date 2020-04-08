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
  term: string;
  complete: boolean;
}

const CoursesDashboard = props => {
  const [showComplete, setShowComplete] = useState(false); // hook state for toggle
  const [formattedCourseData, setFormattedCourseData] = useState([]);
  const navigation = props.navigation;
  const [checkForCourses, setCheckForCourses] = useState(); //for checking if there's no course

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
      <Text style={{ fontSize: 45, color: "white", textAlign: "center", marginTop: "20%" }}>
          My Courses
      </Text>
    <View style={{
      flexDirection: "column",
      width: "100%",
      alignItems: "flex-end",
      paddingTop: 10,
      paddingRight: 10
    }}>

      <Text style={{color: "white"}}>Show Completed</Text>
      <Switch
        value={showComplete}
        color="#5273eb"
        onValueChange={() => {


          setShowComplete(!showComplete);
          const formattedCourses = formatData(!showComplete).then(data => {
            setFormattedCourseData(data);

			 // showComplete == false
		  if( CoursesDashboard.formattedCourseData == []||formattedCourses == null){
            Alert.alert(
            "You currently have no courses",
             "Please use the ADD COURSE button to create courses, and they'll appear here.",
         [{text: 'Back'}])}
            
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
        maxHeight: "75%"
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
            style={{backgroundColor: "#bcf7ed"}}
          >
            <Text style={{color: "#5273eb"}}>Add Course</Text>
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
              minGrade: currCourse.minGrade,
              term: '',
              complete: currCourse.complete,
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
  let listCourses = []; //made array to list courses we have

  rawData.forEach(course => {
    const courseInfo: CourseDescriptor = {
      code: course.code,
      title:  course.title,
      minGrade: course.min_grade,
      term: '',
      complete: course.complete,
    };
    formattedData.push(courseInfo);
    listCourses.push(course.title); //using title but could be anything from course
  });

  return formattedData;
}

export default CoursesDashboard;
