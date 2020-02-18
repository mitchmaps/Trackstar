import React from 'react';
import Styles from './Styles';

import { Alert, Text, View } from 'react-native';

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/src/styles/colors';
import { iOSUIKit } from 'react-native-typography';

export class HomeDashboard extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    const MyComponent = (props) => (

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


      } style = {[{backgroundColor: props.color}, Styles.container]}>
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
          <Button onPress={() => Alert.alert(
          
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
    return (
      <View style = {Styles.content }>
        
        <Text style={Styles.dashboardText}>
            Dashboard
        </Text>

        

        
        
        <MyComponent 
          title= "Task Title"
          Duration="Estimated Duration"
          DueDate="Due Date" 
          color = '#FFFFFF'
          />

        
        <MyComponent 
          title= "Read 3004 Chapter 6"
          Duration="Duration : 2 hours"
          DueDate= "Due Date: 2020/03/01" 
          color = '#FF99CC'
        />
        <MyComponent 
          title= "Finish 2804 A2"
          Duration="Duration : 2 hours"
          DueDate="Due Date: 2020/03/11" 
          color = '#FF9933'
        />
      </View>
      
    );
  }
}