import {useEffect, useState, useCallback} from 'react';
import React from 'react';

import {SectionList, StyleSheet, ScrollView, Alert, Text, View , TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Switch, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';
import {mockData_CourseDashboard} from "../mockData_CourseDashboard"
import Styles from "../Styles/CoursesDashboardStyles";
// import { iOSUIKit } from 'react-native-typography';

import Course from '../models/Course';



const CoursesDashboard = props => {
  const [oldCourses, setOldCourses] = useState (true); // hook state for toggle
  const [formattedCourseData, setFormattedCourseData] = useState([]);
  const navigation = props.navigation;

  // const getCourseData = useCallback(() => {
  //   const formattedData = [];
  //   ////////
  //   const rawData = Course.all().then((data: Course[]) => {
  //     data.forEach(course => {
  //       const courseInfo = {
  //         title: course.title,
  //         data:
  //         [{
  //             code: course.code,
  //             title: course.title,
  //         }]
  //       }
  //       formattedData.push(courseInfo);
  //     })
  //     resolve(formattedData)
  //     // setFormattedCourses(formattedData);
  //   }
  //   )
  // }, []);


  const SingleItem = data => {

  const item = data.item
    if(item.color === "#999999" && oldCourses === false){ // only render on toggle if course is not pre-req
      return null;
    }
    else{
      return(
        <Card style = {[{backgroundColor: item.color}, Styles.container]}
        onPress  ={() =>{
        navigation.navigate("Course") }}>
            <Card.Content style={{flex: 1, flexDirection: 'row'}}>
            <View style={{backgroundColor: item.color}}>
                <Title style={Styles.titleText}>{item.courseCode}</Title>
                <Paragraph style={Styles.paragraphText}>{item.courseName}</Paragraph>
                <Paragraph style={Styles.paragraphText}>{item.term}</Paragraph>
            </View>
            </Card.Content>
        </Card>
      );

    };
  }

  let realData = [];

  const formattedCourses = formatData().then((data) => {
    console.log('promise start');
    console.log(data);
    setFormattedCourseData(data);
    console.log('promise end');
  });

  console.log('formatted');
  console.log(realData);

  return(
    <LinearGradient
    colors={['#bcf7ed', '#5273eb']}
    style={{ flex: 1, flexDirection: 'column',
    width: "100%",
    justifyContent: "center",
    alignItems: "center",}}>

      <View style={Styles.dashboardRowOne}>
        <Text style={Styles.dashboardText}>Dashboard</Text>
        <Text style={Styles.dashboardText}>
          {formattedCourseData[0].title}
        </Text>
        <Text style={Styles.switchText}>              Pre-Reqs </Text>
        <Switch
          value={oldCourses}
          onValueChange={() =>
            { setOldCourses(!oldCourses) }
          }/>
      </View>


      <SectionList
        style={{marginBottom: 10}}
        sections={mockData_CourseDashboard}
        renderItem={SingleItem}
      />

      <View style={Styles.buttonContentStyle}>
        <TouchableOpacity onPress={() => {
          props.navigation.navigate("Add")}}>
          <View style={Styles.buttonContentStyle}>
            <Button  icon="plus-circle" mode="contained" contentStyle={{marginLeft:10}} >
              add course
            </Button>
          </View>
        </TouchableOpacity>
      </View>

    </LinearGradient>

    );

};

async function formatData() {
  const formattedData = [];

  let rawData: Course[] = await Course.all();
  console.log('raw');
  console.log(rawData);

    rawData.forEach(course => {
      const courseInfo = {
        title: course.title,
        data:
        [{
            code: course.code,
            title: course.title,
        }]
      }
      formattedData.push(courseInfo);
    })

    return formattedData;
  }

  function doStuffWithData(courses: Course[]) {

  }

  // console.log('in new function');
  // console.log(formattedData[0]);
  //return formattedData;

  export default CoursesDashboard;
