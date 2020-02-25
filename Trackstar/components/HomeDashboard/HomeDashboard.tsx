import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import Database from '../../Database';
import Course from '../../models/Course';

export class HomeDashboard extends React.Component {

  render() {
    return (
      <View style={Styles.content}>
        <Text>Home dashboard!</Text>
        <TouchableOpacity onPress={() => {Database.init()}}>
          <Text>Create course table</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {Course.all()}}>
          <Text>Get courses</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {Database.courseTest()}}>
          <Text>Create course</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {Course.find("COMP3008")}}>
          <Text>Find 3008</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Database.deleteCourseTable}>
          <Text>Delete course</Text>
        </TouchableOpacity>
      </View>
    );
  }
}