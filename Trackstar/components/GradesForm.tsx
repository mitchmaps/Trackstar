import React from 'react';
import { Text, View,TouchableOpacity, ImageEditor } from 'react-native';
import { TextInput } from 'react-native';

export default class GradesForm extends React.Component {
  state: {
    grades_and_weights: number[][]
  }

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.field = this.update.bind(this);


    this.state = {
      grades_and_weights: []
    }
  }

  update(index1, index2, value) {
    const grades_and_weights = this.state.grades_and_weights
    grades_and_weights[index1][index2] = value
    return grades_and_weights
  }

  field(index1) {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput
          style={{ height: 30, width: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={text => this.setState({ grades_and_weights: this.update(index1, 0, text) })}
          //value={this.state.text}
        />
        <TextInput
          style={{ height: 30, width: 40, borderColor: 'gray', borderWidth: 1}}
          // onChangeText={text => this.setState({ text })}
          //value={this.state.text}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}>
        <Text style={{fontSize: 30, textAlign: "center"}}>Grade Calculator</Text>
        {/* Course selector */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text>Weight</Text>
          <Text>Grade</Text>
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
      </View>
    )
  }
}





