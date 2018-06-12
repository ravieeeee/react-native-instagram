import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


export default class PostCard extends Component {
  render() {
    const post = this.props.post;
    const idx = this.props.idx;

    switch (this.props.purpose) {
      case 'search':
        return (
          <Card
            title={post.title}
            image={{uri: post.image}}>
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
      case 'list':
        return (
          <Card
            title={post.title}
            image={{uri: post.image}}>
              <TouchableHighlight onPress={() => {this.props.onPress(idx, post.id, post.image, post.user_id)}} underlayColor={'#fff'}>
                <Ionicons name={'md-heart'} color={this.props.isColor === true ? 'red' : 'black'} size={25} />
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
    }
  }
}
