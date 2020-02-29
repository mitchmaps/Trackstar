import React from 'react';
import Styles from '../Styles/DashboardStyles';
import { Text, View, Image, TouchableOpacity, SectionList, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';

import {mockData} from "../mockData"

// import { iOSUIKit } from 'react-native-typography';
// const sectionHeader = (data) => {
//   const section = data.section
//   return (
//     <View style={styles.sectionHeader}>
//       <Text style={styles.sectionHeaderText}>{section.time}</Text>
//     </View>
//   );
// };

const HomeScreen = (props) => {
  const navigation = props.navigation;

  const singleItem = (data) => {
    const item = data.item
    return (
      // <TouchableOpacity onPress={() => {navigation.navigate("Details", {talkData: item})}}>
      //   <View style={styles.singleItem}>
      //     <Text>{item.title}</Text>
      //   </View>
      // </TouchableOpacity>
      // <View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>

      // TO DO: align checkbox properly
      <Card style={{width: 350, marginBottom: 10}}>
          <Card.Title title={item.title}/>
          <Card.Content style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{flex: 8}}>{item.course}</Text>
            <CircleCheckBox
              style={{flex: 2}}
              checked={item.title == "1. Read Chapter 3" ? true : false}
              outerColor = {'#5273eb'}
              innerColor = {'#5273eb'}
              onToggle={(checked) => console.log('My state is: ', checked)}
            />
          </Card.Content>
      </Card>
    );
  };

  return(
    <LinearGradient
      colors={['#bcf7ed', '#5273eb']}
      style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}
    >
      <View style={{flexDirection: 'column', marginTop: 100}}>
        <Text style={{fontSize: 45, color: "white", textAlign: "center"}}>Welcome Back!</Text>
        <Text style={{fontSize: 15, color: "white", textAlign: "center"}}>Next Evaluation: COMP 3008 Project 2</Text>
        <Text style={{fontSize: 15, color: "white", textAlign: "center"}}>Due March 28th</Text>
      </View>
      {/* TO DO: figure out how to raise this section */}
      <SectionList
        style={{marginTop: 50}}
        sections={mockData}
        renderItem={singleItem}
      />
    </LinearGradient>

  //   <ScrollView style = {Styles.content }>

  //   <View style={Styles.dashboardRowOne}>
  //     <Text style={Styles.dashboardText}>
  //         Dashboard
  //     </Text>
  //     <LegendComponent />
  //   </View>

  //   <CourseComponent
  //     title= "Task Title"
  //     Duration="Estimated Duration"
  //     DueDate="Due Date"
  //     color = '#FFFFFF'
  //     />

  //   <CourseComponent
  //     title= "Read 3004 Ch. 6"
  //     Duration="Duration : 2 hours"
  //     DueDate= "Due Date: 2020/03/01"
  //     color = '#FF99CC'
  //   />
  //   <CourseComponent
  //     title= "Work on 3008 D4"
  //     Duration="Duration : 2 hours"
  //     DueDate="Due Date: 2020/03/11"
  //     color = '#FF9933'
  //   />
  //   <CourseComponent
  //     title= "Finish 2804 A2"
  //     Duration="Duration : 1 hours"
  //     DueDate="Due Date: 2020/03/11"
  //     color = '#99FF33'
  //   />
  //   <CourseComponent
  //     title= "Study 2804 Final"
  //     Duration="Duration : 6 hours"
  //     DueDate="Due Date: 2020/04/11"
  //     color = '#99FF33'
  //   />
  //   <CourseComponent
  //     title= "Study 3008 Final"
  //     Duration="Duration : 5 hours"
  //     DueDate="Due Date: 2020/04/21"
  //     color = '#FF9933'
  //   />
  //   <CourseComponent
  //     title= "Study 3004 Final"
  //     Duration="Duration : 2 hours"
  //     DueDate= "Due Date: 2020/04/23"
  //     color = '#FF99CC'
  //   />
  // </ScrollView>
  );
};

  const CourseComponent = (props) => (
    <Card onPress  ={ () =>
      {
        return Alert.alert('Task Title', '\nEstimated Duration' +
          '\nDue Date' +
          '\nCourse Code' +
          '\nWeighting' +
          '\nPriority Score', [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ], { cancelable: false });
      }
    }
    style = {[{backgroundColor: props.color}, Styles.container]}>

      <Card.Content>
        <View>
          <Title>{props.title}</Title>
          <Paragraph style={Styles.paragraphText}>{props.Duration}</Paragraph>
          <Paragraph style={Styles.paragraphText}>
            {props.DueDate}
          </Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button style={{marginVertical: -10}} onPress={() => Alert.alert(

        'Edit Page',
        'Options for Editing',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ],
        { cancelable: false }
      )}>Edit</Button>
      </Card.Actions>
    </Card>
  );


    const LegendComponent = () => (
      <Card style={{elevation:0, shadowOpacity:0, marginLeft:45, borderRadius: 50, marginTop:30}}>
        <Card.Content>
          <View style = {{flex: -1, flexDirection: "row"}}>
            <Avatar.Icon size={18} icon="circle" color='#FF99CC' />
            <Text>  COMP 3004</Text>
          </View>
          <View style = {{flex: -2, flexDirection: "row"}}>
            <Avatar.Icon size={18} icon="circle" color='#FF9933' />
            <Text>  COMP 3008</Text>
          </View>
          <View style = {{flex: 0, flexDirection: "row"}}>
            <Avatar.Icon size={18} icon="circle" color='#99FF33' />
            <Text>  COMP 2804</Text>
          </View>
        </Card.Content>
      </Card>
    );

  const styles = StyleSheet.create({
    sectionHeader: {
      padding: 14,
      backgroundColor: "pink"
    },
    sectionHeaderText: {
      color: "white"
    },
    singleItem: {
      paddingVertical: 18,
      paddingHorizontal: 14
    }
  });

export default HomeScreen;