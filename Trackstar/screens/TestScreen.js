import React from "react";
// import Constants from 'expo-constants';
// import * as SQLite from 'expo-sqlite';
import { DB } from "../DB"
import { Text, View, Image, TouchableOpacity, SectionList, StyleSheet, TextInput } from "react-native";
import { render } from "react-dom";
// import {mockData} from "../mockData"


// const db = DB.new

// const sectionHeader = (data) => {
//   const section = data.section
//   return (
//     <View style={styles.sectionHeader}>
//       <Text style={styles.sectionHeaderText}>{section.time}</Text>
//     </View>
//   );
// };

// const TestScreen = (props) => {

//   React.useEffect(() => {
//     db.createCourse()
//   }, [])
//   const singleItem = (data) => {
//     const item = data.item
//     return (
//       // <TouchableOpacity onPress={() => {navigation.navigate("Details", {talkData: item})}}>
//         <View style={styles.singleItem}>
//           <Text>{item.title}</Text>
//         </View>
//       // </TouchableOpacity>
//     );
//   };

  export class TestScreen extends React.Component {

  render() {
    const [text, setText] = React.useState(null)
  return (
    <View>
      <View>
        <TextInput
        onChangeText={text => setText(text)}
        onSubmitEditing={() => {
          db.add(text);
          setText(null);
        }}
        placeholder="course code"
        value={text}
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
  }
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

// export default TestScreen;