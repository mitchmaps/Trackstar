import React from 'react';
import { Text, View } from 'react-native';
import Styles from './Styles';

export class Courses extends React.Component {
  render() {
    return (
      <View style={Styles.content}>
        <Text>Courses View!</Text>
      </View>
    );
  }
}