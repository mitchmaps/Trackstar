import React from "react";
import Evaluation from "../../models/Evaluation";
import Task from "../../models/Task";

import { View, Text, ScrollView, Picker } from "react-native";
import { Divider, Card, TextInput, Button, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { iOSUIKit } from "react-native-typography";

export default class TaskCreate extends React.Component {
  state: {
    title: string;
    selectedEval: Evaluation;
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
      selectedEval: null as Evaluation,
      dueDate: new Date(),
      duration: "",
    };
  }

  render() {
    const { title, selectedEval, dueDate, duration } = this.state;
    const { evals } = this.props.route.params.evals;

    console.log('in here');
    console.log(this.props.route.params.evals);

    const evalSelectionMarkup = this.generateEvalSelectionMarkup(this.props.route.params.evals);

    // add error checking for ensuring the due date for the task can't be after the due date for the eval
    const taskDetailsMarkup = (
      <Card>
        <Card.Content>
          <Text>Select the evaluation this task is for:</Text>
          <Picker selectedValue={selectedEval} onValueChange={(value) => {this.setState({selectedEval: value})}}>
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
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={dueDate}
            onChange={
              (event, selectedDate) => {
                this.setState({dueDate: selectedDate});
              }
            }
            display="default"
          />
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
    // replace fake eval id with real one once that's changed
    const newTask = new Task(title, dueDate.toString(), +duration, 10);
    console.log(newTask);
    newTask.save();
  }

  generateEvalSelectionMarkup(evals: Evaluation[]) {
    const evalSelectionMarkup = [];
    evals.reduce((currEval: Evaluation, allEvals) => {
      const {course_code, due_date, title, weight} = currEval;
      const evalMarkup = (
        <Picker.Item label={title} value={title} />
      );
      evalSelectionMarkup.push(evalMarkup);
      return allEvals;
    });

    return evalSelectionMarkup;
  }
}
