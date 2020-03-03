import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles/CourseStyles';

const HomeScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Home Screen!</Text>
      </View>
      
      //Where does this go
      /*
      //adding mock task
      static mocktask() {
      let task1 = new task (id, title, course, time);
      let task2 = new task (id, title, course, time);
      let task3 = new task (id, title, course, time);
      let task4 = new task (id, title, course, time);
      //console.log(course.code)
      task.save()
      }
      */
    );
};

export default HomeScreen;
