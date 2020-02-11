import React, {useState} from 'react';
import t from 'tcomb-form-native';

import { Text, View, Button, TextInput } from 'react-native';
import { iOSUIKit } from 'react-native-typography';

export interface EvaluationDescriptor {
  title: string;
  dueDate: Date;
  weight: number;
}

export interface CourseDescriptor {
  code: string;
  title: string;
  gradeBreakdown: EvaluationDescriptor[];
}

export default function CourseCreate() {
  const [courseInfo, setCourseInfo] = useState({});

  return (
    <View>
      <Text style={iOSUIKit.largeTitleEmphasized}>Add course</Text>
      <TextInput onChangeText={() => {}} />
    </View>
  );
}