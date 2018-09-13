import React, { Component } from 'react';

import PostCard from '@components/postCard';


export default class PostDetail extends Component {
  render() {
    const post = this.props.navigation.state.params.post;
    return (
      <PostCard
        key={post.id} 
        post={post}
        purpose='detail' />
    );
  }
}