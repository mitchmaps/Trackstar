import React from "react";
import {Evaluation, Task} from '../../models';
import {TaskMapper, TaskMapperImpl} from '../../data_mappers';
import DatePicker from 'react-native-datepicker'

import { Platform, View, Text, ScrollView, Picker } from "react-native";
import { Divider, Card, TextInput, Button, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { iOSUIKit } from "react-native-typography";
import User from "../../models/User";

export default class TaskCreate extends React.Component {
  state: {
    title: string;
    selectedEval: number;
    dueDate: Date;
    duration: string;
  };

  constructor(props) {
    super(props);
    this.generateEvalSelectionMarkup = this.generateEvalSelectionMarkup.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: "",
      selectedEval: this.props.route.params.evals[0].id,
      dueDate: new Date(),
      duration: "",
    };
  }

  render() {
    const { title, selectedEval, dueDate, duration} = this.state;
    const { evals, courseCode, courseName, courseTerm, courseMinGrade } = this.props.route.params;

    const evalSelectionMarkup = this.generateEvalSelectionMarkup(this.props.route.params.evals);

    // add error checking for ensuring the due date for the task can't be after the due date for the eval
    const taskDetailsMarkup = (
      <Card>
        <Card.Content>
          <Text>Select the evaluation this task is for:</Text>
          <Text style={{color: '#7c7c7c', marginTop: 5}}>{ `Select 'General tasks' to create tasks that aren't linked to any specific evaluation but are still relevant to ${courseCode}`}</Text>
          <Picker selectedValue={this.state.selectedEval} onValueChange={(itemValue, itemIndex) => {this.setState({selectedEval: itemValue})}}>
            {evalSelectionMarkup}
          </Picker>
          <TextInput
            label="Task title"
            value={this.state.title}
            onChangeText={text => {
              this.setState({ title: text });
              
            }}
          />
          <Text style={{paddingTop: 20}}>Task due date</Text>
          
          
          { Platform.OS === 'ios' ? 
          <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={dueDate}
          onChange={
            (event, selectedDate) => {
              this.setState({dueDate: selectedDate});
            }
          }
          display="default"/> : 
          <DatePicker
          date={dueDate}      
          mode="datetime"
          placeholder="select date"
          format="YYYY-MM-DD"
          onDateChange={
            (event, selectedDate) => {
              this.setState({dueDate: selectedDate});
            }
          }
          androidMode='spinner'
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          style={{paddingTop: 10, paddingBottom:20, width:300}}
          />
        }
            

        
       <Text> {User.getInstance().estimationAccuracy >= 100 ? `Heads up: you typically overestimate by about ${(User.getInstance().estimationAccuracy-100).toFixed(2)}%` 
       : `Heads up: you typically underestimate by about ${Math.abs(User.getInstance().estimationAccuracy).toFixed(2)}%` }}
       </Text>
       <TextInput
            label="Estimated time needed in minutes"
            keyboardType="numeric"
            onChangeText={(text) => {this.setState({duration: text})}}
            value={duration}
          />
        </Card.Content>
      </Card>
    );

    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <ScrollView
          style={{
            height: 80,
            alignSelf: "stretch",
            padding: 20
          }}
        >
          <Text style={iOSUIKit.largeTitleEmphasized}>Create new task</Text>
          {taskDetailsMarkup}
          <Button mode="contained" onPress={this.handleSubmit}>Submit</Button>
        </ScrollView>
      </View>
    );
  }

  handleSubmit() {
    const { title, selectedEval, dueDate, duration } = this.state;
    const { evals, courseCode, courseName, courseTerm, courseMinGrade } = this.props.route.params.evals;

    const taskMapper: TaskMapper = new TaskMapperImpl();
    const newTask = new Task(title, dueDate, +duration, 0, selectedEval);
    taskMapper.insert(newTask);

    this.props.navigation.navigate("Course view", {
      code: courseCode,
      name: courseName,
      term: courseTerm,
      minGrade: courseMinGrade,
    });
  }

  

  generateEvalSelectionMarkup(evals: Evaluation[]) {
    const evalSelectionMarkup = [];
    evals.forEach((currEval) => {
      const {id, course_code, due_date, title, weight} = currEval;
      const evalMarkup = (
        <Picker.Item label={title} value={id} />
      );

      evalSelectionMarkup.push(evalMarkup);
    });

    return evalSelectionMarkup;
  }
}
