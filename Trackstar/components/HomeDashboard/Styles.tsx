import { StyleSheet } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import { startClock } from 'react-native-reanimated';

export default StyleSheet.create({
  content: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 20
  },
  container: {
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1, //default is 1
    shadowRadius: 1, //default is 1
    width: 220,
    marginTop: 20
  },
  headingText: {
    fontSize: 30
  },
  titleText: {
    fontSize: 20,
    display: 'flex',
    alignContent: 'flex-start'
  },
  paragraphText: {
    fontSize: 16
  },
  dashboardText: {
    fontSize: 30,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: -10
  }
});