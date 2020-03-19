import React from 'react';
import { Text, View,TouchableOpacity, ImageEditor, Alert } from 'react-native';
import { TextInput } from 'react-native';

export default class GradesForm extends React.Component {
  state: {
    grades_and_weights: number[][],
    desired_grade: number,
    avg_grade: number,
    combined_weight: number,
    needed_grade: number,
    remaining_weight: number
  }

  constructor(props) {
    super(props);
    // this.update = this.update.bind(this);
    this.field = this.field.bind(this);
    this.handle_submit = this.handle_submit.bind(this)
    this.calculate = this.calculate.bind(this)
    // this.clear_fields = this.clear_fields.bind(this)
    // this.auto_fields = this.auto_fields.bind(this)

    this.state = {
      grades_and_weights: [], // looks like [ [grade1, weight1], [grade2, weight2], [grade3, weight3], ...]
      desired_grade: 0,
      avg_grade: 0,
      combined_weight: 0,
      needed_grade: 0,
      remaining_weight: 0
    }
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
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {/*add the keyboardtype numeric!*/}
        <TextInput
          style={{ height: 30, width: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.update_array(row_id, grade_index, text)}
          //value={this.state.text}
        />
        <TextInput
          style={{ height: 30, width: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.update_array(row_id, weight_index, text)}
          //value={this.state.text}
        />
      </View>
    )
  }

  handle_submit() {
    this.calculate()
    if (this.state.combined_weight > 100) {
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
    //adding more error cases in an elseif here
    
    else {
      Alert.alert(
      `Current average grade: ${this.state.avg_grade}%\nCombined weight: ${this.state.combined_weight}%`,
      `In order to finish with a ${this.state.desired_grade}%, you need an average of ${this.state.needed_grade.toFixed(2)}% on the remaining ${this.state.remaining_weight}%`,
      [
        {
          text: 'Back'
        }
      ]
      )
    }
  }

  // will be moved out to another file
  calculate() {
    let avg_grade = 0;
    let combined_grade = 0;
    let combined_weight = 0;
    let needed_grade = 0;
    let remaining_weight = 0;

    for (let i = 0; i < this.state.grades_and_weights.length; i++) {
      let curEval = this.state.grades_and_weights[i];
      if (curEval == undefined || Number.isNaN(curEval[0]) || Number.isNaN(curEval[1]) || curEval[0] == undefined || curEval[1] == undefined) {
        continue;
      }

      combined_grade += curEval[0]*(curEval[1]/100);
      combined_weight += curEval[1];
    }

    avg_grade = combined_grade/(combined_weight/100);
    remaining_weight = 100 - combined_weight;
    needed_grade = (this.state.desired_grade - combined_grade)/(remaining_weight/100);

    this.state.avg_grade = parseFloat(avg_grade.toFixed(2));
    this.state.combined_weight = parseFloat(combined_weight.toFixed(2));
    this.state.needed_grade = parseFloat(needed_grade.toFixed(2));
    this.state.remaining_weight = parseFloat(remaining_weight.toFixed(2));
  }

  // clear_fields() {
  //   // not sure how to do this
  // }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
        <Text style={{fontSize: 30, textAlign: "center"}}>Grade Calculator</Text>
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
        {this.field(5)}
        {this.field(6)}
        {this.field(7)}

        {/*ADD + BUTTON TO ADD MORE FIELDS NEXT STEP*/}

        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 20}}>
            <Text>Desired grade: </Text>
            <TextInput
              style={{ height: 30, width: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={text => this.setState({ desired_grade: text})}
              //value={this.state.text}
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
      </View>
    )
  }
}




