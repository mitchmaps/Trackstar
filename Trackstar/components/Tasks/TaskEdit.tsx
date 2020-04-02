import React from "react";
import { Text, View, ScrollView, Platform } from "react-native";
import { iOSUIKit } from "react-native-typography";
import { Card, TextInput, Button } from "react-native-paper";
import DatePicker from "react-native-datepicker"; // android
import DateTimePicker from "@react-native-community/datetimepicker"; // iOS

import { Task } from '../../models';
import { TaskMapper, TaskMapperImpl } from "../../data_mappers";

export default class TaskEdit extends React.Component {
  state: {
    title: string;
    dueDate: Date;
    duration: string;
    id: number;
  };

  constructor(props) {
    super(props);

    const { title, dueDate, duration, id } = props.route.params;

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      title: title,
      dueDate: dueDate,
      duration: duration,
      id: id,
    };
  }

  render() {
    const { title, dueDate, duration } = this.state;
    const {courseCode, courseName} = this.props.route.params;

    const detailsMarkup = (
      <Card style={{marginTop: 20}}>
        <Card.Content>
          <TextInput
            label="Task title"
            value={title}
            onChangeText={text => {
              this.setState({ title: text });
            }}
          />
          <Text style={{ paddingTop: 20 }}>Task due date</Text>

          {Platform.OS === "ios" ? (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={dueDate}
              onChange={(event, selectedDate) => {
                this.setState({ dueDate: selectedDate });
              }}
              display="default"
            />
          ) : (
            <DatePicker
              date={dueDate}
              mode="datetime"
              placeholder="select date"
              format="YYYY-MM-DD"
              onDateChange={(event, selectedDate) => {
                this.setState({ dueDate: selectedDate });
              }}
              androidMode="spinner"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{ paddingTop: 10, paddingBottom: 20, width: 300 }}
            />
          )}

          <TextInput
            label="Estimated time needed in minutes"
            value={duration.toString()}
            keyboardType="numeric"
            onChangeText={text => {
              this.setState({ duration: text });
            }}
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={iOSUIKit.largeTitleEmphasized}>Edit task</Text>
            <Button
              mode="contained"
              onPress={() => {
                this.handleSubmit();
              }}
            >
              Finish
            </Button>
          </View>
            <Text>{courseCode}</Text>
          {detailsMarkup}
        </ScrollView>
      </View>
    );
  }

  handleSubmit() {
    const taskMapper: TaskMapper = new TaskMapperImpl();
    const { title, dueDate, duration, id } = this.state;

    taskMapper.find(id).then((data) => {
      const taskToEdit: Task = data;
      taskToEdit.title = title;
      taskToEdit.due_date = dueDate;
      taskToEdit.est_duration = +duration;

      taskMapper.update(taskToEdit);
      const { courseCode, courseName, courseMinGrade} = this.props.route.params;

      this.props.navigation.navigate('Course view', {
        code: courseCode,
        name: courseName,
        minGrade: courseMinGrade,
      });
    });
  }
}
