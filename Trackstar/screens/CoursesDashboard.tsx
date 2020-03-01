import {useEffect, useState} from 'react';
import React from 'react';

import {StyleSheet, ScrollView, Alert, Text, View , TouchableOpacity} from 'react-native';

import { Switch, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';
// import { iOSUIKit } from 'react-native-typography';



const CoursesDashboard = props => {
const [oldCourses, setOldCourses] = useState (true); // hook state for toggle

const CourseComponent = props2 => {
    const navigation = props.navigation;
    if(props2.color === "#999999" && oldCourses === false){ // only render on toggle if course is not pre-req
      return null;
    }
    else{
      return(
        <Card style = {[{backgroundColor: props2.color}, Styles.container]}
        onPress  ={() =>{ 
        navigation.navigate("Course")
  }}>
            <Card.Content >
            <View style={props2.color}>
                <Title style={Styles.titleText}>{props2.courseCode}</Title>
                <Paragraph style={Styles.paragraphText}>{props2.title}</Paragraph>
                <Paragraph style={Styles.paragraphText}>{props2.term}</Paragraph>
            </View>
            </Card.Content>
        </Card>
      );
    }
};

return(
  <ScrollView style = {Styles.content }>

  <View style={Styles.dashboardRowOne}>
    <Text style={Styles.dashboardText}>Dashboard</Text>
    <Text style={Styles.switchText}>              Pre-Reqs </Text>
    <Switch
      value={oldCourses}
      onValueChange={() =>
        { setOldCourses(!oldCourses) }
      }
    />
  </View>

  <CourseComponent
    courseCode= "COMP 3005"
    title="Database Management Systems"
    term="Winter 2020"
    color = '#99FF33'
    />

  <CourseComponent
    courseCode= "COMP 3004"
    title="Object-Oriented Software Engin"
    term= "Winter 2020"
    color = '#FF99CC'
  />
  <CourseComponent
    courseCode= "COMP 3008"
    title="Human-Computer Interaction"
    term="Winter 2020"
    color = '#FF9933'
  />
  <CourseComponent
    courseCode= "COMP 3804"
    title="Design and Analysis of Algorithms"
    term="Winter 2019"
    color = '#999999'
  />
    <CourseComponent
    courseCode= "COMP 3000"
    title="Operating Systems"
    term="Winter 2019"
    color = '#999999'
  />
    <CourseComponent
    courseCode= "CLCV 1003"
    title="Survey of Roman Civilization"
    term="Winter 2019"
    color = '#999999'
  />
    <CourseComponent
    courseCode= "COMP 2507"
    title="Introduction to Stats Modeling"
    term="Winter 2019"
    color = '#999999'
  />
  
  <View style={Styles.buttonContentStyle}>
  <TouchableOpacity onPress={() => {
    props.navigation.navigate("Add")
  }}>
    <View style={Styles.buttonContentStyle}>
      <Button  icon="plus-circle" mode="contained" contentStyle={{marginLeft:10}} >
        add course
      </Button>
    </View>
  </TouchableOpacity>

  </View>
  </ScrollView>

  );

};

  export default CoursesDashboard;

    const Styles = StyleSheet.create({

      buttonContentStyle: {
        
        display: "flex",
        width: "100%",        
        justifyContent: "center",
        alignItems: "center",
        marginRight: 20
      },
        content: {
          flex: 1, 
          marginLeft: 20
        },
        container: {
          shadowColor: 'rgba(0,0,0,1)',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 1, //default is 1
          shadowRadius: 1, //default is 1
          width: 320,
          marginTop: 10,
          marginBottom: 10
        },
        headingText: {
          fontSize: 30
        },
        titleText: {
          fontSize: 24,
          display: 'flex',
          alignContent: 'flex-start'
        },
        paragraphText: {
          fontSize: 18
        },
        dashboardText: {
          fontSize: 30,
          fontWeight: "900",
          marginLeft: 15,
          marginTop: 10,
          marginBottom: -10,
          textAlignVertical: "center",
        },
        dashboardRowOne:{
          flexDirection: "row",
          height:100
        },
        switchText: {
          textAlignVertical: "center",
        },

      });