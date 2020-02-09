import React from 'react';
import { Text, View } from 'react-native';
import Styles from './Styles';

export class Courses extends React.Component {
  render() {
    
    const {navigate} = this.props.navigation;

    return (
      <View style={Styles.content}>
        <Text>Courses View!</Text>
        <Button title="go to course view" onPress=/>
      </View>
    );
  }
}