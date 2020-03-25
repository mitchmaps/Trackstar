import React from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { Divider, Card, TextInput, Button } from "react-native-paper";
import { iOSUIKit } from "react-native-typography";

import { Evaluation } from "../../models";

export default class CourseEdit extends React.Component {
  state: {
    code: string;
    title: string;
    minGrade: string;
    evals: Evaluation[];
  };

  constructor(props) {
    super(props);
    const { code, title, minGrade, evals } = this.props.route.params;

    this.generateCurrEvalsMarkup = this.generateCurrEvalsMarkup.bind(this);
    this.state = {
      code: code,
      title: title,
      minGrade: minGrade,
      evals: evals
    };
  }

  render() {
    const { code, title, minGrade, evals } = this.state;

    const courseInfoMarkup = (
      <Card style={{ marginTop: 20 }}>
        <Card.Title title="Edit course info" />
        <Card.Content>
          <TextInput
            label="Course code"
            value={code}
            onChangeText={text => {
              this.setState({ code: text });
            }}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
          <TextInput
            label="Course title"
            value={title}
            onChangeText={text => {
              this.setState({ title: text });
            }}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
          <TextInput
            label="Minimum desired grade"
            keyboardType={"numeric"}
            value={minGrade}
            onChangeText={text => {
              this.setState({ minGrade: text });
            }}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
        </Card.Content>
      </Card>
    );

    const currEvalsMarkup = this.generateCurrEvalsMarkup();

    const evaluationsInfoMarkup = (
      <Card style={{ marginTop: 20 }}>
        <Card.Title title="Edit Evaluations" />
        {currEvalsMarkup}
      </Card>
    );

    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <ScrollView style={{ height: 80, alignSelf: "stretch", padding: 20 }}>
          <Text style={iOSUIKit.largeTitleEmphasized}>Edit course</Text>
          {courseInfoMarkup}
          {currEvalsMarkup}
        </ScrollView>
      </View>
    );
  }

  generateCurrEvalsMarkup() {
    const currEvals: JSX.Element[] = [];

    this.state.evals.forEach(evaluation => {
      const { id, title, weight, due_date } = evaluation;

      const dueDateMarkup = (
        <Text>{`Due: ${due_date.toISOString().split("T")[0]}`}</Text>
      );
      const weightMarkup = <Text>{`Grade weight: ${weight}%`}</Text>;

      const evalMarkup = (
        <Card key={`eval-${id}`}>
          <Card.Title title={title} />
          <Card.Content>
            {dueDateMarkup}
            {weightMarkup}
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
              <Button icon="close" onPress={() => {}}>
                Remove
              </Button>
              <Button icon="pencil" onPress={() => {}}>
                Edit
              </Button>
            </View>
          </Card.Content>
        </Card>
      );

      currEvals.push(evalMarkup);
    });

    return currEvals;
  }
}
