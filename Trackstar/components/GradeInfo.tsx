import React from 'react';
import { Text, View,TouchableOpacity, ImageEditor, Alert } from 'react-native';
import { TextInput } from 'react-native';

export default class GradeInfo {
  curr_grade: number
  needed_grade: number
  curr_weight: number
  remaining_weight: number

  constructor(curr_grade: number, needed_grade: number, curr_weight: number, remaining_weight: number) {
    this.curr_grade = curr_grade;
    this.needed_grade = needed_grade;
    this.curr_weight = curr_weight;
    this.remaining_weight = remaining_weight;
  }
}
