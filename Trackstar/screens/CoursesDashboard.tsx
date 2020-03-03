import {useEffect, useState} from 'react';
import React from 'react';

import {SectionList, StyleSheet, ScrollView, Alert, Text, View , TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Switch, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';
import {mockData_CourseDashboard} from "../mockData_CourseDashboard"
import Styles from "../Styles/CoursesDashboardStyles";
// import { iOSUIKit } from 'react-native-typography';



const CoursesDashboard = props => {
  const [oldCourses, setOldCourses] = useState (true); // hook state for toggle
  const navigation = props.navigation;

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

  return(
    <LinearGradient
    colors={['#bcf7ed', '#5273eb']}
    style={{ flex: 1, flexDirection: 'column',
    width: "100%",
    justifyContent: "center",
    alignItems: "center",}}>

      <View style={Styles.dashboardRowOne}>
        <Text style={Styles.dashboardText}>Dashboard</Text>
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

  export default CoursesDashboard;
