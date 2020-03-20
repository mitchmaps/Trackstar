import React from 'react';
import { Text, View,TouchableOpacity, ImageEditor, Alert } from 'react-native';
import { TextInput } from 'react-native';
import GradesForm from '../components/GradesForm';

import { avg_grade, combined_weight, needed_grade, remaining_weight} from "../GradesForm";
  
  calculate(grades_and_weights, desired_grade) {
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
    
    return new GradeInfo(avg_grade,needed_grade,combined_grade,combined_weight,remaining_weight)
  }
