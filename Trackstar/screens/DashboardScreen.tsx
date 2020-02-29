import React from 'react';
import Styles from '../Styles/DashboardStyles';
import { Text, View, Image, TouchableOpacity, SectionList, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';

import {mockData} from "../mockData"

// import { iOSUIKit } from 'react-native-typography';
// const sectionHeader = (data) => {
//   const section = data.section
//   return (
//     <View style={styles.sectionHeader}>
//       <Text style={styles.sectionHeaderText}>{section.time}</Text>
//     </View>
//   );
// };

const HomeScreen = (props) => {
  const navigation = props.navigation;

  const singleItem = (data) => {
    const item = data.item
    return (
      // <TouchableOpacity onPress={() => {navigation.navigate("Details", {talkData: item})}}>
      //   <View style={styles.singleItem}>
      //     <Text>{item.title}</Text>
      //   </View>
      // </TouchableOpacity>
      // <View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch'}}>

      // TO DO: align checkbox properly
      <Card style={{width: 350, marginBottom: 10}}>
          <Card.Title title={item.title}/>
          <Card.Content style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{flex: 8}}>{item.course}</Text>
            <CircleCheckBox
              style={{flex: 2}}
              checked={item.title == "1. Read Chapter 3" ? true : false}
              outerColor = {'#5273eb'}
              innerColor = {'#5273eb'}
              onToggle={(checked) => console.log('My state is: ', checked)}
            />
          </Card.Content>
      </Card>
    );
  };

  return(
    <LinearGradient
      colors={['#bcf7ed', '#5273eb']}
      style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}
    >
      <View style={{flexDirection: 'column', marginTop: 100}}>
        <Text style={{fontSize: 45, color: "white", textAlign: "center"}}>Welcome Back!</Text>
        <Text style={{fontSize: 15, color: "white", textAlign: "center"}}>Next Evaluation: COMP 3008 Project 2</Text>
        <Text style={{fontSize: 15, color: "white", textAlign: "center"}}>Due March 28th</Text>
      </View>
      {/* TO DO: figure out how to raise this section */}
      <SectionList
        style={{marginTop: 50}}
        sections={mockData}
        renderItem={singleItem}
      />
    </LinearGradient>
  );
};

// TO DO: abstract styles into stylesheets

export default HomeScreen;