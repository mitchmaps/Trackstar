import * as React from 'react';
import t from 'tcomb-form-native';

import { Text, View, Button, FlatList, DatePickerIOS } from 'react-native';
import { TextInput, Divider, Surface } from 'react-native-paper';
import { iOSUIKit } from 'react-native-typography';


export interface EvaluationDescriptor {
  title: string;
  dueDate: Date;
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
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      code: '',
      title: '',
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

    return (
      <View style={{alignSelf: "stretch"}}>
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
          <Text style={iOSUIKit.title3Emphasized}>Add grading scheme</Text>
          <Text style={iOSUIKit.caption2}>
            By adding various evaluations you'll be able to automatically keep track of them from your dashboard.
          </Text>
          <Text style={{paddingTop: 20, paddingBottom: 20}}>Evaluations:</Text>
          <View>
            <TextInput label="Evaluation title" onChangeText={() => {}} />
            <View style={{flexDirection: 'row'}}>
              <TextInput label="Grade percentage"></TextInput>
            </View>
          </View>
            
          <Button title="submit" onPress={this.handleSubmit} />
        </View>
      </View>
    );
  }

  handleSubmit() {
    console.log('in submit');
    console.log(this.state.code);
    console.log(this.state.title);
  }
}