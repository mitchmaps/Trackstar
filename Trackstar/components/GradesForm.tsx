import React from 'react';
import { Text, View,TouchableOpacity, ImageEditor, Alert } from 'react-native';
import { TextInput } from 'react-native';
import GradeInfo from './GradeInfo';
import GradesCalculator from './GradesCalculator';
import { LinearGradient } from "expo-linear-gradient";
import { Course } from '../models';
import { CourseMapper, CourseMapperImpl, EvaluationMapper, EvaluationMapperImpl } from '../data_mappers';
import { Dropdown } from 'react-native-material-dropdown';


export default class GradesForm extends React.Component {

  state: {
    grades_and_weights: number[][],
    desired_grade: number,
    grade_info: GradeInfo,
    courses: Course[],
    courseCodes: [{}],
    TextInputValue: number,
  }

  constructor(props) {
    super(props);
    // this.update = this.update.bind(this);
    this.field = this.field.bind(this);
    this.handle_submit = this.handle_submit.bind(this)
    //this.calculate = this.calculate.bind(this)

    this.state = {
      grades_and_weights: [], // looks like [ [grade1, weight1], [grade2, weight2], [grade3, weight3], ...]
      desired_grade: 0,
      grade_info: null,
      courses: [],
      courseCodes: [{}],
      TextInputValue: null,
    }

    this.get_courses();

  }

  clear_field(){
    // not working / or functional
    this.setState({grades_and_weights: []})
  }

  update_array(index1, index2, value) {
    const grades_and_weights = this.state.grades_and_weights
    if (grades_and_weights[index1] == undefined)
      grades_and_weights[index1] = []

    grades_and_weights[index1][index2] = parseFloat(value)
    this.setState({ grades_and_weights: grades_and_weights})
  }

  field(row_id) {

    const grade_index = 0;
    const weight_index = 1;

    // set all boxes to 0 for the courses that do not have enough evaluations
    let grade_value = 0;
    let weight_value = 0;

    if(row_id < this.state.grades_and_weights.length)
    {
      grade_value = this.state.grades_and_weights[row_id][0]
      weight_value = this.state.grades_and_weights[row_id][1]
    }

    else
    {
      this.update_array(row_id, grade_index, '0');
      this.update_array(row_id, weight_index, '0');
    }


    return(
      
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput
        autoCapitalize = {'characters'}
          placeholder="Enter text"
          style={{ height: 30, width: 40, backgroundColor:'white', borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => {
            if(text.length===0)
              this.update_array(row_id, grade_index, '0');
            else
              this.update_array(row_id, grade_index, text)}
          }
          value={grade_value.toString()}
        />
        <TextInput
        autoCapitalize = {'characters'}  
          style={{ height: 30, width: 40, borderColor: 'gray', backgroundColor:'white', borderWidth: 1}}
          onChangeText={text => {
            if(text.length===0)
              this.update_array(row_id, weight_index, '0');
            else
              this.update_array(row_id, weight_index, text)}
          }
          value={weight_value.toString()}
        />
      </View>
    );
    
  }

  handle_submit() {
    this.state.grade_info = GradesCalculator.calculate(this.state.grades_and_weights, this.state.desired_grade)
    if (this.state.grade_info.curr_weight > 100) {
      Alert.alert(
        "The combined weights of these evaluations surpasses 100%.",
        "Please adjust the weights and try again.",
        [
          {
            text: 'Back'
          }
        ]
      )
    }

    else {
      Alert.alert(
      `Current average grade: ${this.state.grade_info.curr_grade}%\nCombined weight: ${this.state.grade_info.curr_weight}%`,
      `In order to finish with a ${this.state.desired_grade}%, you need an average of ${this.state.grade_info.needed_grade.toFixed(2)}% on the remaining ${this.state.grade_info.remaining_weight}%`,
      [
        {
          text: 'Back'
        }
      ]
      )
    }
  }


  get_courses(){
    const courseMapper: CourseMapper = new CourseMapperImpl;
    let courseList = this.state.courseCodes;
    // get courses from database
    courseMapper.all(true).then(elements=>{
      // update state variable with all the course codes
      elements.forEach(course=>{
        courseList.push({value: course.code})
      })
      //courseList.push({value: 'none'})
    })
    courseList.shift();
    // this.setState({courseCodes: courseList});
  }

  /* The calculations are done in GradesCalculator.tsx now*/

  render() {
    return (
      <LinearGradient
      colors={["#bcf7ed", "#5273eb"]}
      style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{fontSize: 20, textAlign: "center", textAlignVertical: "center"}}>Grade Calculator</Text>

          <Dropdown
            label="Course Selection"
            data={this.state.courseCodes}
            value={"none"}
            containerStyle={{top:20, width:150}}
            
            onChangeText={value=>{
              const evalMapper : EvaluationMapper = new EvaluationMapperImpl;
              let newGradeWeight = []; // new grades_and_weight 2d array to be passed back
              evalMapper.findByCourse(value).then(evals=>{ // get all the evaluations associated with the selected course
                evals.forEach(singleEval=>{
                  newGradeWeight.push([singleEval.grade, singleEval.weight]);
                })
                return newGradeWeight;
              }).then(newState=>{
                  this.setState({grades_and_weights: newState}); // set the grades_and_weight state to the array we just made
              }).then(()=>{
                const courseMapper: CourseMapper = new CourseMapperImpl;
                courseMapper.find(value).then(val=>{
                  this.setState({desired_grade: val.min_grade}) // set the desired weight state to the retrieved
                })
              })
            }}

          />
        </View>
        {/* Course selector */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text>Grade</Text>
          <Text>Weight</Text>
        </View>
        {/*Figure out how to loop instead*/}
        {this.field(0)}
        {this.field(1)}
        {this.field(2)}
        {this.field(3)}
        {this.field(4)}
        {/*{this.field(5)}
        {this.field(6)}
        {this.field(7)} */}

        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20}}>
          <Text>Desired grade: </Text>
            <TextInput
              style={{ height: 30, width: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
              onChangeText={text => this.setState({ desired_grade: text})}
              value={this.state.desired_grade.toString()}
            />
          </View>
          <View style={{paddingBottom: 20}}>
            <TouchableOpacity style={{width: 100, backgroundColor: '#5273eb', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4}} onPress={this.handle_submit}>
              <Text style={{color: "white"}}>Calculate</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{width: 120, backgroundColor: "red", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4}} onPress={this.clear_fields}>
            <Text style={{color: "white"}}>Clear Fields</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }
}
