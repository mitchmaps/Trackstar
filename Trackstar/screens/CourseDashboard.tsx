import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Database from '../Database';

const CourseDashboard = (props) => {
  // const navigation = props.navigation
  const db = new Database(); // might need to be instantiated in App.tsx and be passed into each page?

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {db.createCourse()}}>
        <Text style={styles.buttonText}>Create course table</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {db.addCourse()}}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {db.getCourses()}}>
        <Text style={styles.buttonText}>Get Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {db.deleteCourses()}}>
        <Text style={styles.buttonText}>Delete Courses</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 70,
    width: 70,
    marginBottom: 80
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  appName: {
    fontSize: 60,
    fontWeight: "700",
    color: "navy"
  },
  description: {
    marginBottom: 48
  },
  button: {
    backgroundColor: "pink",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4
  },
  buttonText: {
    color: "navy"
  }
});

export default CourseDashboard;