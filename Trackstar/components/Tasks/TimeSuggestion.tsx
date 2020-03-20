import React from "react";
import {Evaluation, Task} from '../../models';
import {TaskMapper, TaskMapperImpl} from '../../data_mappers';

import { View, Text, ScrollView, Picker } from "react-native";
import { Divider, Card, TextInput, Button, List } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { iOSUIKit } from "react-native-typography";
import UserMapper from "../../data_mappers/UserMapper";
import UserMapperImpl from "../../data_mappers/UserMapperImpl";

export default class TimeSuggestion extends React.Component {
  render() {
    const userMapper: UserMapper = new UserMapperImpl;
    userMapper.getUser().then((estimationAccuracy) => {

    })
    if (userMapper)
    return(
      <Text>You generally </Text>
    )
  }

}