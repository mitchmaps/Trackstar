import React from "react";
import Evaluation from "../../models/Evaluation";

import { View, Text, ScrollView } from "react-native";
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

    const evalSelectionMarkup = this.generateEvalSelectionMarkup(evals);

    // add error checking for ensuring the due date for the task can't be after the due date for the eval
    const taskDetailsMarkup = (
      <Card>
        <Card.Title title="Task details" />
        <Card.Content>
          <List.Section title="Select evaluation">
            <List.Accordion title="Evaluations">
              <List.Item title="Eval 1" />
              <List.Item title="Eval 2" />
            </List.Accordion>
          </List.Section>
          <TextInput
            label="Task title"
            value={this.state.title}
            onChangeText={text => {
              this.setState({ title: text });
            }}
          />
          <Text>Task due date</Text>
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
            label="Estimated time needed in hours"
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
        </ScrollView>
      </View>
    );
  }

  generateEvalSelectionMarkup(evals: Evaluation[]) {
    // return evals.reduce((currEval: Evaluation, allEvals) => {
    //   const {course_code, due_date, title, weight} = currEval;
    //   const evalMarkup = (
    //     <List.Item title={title} onPress={() => {this.setState({selectedEval: currEval})}} />
    //   );
    //   allEvals.push(evalMarkup);
    //   return allEvals;
    // });
  }
}
