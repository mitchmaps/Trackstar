import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles/CourseStyles';

const GradesScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Grade calculation!</Text>
      </View>
    );
};

export default GradesScreen;