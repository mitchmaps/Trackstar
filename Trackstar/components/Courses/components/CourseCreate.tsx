import * as React from 'react';
import t from 'tcomb-form-native';

import { Text, View, Button, FlatList, DatePickerIOS, ScrollView } from 'react-native';
import { TextInput, Divider, Surface, Card } from 'react-native-paper';
import { iOSUIKit } from 'react-native-typography';


export interface EvaluationDescriptor {
  title: string;
  weight: number;
}

export interface CourseDescriptor {
  code: string;
  title: string;
  gradeBreakdown?: EvaluationDescriptor[];
}

const code: string = 'code';
const title: string = 'title';

export class CourseCreate extends React.Component {
  // const [courseInfo, setCourseInfo] = useState({code: '', title: ''});

  // const handleChange = useCallback((text, id) => {
  //   const currInfo: CourseDescriptor = courseInfo;
  //   id === code ? currInfo.code = text : currInfo.title = text
  //   setCourseInfo(currInfo);
  // }, []);

  // const handleSubmit = useCallback(() => {
  //   console.log('in submit');
  //   console.log(courseInfo);
  // }, []);

  state: {
    code: string,
    title: string,
    currEvalTitle: string,
    currEvalWeight: number,
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
      currEvalTitle: '',
      currEvalWeight: 0,
      evaluations: [],
    }
  }

  // regex for course codes: \w{4}\d{4}

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
        </View>
        <Button title="Add to grading scheme (finish)" onPress={this.handleAddEvaluationToGradingScheme} />
        <Divider />
      </View>
    );

    return (
      <View style={{flex: 1, alignSelf: "stretch"}}>
        <View style={{
          height: 80,
          alignSelf: "stretch",
          padding: 20,
        }}>
          <Text style={iOSUIKit.largeTitleEmphasized}>Add course</Text>
          {courseInfo}
          <Text>{this.state.code}</Text>
          <Text>{this.state.title}</Text>
          <Divider />
          {evalCreationMarkup}
          {/* <Button title="submit" onPress={this.handleSubmit} /> */}
        </View>
      </View>
    );
  }

  handleSubmit() {
    console.log(this.state.code);
    console.log(this.state.title);
    // DB stuff goes here
  }

  handleAddEvaluationToGradingScheme() {
    const newEval: EvaluationDescriptor = {title: this.state.currEvalTitle, weight: this.state.currEvalWeight};
    const newScheme: EvaluationDescriptor[] = this.state.evaluations;

    newScheme.push(newEval);
    this.setState({evaluations: newScheme, currEvalTitle: '', currEvalWeight: 0});

    console.log(this.state.evaluations);
  }

  generateEvalMarkup(evaluations: EvaluationDescriptor[]) {
    return evaluations.reduce(
      (allEvals, currEval) => {
        const {title, weight} = currEval;

        const evalMarkup = (
          <View>
            <Card>
              <Card.Title title={title} subtitle={`${weight}%`} />
              <Card.Actions>
                <Button title="Remove" onPress={} />
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

  removeEvaluation(evaluations: EvaluationDescriptor[]) {
    
  }
}