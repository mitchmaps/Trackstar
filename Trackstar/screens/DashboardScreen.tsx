import React from 'react';
import Styles from '../Styles/DashboardStyles';

import { ScrollView, Alert, Text, View } from 'react-native';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';
// import { iOSUIKit } from 'react-native-typography';

const HomeScreen = (props) => {

  return(

    <ScrollView style = {Styles.content }>

    <View style={Styles.dashboardRowOne}>
      <Text style={Styles.dashboardText}>
          Dashboard
      </Text>
      <LegendComponent />
    </View>

    <CourseComponent
      title= "Task Title"
      Duration="Estimated Duration"
      DueDate="Due Date"
      color = '#FFFFFF'
      />

    <CourseComponent
      title= "Read 3004 Ch. 6"
      Duration="Duration : 2 hours"
      DueDate= "Due Date: 2020/03/01"
      color = '#FF99CC'
    />
    <CourseComponent
      title= "Work on 3008 D4"
      Duration="Duration : 2 hours"
      DueDate="Due Date: 2020/03/11"
      color = '#FF9933'
    />
    <CourseComponent
      title= "Finish 2804 A2"
      Duration="Duration : 1 hours"
      DueDate="Due Date: 2020/03/11"
      color = '#99FF33'
    />
    <CourseComponent
      title= "Study 2804 Final"
      Duration="Duration : 6 hours"
      DueDate="Due Date: 2020/04/11"
      color = '#99FF33'
    />
    <CourseComponent
      title= "Study 3008 Final"
      Duration="Duration : 5 hours"
      DueDate="Due Date: 2020/04/21"
      color = '#FF9933'
    />
    <CourseComponent
      title= "Study 3004 Final"
      Duration="Duration : 2 hours"
      DueDate= "Due Date: 2020/04/23"
      color = '#FF99CC'
    />
  </ScrollView>
  );
};

  const CourseComponent = (props) => (
    <Card onPress  ={ () =>
      {
        return Alert.alert('Task Title', '\nEstimated Duration' +
          '\nDue Date' +
          '\nCourse Code' +
          '\nWeighting' +
          '\nPriority Score', [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ], { cancelable: false });
      }
    }
    style = {[{backgroundColor: props.color}, Styles.container]}>

      <Card.Content>
        <View>
          <Title>{props.title}</Title>
          <Paragraph style={Styles.paragraphText}>{props.Duration}</Paragraph>
          <Paragraph style={Styles.paragraphText}>
            {props.DueDate}
          </Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button style={{marginVertical: -10}} onPress={() => Alert.alert(

        'Edit Page',
        'Options for Editing',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: () => console.log('OK Pressed!')},
        ],
        { cancelable: false }
      )}>Edit</Button>
      </Card.Actions>
    </Card>
  );


    const LegendComponent = () => (
      <Card style={{elevation:0, shadowOpacity:0, marginLeft:45, borderRadius: 50, marginTop:30}}>
        <Card.Content>
          <View style = {{flex: -1, flexDirection: "row"}}>
            <Avatar.Icon size={18} icon="circle" color='#FF99CC' />
            <Text>  COMP 3004</Text>
          </View>
          <View style = {{flex: -2, flexDirection: "row"}}>
            <Avatar.Icon size={18} icon="circle" color='#FF9933' />
            <Text>  COMP 3008</Text>
          </View>
          <View style = {{flex: 0, flexDirection: "row"}}>
            <Avatar.Icon size={18} icon="circle" color='#99FF33' />
            <Text>  COMP 2804</Text>
          </View>
        </Card.Content>
      </Card>
    );

export default HomeScreen;