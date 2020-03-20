import React from 'react';
import { Text, View,TouchableOpacity, ImageEditor, Alert } from 'react-native';
import { TextInput } from 'react-native';
import GradesForm from '../components/GradesForm';

export default class GradeInfo extends React.Component {
  state: {
    curr_grade: number,
    needed_grade: number,
    curr_weight: number
    remaining_weight: number
  }
