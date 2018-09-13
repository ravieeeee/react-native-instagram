import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import HeartList from '@containers/heartList';


export default class HeartScreen extends Component {
  static navigationOptions = {
    title: 'Heart',
  };

  render() {
    return (
      <View style={styles.container}>
        <HeartList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});