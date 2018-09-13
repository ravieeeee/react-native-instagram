import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { fetchPosts, like, fetchOthersLikeLogs } from '@actions/posts';
import PostCard from '@components/postCard';


class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: [],
    }

    this.props.fetchPosts();
  }

  componentWillMount() {
    this.props.fetchOthersLikeLogs();
  }

  onPress = (idx, post_id, img, user_id) => {
    if (!this.state.likes.includes(post_id) && !this.props.alreadyLikes.includes(post_id)) {
      this.setState({likes: this.state.likes.concat(post_id)});
      this.props.like(post_id, idx, img, user_id);
    }
  }

  renderPosts() {
    if (this.props.posts && this.props.alreadyLikes) {
      return this.props.posts.map((post, idx) => {
        return (
          <PostCard
            purpose='list'
            key={post.id} 
            post={post} 
            onPress={this.onPress} 
            idx={idx}
            isColor={this.state.likes.includes(post.id) 
              || this.props.alreadyLikes.includes(post.id)} />
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
  const pid = [];
  
  state.otherlikelogs.map(log => {
    pid.push(log.post_id);
  });

  return { posts: state.posts, alreadyLikes: pid };
}

export default connect(mapStateToProps, { fetchPosts, like, fetchOthersLikeLogs })(CardList);