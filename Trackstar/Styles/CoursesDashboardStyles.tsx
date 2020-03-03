import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    buttonContentStyle: {
        
        display: "flex",
        width: "100%",        
        justifyContent: "center",
        alignItems: "center",
      },
        content: {
          flex: 1, 
          marginLeft: 20
        },
        container: {
          shadowColor: 'rgba(0,0,0,1)',
          shadowOffset: { height: 0, width: 0 },
          shadowOpacity: 1, //default is 1
          shadowRadius: 1, //default is 1
          width: 320,
          marginBottom: 15
        },
        headingText: {
          fontSize: 30
        },
        titleText: {
          fontSize: 24,
          display: 'flex',
          alignContent: 'flex-start'
        },
        paragraphText: {
          fontSize: 18
        },
        dashboardText: {
          fontSize: 30,
          fontWeight: "900",
          marginLeft: 15,
          textAlignVertical: "center",
        },
        dashboardRowOne:{
          flexDirection: "row",
          height:100
        },
        switchText: {
          textAlignVertical: "center",
        },

      });
      export default Styles;