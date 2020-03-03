import React from 'react';
import { Text, View } from 'react-native';

import GradesForm from '../components/GradesForm';

const GradesScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View>
        <GradesForm />
      </View>
    );
};

export default GradesScreen;