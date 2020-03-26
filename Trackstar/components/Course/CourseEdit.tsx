import React from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { Divider, Card, TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { iOSUIKit } from "react-native-typography";

import { Evaluation } from "../../models";
import { EvaluationMapper, EvaluationMapperImpl } from '../../data_mappers';

interface EvalDescriptor {
  editing: boolean;
  data: Evaluation;
}

export default class CourseEdit extends React.Component {
  state: {
    code: string;
    title: string;
    minGrade: string;
    evals: Evaluation[];
    evalEditingActive: boolean;
    evalToEdit: Evaluation;
    currEvalEditTitle: string;
    currEvalEditDate: Date;
    currEvalEditWeight: string;
  };

  constructor(props) {
    super(props);
    const { code, title, minGrade, evals } = this.props.route.params;

    this.generateCurrEvalsMarkup = this.generateCurrEvalsMarkup.bind(this);
    this.handleEvalDelete = this.handleEvalDelete.bind(this);
    this.handleEvalUpdate = this.handleEvalUpdate.bind(this);
    this.handleEvalEdit = this.handleEvalEdit.bind(this);
    this.selectEvalById = this.selectEvalById.bind(this);
    this.state = {
      code: code,
      title: title,
      minGrade: minGrade,
      evals: evals,
      evalEditingActive: false,
      evalToEdit: evals[0],
      currEvalEditTitle: evals[0].title,
      currEvalEditDate: evals[0].due_date,
      currEvalEditWeight: evals[0].weight
    };
  }

  render() {
    const {
      code,
      title,
      minGrade,
      evals,
      evalEditingActive,
      evalToEdit
    } = this.state;

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
    const evalEditMarkup = evalEditingActive
      ? this.generateEvalEditMarkup(evalToEdit)
      : null;

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
          <Text>{this.state.evalToEdit.title}</Text>
          {courseInfoMarkup}
          {evalEditMarkup}
          {currEvalsMarkup}
        </ScrollView>
      </View>
    );
  }

  generateEvalEditMarkup(evaluation: Evaluation) {
    const { title } = evaluation;

    return (
      <Card>
        <Card.Title title={`Edit ${title}`} />
        <Card.Content>
          <View>
            <TextInput
              label="Evaluation title"
              onChangeText={text => {
                this.setState({ currEvalEditTitle: text });
              }}
              value={this.state.currEvalEditTitle}
            />
            <TextInput
              label="Evaluation weight (%)"
              keyboardType="numeric"
              onChangeText={text => {
                this.setState({ currEvalEditWeight: text });
              }}
              value={this.state.currEvalEditWeight}
            />
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={this.state.currEvalEditDate}
              onChange={(event, selectedDate) => {
                this.setState({ currEvalEditDate: selectedDate });
              }}
              display="default"
            />
            <Button onPress={() => {this.handleEvalUpdate()}}>Confirm</Button>
          </View>
        </Card.Content>
      </Card>
    );
  }

  handleEvalDelete(id: number) {
    const { evals } = this.state;

    let evalToDelete: Evaluation = this.selectEvalById(id);

    evals.splice(evals.indexOf(evalToDelete), 1);
    this.setState({ evals: evals });
  }

  handleEvalEdit(id: number) {
    const { evals } = this.state;

    let evalToEdit: Evaluation = this.selectEvalById(id);

    this.setState({ evalEditingActive: true, evalToEdit: evalToEdit });
  }

  handleEvalUpdate() {
    const {evalToEdit, currEvalEditTitle, currEvalEditWeight, currEvalEditDate} = this.state;

    const evaluationMapper: EvaluationMapper = new EvaluationMapperImpl();

    evalToEdit.title = currEvalEditTitle;
    evalToEdit.weight = +currEvalEditWeight;
    evalToEdit.due_date = currEvalEditDate;

    evaluationMapper.update(evalToEdit);
  }

  generateCurrEvalsMarkup() {
    const currEvals: JSX.Element[] = [];

    this.state.evals.forEach(evaluation => {
      const { id, title, weight, due_date } = evaluation;

      const dueDateMarkup = (
        <Text>{`Due: ${due_date.toISOString().split("T")[0]}`}</Text>
      );
      const weightMarkup = <Text>{`Grade weight: ${weight}%`}</Text>;

      const buttonsMarkup = !this.state.evalEditingActive ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Button
            icon="close"
            onPress={() => {
              this.handleEvalDelete(id);
            }}
          >
            Remove
          </Button>
          <Button
            icon="pencil"
            onPress={() => {
              this.handleEvalEdit(id);
            }}
          >
            Edit
          </Button>
        </View>
      ) : null;

      const evalMarkup = (
        <Card key={`eval-${id}`}>
          <Card.Title title={title} />
          <Card.Content>
            {dueDateMarkup}
            {weightMarkup}
            {buttonsMarkup}
          </Card.Content>
        </Card>
      );

      currEvals.push(evalMarkup);
    });

    return currEvals;
  }

  selectEvalById(id) {
    let evalToReturn: Evaluation = null;

    this.state.evals.forEach(evaluation => {
      if (evaluation.id === id) {
        evalToReturn = evaluation;
      }
    });

    console.log("selecting");
    console.log(evalToReturn);

    return evalToReturn;
  }
}
