import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CourseDashboard from "./screens/CourseDashboard";

import { HomeDashboard } from './components/HomeDashboard/HomeDashboard';
// import { TestScreen } from './screens/TestScreen';

const AppNavigator = createBottomTabNavigator({
  Dashboard: HomeDashboard,
  Courses: CourseDashboard,
  // Test: TestScreen
  },
  {
    initialRouteName: 'Courses',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// import Constants from 'expo-constants';
// import * as SQLite from 'expo-sqlite';
// import React from 'react';
// import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import Database from './Database';

// function Courses({ done: doneHeading, onPressCourse }) {
//   const [courses, setCourses] = React.useState(null);

//   React.useEffect(() => {
//     db.transaction(tx => {
//       tx.executeSql(
//         `select * from Course where complete = ?;`,
//         [doneHeading ? 1 : 0],
//         (_, { rows: { _array } }) => setCourses(_array)
//       );
//     });
//   }, []);

//   const heading = doneHeading ? "Completed Courses" : "Current Courses";

//   if (courses === null || courses.length === 0) {
//     return null;
//   }

//   return (
//     <View style={styles.sectionContainer}>
//       <Text style={styles.sectionHeading}>{heading}</Text>
//       {courses.map(({ code, complete }) => (
//         <TouchableOpacity
//           key={code}
//           onPress={() => onPressCourse && onPressCourse(code)}
//           style={{
//             backgroundColor: complete ? "#1c9963" : "#fff",
//             borderColor: "#000",
//             borderWidth: 1,
//             padding: 8
//           }}
//         >
//           <Text style={{ color: complete ? "#fff" : "#000" }}>{code}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

// export default function App() {
//   const [text, setText] = React.useState(null)

//   let _todo;
//   let _done;

//   React.useEffect(() => {
//     db.transaction(tx => {
//       tx.executeSql(
//         "create table if not exists Course (code text primary key not null, complete bit default 0);"
//       );
//     });
//   }, [])


//   const add = (code) => {
//     // is text empty?
//     if (code === null || code === "") {
//       return false;
//     }

//     db.transaction(
//       tx => {
//         tx.executeSql("insert into Course (code) values (?)", [code]);
//         tx.executeSql("select * from Course", [], (_, { rows }) =>
//           console.log(JSON.stringify(rows))
//         );
//       },
//       null,
//       update
//     );
//   }

//   const update = () => {
//     _todo && _todo.update();
//     _done && _done.update();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>SQLite Example</Text>
//       <View style={styles.flexRow}>
//         <TextInput
//           onChangeText={text => setText(text)}
//           onSubmitEditing={() => {
//             add(text);
//             setText(null);
//           }}
//           placeholder="Enter course code"
//           style={styles.input}
//           value={text}
//         />
//       </View>
//       <ScrollView style={styles.listArea}>
//         <Courses
//           done={false}
//           ref={todo => (_todo = todo)}
//           // onPressCourse={id =>
//           //   db.transaction(
//           //     tx => {
//           //       tx.executeSql(`update Course set done = 1 where id = ?;`, [
//           //         id
//           //       ]);
//           //     },
//           //     null,
//           //     update
//           //   )
//           // }
//         />
//         {/* <Courses
//           done
//           ref={done => (_done = done)}
//           onPressCourse={code =>
//             db.transaction(
//               tx => {
//                 tx.executeSql(`delete from Course where code = ?;`, [code]);
//               },
//               null,
//               update
//             )
//           }
//         /> */}
//       </ScrollView>
//     </View>
//   );

// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     flex: 1,
//     paddingTop: Constants.statusBarHeight
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   flexRow: {
//     flexDirection: "row"
//   },
//   input: {
//     borderColor: "#4630eb",
//     borderRadius: 4,
//     borderWidth: 1,
//     flex: 1,
//     height: 48,
//     margin: 16,
//     padding: 8
//   },
//   listArea: {
//     backgroundColor: "#f0f0f0",
//     flex: 1,
//     paddingTop: 16
//   },
//   sectionContainer: {
//     marginBottom: 16,
//     marginHorizontal: 16
//   },
//   sectionHeading: {
//     fontSize: 18,
//     marginBottom: 8
//   }
// });