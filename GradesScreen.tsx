import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import Styles from '../Styles/CourseStyles';
import { TextInput } from 'react-native';

//Code below Added by Nareen feb
const GradesScreen = (props) => {
const navigation = props.navigation;
//  this.state = { text: '' };

    return (
      <View style={Styles.content}>
                <Text>Grade calculation!</Text>
				
	  <TextInput
          style={{ height: 40 }}
          placeholder="Enter grade % earned"
         // onChangeText={text => this.setState({ text })}
          //value={this.state.text}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Enter grade % earned"
          //onChangeText={text => this.setState({ text })}
          //value={this.state.text}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Enter grade % earned"
         // onChangeText={text => this.setState({ text })}
          //value={this.state.text}
        />
        <TextInput
          style={{ height: 40 }}
          placeholder="Enter grade % earned"
          //onChangeText={text => this.setState({ text })}
          //value={this.state.text}
        />

      <TouchableOpacity
        style={{ backgroundColor: 'black' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>calculate</Text>
      </TouchableOpacity>
	  
      </View>
	  
	  
    );
	// TO DO: do the calculations using the fields (functionality)
	// TO DO: save the data per course? and be able to get those numbers from those values and display them on the specific course's page
	
};

export default GradesScreen;
