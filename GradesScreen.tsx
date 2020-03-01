//Button on screen
//TO DO addding and formating input fields
//TO DO adding "do calculation" code

import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import Styles from '../Styles/CourseStyles';
import { TextInput } from 'react-native';

//Code below Added by Nareen feb
const GradesScreen = (props) => {
const navigation = props.navigation;
  
    return (
      <View style={Styles.content}>
                <Text>Grade calculation!</Text>

      <TouchableOpacity
        style={{ backgroundColor: 'black' }}>
        <Text style={{ fontSize: 20, color: '#fff' }}>calculate</Text>
      </TouchableOpacity>
	  
      </View>
	  
	  
    );
	//Added the buttons and their functionality
	// TO DO: save the data per course? and be able to get those numbers from those values and display them on the specific course's page
	
};

export default GradesScreen;
