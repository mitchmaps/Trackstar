import React from "react";
// import Constants from 'expo-constants';
// import * as SQLite from 'expo-sqlite';
import { DB } from "./DB"
import { Text, View, Image, TouchableOpacity, SectionList, StyleSheet } from "react-native";
// import {mockData} from "../mockData"

const db = DB.new

const sectionHeader = (data) => {
  const section = data.section
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.time}</Text>
    </View>
  );
};

const TestScreen = (props) => {
  // const navigation = props.navigation;
//   const [text, setText] = React.useState(null)

//   let _todo;
//   let _done;

  React.useEffect(() => {
    db.createCourse()
  }, [])
  const singleItem = (data) => {
    const item = data.item
    return (
      // <TouchableOpacity onPress={() => {navigation.navigate("Details", {talkData: item})}}>
        <View style={styles.singleItem}>
          <Text>{item.title}</Text>
        </View>
      // </TouchableOpacity>
    );
  };

  return (
    <View>
      <View>
        <TextInput
        onChangeText={code => setText(code)}
        onSubmitEditing={() => {
          db.add(code);
          setText(null);
        }}
        placeholder="course code"
        value={code}
        />
      </View>
      <View>
        <SectionList
          sections={db.getCourses()}
          renderItem={singleItem}
          renderSectionHeader={sectionHeader}
        />
      </View>
    </View>
  );
};

// ScheduleScreen.navigationOptions = () => {
//   return {
//     headerLeft: () => null,
//       gestureEnabled: false,
//   };
// };

const styles = StyleSheet.create({
  sectionHeader: {
    padding: 14,
    backgroundColor: "pink"
  },
  sectionHeaderText: {
    color: "white"
  },
  singleItem: {
    paddingVertical: 18,
    paddingHorizontal: 14
  }
});

export default TestScreen;