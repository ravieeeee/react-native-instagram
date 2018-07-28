import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { Font } from 'expo';

import CardList from './containers/cardList';


class LogoTitle extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'pacifico-regular': require('../assets/fonts/pacifico-regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
        this.state.fontLoaded ? (
          <Text style={styles.titleText}>
            Instagram
          </Text>
        ) : null
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
        <CardList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  },
  titleText: {
    fontFamily: 'pacifico-regular',
    fontSize: 20,
    textAlign: 'center',
    flex: 1
  }
});
