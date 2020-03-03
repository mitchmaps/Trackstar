import React from 'react';
import { Text, View } from 'react-native';

import GradesForm from '../components/GradesForm';

// TO DO:
// error detection
//  - non-numerical/empty values
//  - not adding up to 100
//  - skipping rows
// auto-population
const GradesScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginTop: 50}}>
        <GradesForm />
      </View>
    );
};

export default GradesScreen;