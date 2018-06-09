import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  Image
} from 'react-native';

import PostCard from './containers/cardList';


class LogoTitle extends Component {
  render() {
    return (
      <Image
        source={require('../public/logo.png')}
        style={{ width: 100, height: 30, marginLeft: 10 }}/>
    );
  }
}

export default class HomeScreen extends Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <PostCard />
        </View>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  }
});
