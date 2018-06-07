import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements'
import PostCard from './containers/card';


export default class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Instagram',
      headerRight: (
        <Button
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate('Auth');
          }} 
          title="Signout"
          color="red"
        />
      ),
    };
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
