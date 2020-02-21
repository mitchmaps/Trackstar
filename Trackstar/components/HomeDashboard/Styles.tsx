import { StyleSheet } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import { startClock } from 'react-native-reanimated';

export default StyleSheet.create({
  content: {
    flex: 1, 
    marginLeft: 20
  },
  container: {
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1, //default is 1
    shadowRadius: 1, //default is 1
    width: 200,
    marginTop: 10,
    marginBottom: 10
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
    fontWeight: "900",
    marginLeft: 15,
    marginTop: 10,
    marginBottom: -10,
    textAlignVertical: "center",
    
  },
  dashboardRowOne:{
    flexDirection: "row",
    height:100
    
  }
});