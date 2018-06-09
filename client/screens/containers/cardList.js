import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { fetchPosts, like } from '../../actions/posts';


class PostCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: [],
    }
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  onPress = (idx, post_id, img, user_id) => {
    if (!this.state.likes.includes(idx)) {
      this.setState({likes: this.state.likes.concat(idx)});
      this.props.like(post_id, idx, img, user_id);
    }
  }

  renderPosts() {
    if (this.props.posts) {
      return this.props.posts.map((post, idx) => {
        return (
          <Card
            title={post.title}
            image={{uri: post.image}}
            key={post.id}>
              <TouchableHighlight onPress={() => this.onPress(idx, post.id, post.image, post.user_id)} underlayColor={'#fff'}>
                <Ionicons name={'md-heart'} color={this.state.likes.includes(idx) === true ? 'red' : 'black'} size={25} />
              </TouchableHighlight>
              <Text style={{ fontWeight: 'bold' }}>
                좋아요 {post.heart}개
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {post.user_name}&nbsp;
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

export default connect(mapStateToProps, { fetchPosts, like })(PostCard);