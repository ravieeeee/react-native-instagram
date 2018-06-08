import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchMyPosts } from '../actions/posts';
import UserInfo from './containers/userInfo';


class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  componentDidMount() {
    this.props.fetchMyPosts();
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
      <View>
        <UserInfo />
        <ScrollView>
          {this.renderPosts()}
        </ScrollView>
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

function mapStateToProps(state) {
  return { posts: state.myPosts };
}

export default connect(mapStateToProps, { fetchMyPosts })(ProfileScreen);

const styles = StyleSheet.create({

});