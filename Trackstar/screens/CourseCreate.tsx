import * as React from 'react';
import {Platform, Text, View, ScrollView, Alert } from 'react-native';
import { Divider, Card, TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { iOSUIKit } from 'react-native-typography';
import DatePicker from 'react-native-datepicker'


import {Course, Evaluation} from '../models';
import {CourseMapper, CourseMapperImpl, EvaluationMapper, EvaluationMapperImpl} from '../data_mappers';

import styles from '../Styles/CourseCreateStyles';

export interface EvaluationDescriptor {
  title: string;
  weight: number;
  date: Date;
}

export interface CourseDescriptor {
  code: string;
  title: string;
  gradeBreakdown?: EvaluationDescriptor[];
}

export default class CourseCreate extends React.Component {
  state: {
    code: string,
    title: string,
    minGrade: string,
    currEvalTitle: string,
    currEvalWeight: string,
    currDate: Date,
    currTotalGradeWeight: number,
    evaluations: EvaluationDescriptor[],
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddEvaluationToGradingScheme = this.handleAddEvaluationToGradingScheme.bind(this);
    this.generateEvalMarkup = this.generateEvalMarkup.bind(this);
    this.removeEvaluation = this.removeEvaluation.bind(this);

    this.state = {
      code: '',
      title: '',
      minGrade: '',
      currEvalTitle: '',
      currEvalWeight: '',
      currDate: new Date(),
      currTotalGradeWeight: 0,
      evaluations: [],
    }
  }

  render() {
    const courseInfo = (
      <Card style={styles.cardMargin}>
        <Card.Title title="Course info"/>
        <Card.Content>
          <TextInput
            label="Course code"
            style={styles.textInputMargin}
            value={this.state.code}
            onChangeText={(text) => {this.setState({code: text})}}
            clearButtonMode= "while-editing"
            autoCorrect={false}
          />
          <TextInput
            label="Course title"
            style={styles.textInputMargin}
            value={this.state.title}
            onChangeText={(text) => {this.setState({title: text})}}
            clearButtonMode= "while-editing"
            autoCorrect={false}
          />
          <TextInput
            label="Minimum desired grade"
            style={styles.textInputMargin}
            keyboardType={'numeric'}
            value={this.state.minGrade}
            onChangeText={(text) => {this.setState({minGrade: text})}}
            clearButtonMode= "while-editing"
            autoCorrect={false}
          />
        </Card.Content>
      </Card>
    );

    const currEvalsMarkup = this.generateEvalMarkup(this.state.evaluations);

    const subTitleMarkup = (this.state.currTotalGradeWeight > 100) ? (
      <Text style={{color: 'red'}}>Grading scheme surpasses 100%, remove evaluations.</Text>
    ) : (this.state.currTotalGradeWeight === 100) ? (
      <Text style={{color: '#4090f7'}}>Full grading scheme added.</Text>
    ) : (
      <Text>{this.state.currTotalGradeWeight}% of grade accounted for.</Text>
    );

    const evalCreationMarkup = (
      <>
        <Card style={styles.cardMargin}>
          <Card.Title title="Add grading scheme" subtitle={subTitleMarkup} />
          <Card.Content>
            <Text style={{paddingTop: 20, paddingBottom: 20}}>Add new evaluation:</Text>
            <View>
              <TextInput
                style={styles.textInputMargin}
                label="Evaluation title"
                onChangeText={(text) => {this.setState({currEvalTitle: text})}}
                value={this.state.currEvalTitle}
              />
              <TextInput
                label="Evaluation weight (%)"
                keyboardType="numeric"
                onChangeText={(text) => {this.setState({currEvalWeight: text})}}
                value={this.state.currEvalWeight}
              />
              { Platform.OS === 'ios' ?
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={this.state.currDate}
                onChange={(event, selectedDate) => {
                  this.setState({currDate: selectedDate});
                }}
                display="default"
              /> :
              <DatePicker
                testID="dateTimePicker"
                date={this.state.currDate}
                mode="datetime"
                placeholder="select date"
                format="YYYY-MM-DD"
                onDateChange={(event, selectedDate) => {
                  this.setState({currDate: selectedDate});
                }}
                androidMode='spinner'
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                style={{paddingTop: 10, width:300}}
              />}
            </View>
          </Card.Content>
          <Button
            style={styles.buttonMargin}
            mode="contained"
            onPress={this.handleAddEvaluationToGradingScheme}
            disabled={this.state.currTotalGradeWeight >= 100}
          >
            Add to grading scheme
          </Button>
        </Card>

        <Text style={{paddingTop: 20, paddingBottom: 20}}>Evaluations:</Text>
        {currEvalsMarkup}
      </>
    );

    const weightWarning = (this.state.currTotalGradeWeight > 100) ? (
      Alert.alert(
        'Grading scheme surpasses 100%',
        "Remove evaluations until at or below 100%",
        [
          {
            text: 'Dismiss'
          }
        ]
      )
    ) : null;

    return (
      <View style={{flex: 1, alignSelf: "stretch"}}>
        <ScrollView style={{
          height: 80,
          alignSelf: "stretch",
          padding: 20,
        }}>
          <Text style={iOSUIKit.largeTitleEmphasized}>Add course</Text>
          {courseInfo}
          <Divider />
          {evalCreationMarkup}
          {weightWarning}
          <View style={styles.buttonMargin}>
            <Button mode="contained" onPress={this.handleSubmit} disabled={this.state.currTotalGradeWeight > 100 || this.state.currTotalGradeWeight < 100}>Submit</Button>
          </View>
        </ScrollView>
      </View>
    );
  }

  handleSubmit() {
    const courseMapper: CourseMapper = new CourseMapperImpl();
    const newCourse = new Course(this.state.title, this.state.code, +this.state.minGrade);
    courseMapper.insert(newCourse);

    this.props.navigation.navigate("My Courses", {
      code: newCourse.code,
      name: newCourse.title,
      minGrade: newCourse.min_grade,
    });
    this.saveEvaluations(this.state.evaluations, this.state.code);
  }

  handleAddEvaluationToGradingScheme() {
    const newEval: EvaluationDescriptor = {title: this.state.currEvalTitle, weight: +this.state.currEvalWeight, date: this.state.currDate};
    const newScheme: EvaluationDescriptor[] = this.state.evaluations;

    // this is a super weird thing due to typescript interfaces but it works
    const newTotal: number = +this.state.currTotalGradeWeight + +newEval.weight;
    newScheme.push(newEval);
    this.setState({
      evaluations: newScheme,
      currEvalTitle: '',
      currEvalWeight: '',
      currTotalGradeWeight: newTotal,
    });
  }

  generateEvalMarkup(evaluations: EvaluationDescriptor[]) {
    let currID = 1;
    return evaluations.reduce(
      (allEvals, currEval) => {
        const {title, weight, date} = currEval;

        const dueDateMarkup = <Text>{`Due: ${date.toISOString().split('T')[0]}`}</Text>
        const weightMarkup = <Text>{`Grade weight: ${weight}%`}</Text>

        const evalMarkup = (
          <Card key={`eval-${currID}`}>
            <Card.Title title={title} />
            <Card.Content>
              {dueDateMarkup}
              {weightMarkup}
              <Button icon="close" onPress={() => {this.removeEvaluation(title)}}>Remove</Button>
            </Card.Content>
          </Card>
        );

        allEvals.push(evalMarkup);
        currID++;
        return allEvals;
      },
      [],
    );
  }

  removeEvaluation(title: string) {
    let evalToRemove: EvaluationDescriptor = null;
    const updatedEvals = this.state.evaluations.filter((currEval) => {
      if (currEval.title !== title) {
        return currEval;
      } else {
        evalToRemove = currEval;
      }
    });

    const newTotalWeight = this.state.currTotalGradeWeight - evalToRemove.weight;
    this.setState({evaluations: updatedEvals, currTotalGradeWeight: newTotalWeight});
  }

  saveEvaluations(courseEvals: EvaluationDescriptor[], courseCode: string) {
    const evaluationMapper: EvaluationMapper = new EvaluationMapperImpl();
    courseEvals.forEach((currEval) => {
      const newEval = new Evaluation(currEval.title, currEval.date, currEval.weight, courseCode, false, 0);
      evaluationMapper.insert(newEval);
    });

    const placeholderEval = new Evaluation('General tasks', new Date(), 0, courseCode, false, 0);
    evaluationMapper.insert(placeholderEval);
  }
}