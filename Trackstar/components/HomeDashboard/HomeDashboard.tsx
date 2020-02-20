import React from 'react';

import { Text, View } from 'react-native';
import Styles from './Styles';
import Database from '../../Database';
const db = new Database();

export class HomeDashboard extends React.Component {
  render() {
    return (
      <View style={Styles.content}>
        <Text>Home dashboard!</Text>
      </View>
    );
  }
}