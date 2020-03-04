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
    this.clear_fields = this.clear_fields.bind(this)

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
    else {
      Alert.alert(
      `Current average grade: ${this.state.avg_grade}%\nCombined weight: ${this.state.combined_weight}%`,
      `In order to finish with a ${this.state.desired_grade}%, you need an average of ${this.state.needed_grade}% on the remaining ${this.state.remaining_weight}%`,
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
    let combined_weight = 0;
    let needed_grade = 0;
    let remaining_weight = 0;
	  
    this.state.grades_and_weights.forEach(function(evaluation) {
      // check if value is not undefined
      //if (grades_and_weights[index1] == undefined) break;

    //for (int i = 0; i < grades_and_weights [i][]; i++){}
      // update avg grade
	  avg_grade += grades_and_weights[index1][];
	    //that just added all the grade values. need to divide it to be an average.
	    //how do I access the grades and the weights seperately 
  
      // update combined_weight
	  combined_weight += grades_and_weights[][index2] ;
    })
	
    // calculated needed_grade based on desired_grade
	let current_grade = (combined_weight*avg_grade)/combined_weight;
	needed_grade = desired_grade - current_grade;
	
    // remaining_weight based on combined_weight
	remaining_weight = 100 - combined_weight;
	
/*
//hard coded
    //remove this when you're done implementing:
    this.state.avg_grade = 85
    this.state.combined_weight = 60
    this.state.remaining_weight = 40
    this.state.needed_grade = 97.5
*/
  }

  clear_fields() {
    // not sure how to do this yet
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

        {/*ADD + BUTTON TO ADD MORE FIELDS */}

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




