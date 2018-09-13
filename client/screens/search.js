import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import SearchBar from '@containers/searchBar';
import PostCard from '@components/postCard';

const renderCount = 0;


class SearchScreen extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    var warnMsg = renderCount === 1 ? (
      null
    ) : (
      <Text>검색 결과가 없습니다.</Text>
    );

    var searchResult = this.props.searched.length > 0 ? (
      this.props.searched.map(post => {
        return (
          <PostCard
            key={post.id} 
            post={post}
            purpose='search' />
        );
      })
    ) : (
      warnMsg
    );

    return (
      <View style={styles.container}>
        <SearchBar />
        <ScrollView>
          {searchResult}
        </ScrollView>
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

function mapStateToProps(state) {
  if (renderCount < 2) {
    renderCount++;
  } 
  return { searched: state.searched };
}

export default connect(mapStateToProps, { })(SearchScreen);