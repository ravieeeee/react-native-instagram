import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/posts';


class PostCard extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    if (this.props.posts) {
      return this.props.posts.map(post => {
        return (
          <Card
            title={post.title}
            image={{uri: post.image}}
            key={post.id}>
              <Text style={{ fontWeight: 'bold' }}>
                좋아요 {post.heart}개
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {post.name}&nbsp;
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  {post.content}
                </Text>
              </View>
          </Card>
        );
      });
    }
    
  }

  render() {    
    return (
      <ScrollView>
        {this.renderPosts()}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostCard);