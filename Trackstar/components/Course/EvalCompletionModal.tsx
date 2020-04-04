import React from "react";
import { View, Text } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import Modal from "react-native-modal";
import { iOSUIKit } from "react-native-typography";

import { Task, Evaluation } from "../../models";
import { CourseMapper, CourseMapperImpl, EvaluationMapper, EvaluationMapperImpl } from '../../data_mappers';

export default class EvalCompletionModal extends React.Component<{
  evalID: number;
  evalTitle: string;
  tasksRemaining: Task[];
  triggerReload
}> {
  state: {
    grade: string;
    modalActive: boolean;
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      grade: '',
      modalActive: true,
    };
  }

  render() {
    const { evalTitle, tasksRemaining, triggerReload } = this.props;
    const { grade, modalActive } = this.state;

    return (
      <Modal isVisible={modalActive}>
        <View
          style={{
            marginTop: "25%",
            marginBottom: "25%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Content>
            <Text
              style={iOSUIKit.largeTitleEmphasized}
            >{`Complete ${evalTitle}`}</Text>
            <Text>Good job!</Text>
            <View style={{ flex: 1, marginTop: 20 }}>
              {this.generateRemainingTasksMarkup(tasksRemaining)}
              <TextInput
                label="Enter grade (%)"
                value={grade}
                onChange={(text) => {
                  this.setState({grade: text})
                }}
                keyboardType="numeric"
              />
              {/* <Button
                mode="contained"
                color="#C6C6C6"
                style={{ marginTop: 20 }}
                labelStyle={{ color: "white" }}
                onPress={() => {
                  setModalActive(false);
                }}
              >
                Cancel
              </Button> */}
              <Button
                mode="contained"
                style={{ marginTop: 10 }}
                onPress={() => {
                  this.handleSubmit();
                }}
              >
                Submit
              </Button>
            </View>
          </Card.Content>
        </View>
      </Modal>
    );
  }

  handleSubmit() {
    const evalMapper: EvaluationMapper = new EvaluationMapperImpl();

    evalMapper.find(this.props.evalID).then((data) => {
      const evalToUpdate: Evaluation = data;

      evalToUpdate.complete = true;
      evalToUpdate.grade = 90;

      console.log('eval to update');
      console.log(evalToUpdate);

      evalMapper.update(evalToUpdate);

      this.setState({modalActive: false});
      this.props.triggerReload(new Date());
    });
  }

  generateRemainingTasksMarkup(tasks: Task[]) {
    const remainingTasksMarkup: JSX.Element[] = [];
    tasks.forEach((item) => {
      const taskMarkup = <Text>{item.title}</Text>;

      remainingTasksMarkup.push(taskMarkup);
    });

    return (
      <View>
        <Text style={iOSUIKit.subheadEmphasized}>
          You still have these tasks remaining for this evaluation:
        </Text>
        {remainingTasksMarkup}
      </View>
    );
  }
}
