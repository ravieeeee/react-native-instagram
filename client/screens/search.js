import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

// TODO: Card만 따로 빼자
// import Post from './Post';

var searchText = undefined;


export default class SearchScreen extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  renderPost = () => {
    searchText = this.state.text;
    console.log('searchText : ' + searchText);
    this.setState({text: ''});
  }

  render() {
    console.log(this.state.text);
    var searchResult = null;
    // var searchResult = searchText ? (
    //   <Post />
    // ) : (
    //   null
    // );

    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={this.renderPost}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Type Here...' />

          {searchResult}
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
