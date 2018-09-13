import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';

import { fetchSearched } from '@actions/posts';

var searchText = undefined;

class SearchBarC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  renderPost = () => {
    searchText = this.state.text;
    this.props.fetchSearched(searchText);
    this.setState({text: ''});
  }

  render() {
    return (
      <SearchBar
        lightTheme
        onChangeText={(text) => this.setState({text})}
        onSubmitEditing={this.renderPost}
        icon={{ type: 'font-awesome', name: 'search' }}
        placeholder='Type Here...' />
    );
  }
}

export default connect(null, { fetchSearched })(SearchBarC);