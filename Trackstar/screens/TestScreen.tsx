import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles/CourseStyles';

const TestScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Home Screen!</Text>
      </View>
    );
};

export default TestScreen;