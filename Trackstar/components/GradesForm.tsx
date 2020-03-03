import React from 'react';
import { Text, View,TouchableOpacity, ImageEditor, Button } from 'react-native';
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
    this.calculate = this.calculate.bind(this)


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

  // will be moved out to another file
  calculate() {
    let avg_grade = 0;
    let combined_weight = 0;
    let needed_grade = 0;
    let remaining_weight = 0;
    this.state.grades_and_weights.forEach(function(evaluation) {
      // update avg grade
      // update combined_weight
    })
    // calculated needed_grade based on desired_grade
    // calculate remaining_weight based on combined_weight
  }

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

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text>Desired grade: </Text>
          <TextInput
            style={{ height: 30, width: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={text => this.setState({ desired_grade: text})}
            //value={this.state.text}
          />
        </View>

        <TouchableOpacity onPress={this.calculate}>
          <Text>Calculate</Text>
        </TouchableOpacity>
      </View>
    )
  }
}





