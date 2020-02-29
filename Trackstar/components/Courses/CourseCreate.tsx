import * as React from 'react';
import { Text, View, ScrollView, Button, FlatList } from 'react-native';
import { TextInput, Divider, Surface, Card } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { iOSUIKit } from 'react-native-typography';

import Course from '../../models/Course';
import Evaluation from '../../models/Evaluation';

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

const code: string = 'code';
const title: string = 'title';

export default class CourseCreate extends React.Component {
  state: {
    code: string,
    title: string,
    minGrade: number,
    currEvalTitle: string,
    currEvalWeight: number,
    currDate: Date,
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
      minGrade: 0,
      currEvalTitle: '',
      currEvalWeight: 0,
      currDate: new Date(),
      evaluations: [],
    }
  }

  render() {
    const courseInfo = (
      <>
        <TextInput 
          label="Course code"
          value={this.state.code}
          onChangeText={(text) => {this.setState({code: text})}} 
          clearButtonMode= "while-editing"
          autoCorrect={false}
        />
        <TextInput 
          label="Course title"
          value={this.state.title}
          onChangeText={(text) => {this.setState({title: text})}}
          clearButtonMode= "while-editing"
          autoCorrect={false}
        />
        <TextInput 
          label="Minimum desired grade"
          keyboardType={'numeric'} 
          value={this.state.minGrade as unknown as string}
          onChangeText={(text) => {this.setState({minGrade: text})}}
          clearButtonMode= "while-editing"
          autoCorrect={false}
        />
      </>
    );

    const currEvalsMarkup = this.generateEvalMarkup(this.state.evaluations);

    const evalCreationMarkup = (
      <View>
        <Text style={iOSUIKit.title3Emphasized}>Add grading scheme</Text>
        <Text style={iOSUIKit.caption2}>
          By adding various evaluations you'll be able to automatically keep track of them from your dashboard.
        </Text>
        <Text style={{paddingTop: 20, paddingBottom: 20}}>Evaluations:</Text>
        {currEvalsMarkup}
        <Text style={{paddingTop: 20, paddingBottom: 20}}>Add new evaluation:</Text>
        <View>
          <TextInput label="Evaluation title" onChangeText={(text) => {this.setState({currEvalTitle: text})}} value={this.state.currEvalTitle} />
          <TextInput 
            label="Evaluation weight" 
            keyboardType={'numeric'} 
            onChangeText={(text) => {this.setState({currEvalWeight: text})}} 
            value={this.state.currEvalWeight as unknown as string}
          />
          <DateTimePicker 
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={this.state.currDate}
            onChange={(event, selectedDate) => {
              this.setState({currDate: selectedDate});
            }}
            display="default"
          />
        </View>
        <Button title="Add to grading scheme (finish)" onPress={this.handleAddEvaluationToGradingScheme} />
        <Divider />
      </View>
    );

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
          <View style={{padding: 20}}>
            <Button title="submit" onPress={this.handleSubmit} />
          </View>
        </ScrollView>
      </View>
    );
  }

  handleSubmit() {
    this.saveEvaluations(this.state.evaluations, this.state.code);
    const newCourse = new Course(this.state.title, this.state.code, this.state.minGrade);
    newCourse.save();
  }

  handleAddEvaluationToGradingScheme() {
    const newEval: EvaluationDescriptor = {title: this.state.currEvalTitle, weight: this.state.currEvalWeight, date: this.state.currDate};
    const newScheme: EvaluationDescriptor[] = this.state.evaluations;

    newScheme.push(newEval);
    this.setState({evaluations: newScheme, currEvalTitle: '', currEvalWeight: 0});
  }

  generateEvalMarkup(evaluations: EvaluationDescriptor[]) {
    return evaluations.reduce(
      (allEvals, currEval) => {
        const {title, weight, date} = currEval;

        const subTitle = `Due on ${date.toISOString().split('T')[0]} worth ${weight}%`;

        const evalMarkup = (
          <View>
            <Card>
              <Card.Title title={title} subtitle={subTitle} />
              <Card.Actions>
                <Button title="Remove" onPress={() => {this.removeEvaluation(title)}} />
              </Card.Actions>
            </Card>
          </View>
        );

        allEvals.push(evalMarkup);
        return allEvals;
      },
      [],
    );
  }

  removeEvaluation(title: string) {
    const updatedEvals = this.state.evaluations.filter(currEval => currEval.title !== title);

    this.setState({evaluations: updatedEvals});
  }

  saveEvaluations(courseEvals: EvaluationDescriptor[], courseCode: string) {
    courseEvals.forEach((currEval) => {
      const newEval = new Evaluation(currEval.title, currEval.date, false, currEval.weight, 0, courseCode);
      newEval.save();
    });
  }
}