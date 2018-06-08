import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import HeartList from './containers/heartList';


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

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});