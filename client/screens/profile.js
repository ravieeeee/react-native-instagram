import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchMyPosts } from '../actions/posts';
import UserInfo from './containers/userInfo';


class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerRight: (
        <Button
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate('Auth');
          }} 
          title="SignOut"
          backgroundColor='red'
          borderRadius={15}
          fontWeight='bold'
        />
      ),
    };
  };

  componentWillMount() {
    this.props.fetchMyPosts();
  }

  renderPosts() {
    if (this.props.posts) {
      return this.props.posts.map(post => {
        return (
          <TouchableHighlight 
            onPress={() => this.props.navigation.navigate('PostDetail', {post})} 
            underlayColor={'#fff'}
            key={post.id}
            style={{marginRight: 1}}>
            <Image
              style={{width:110, height: 110}}
              source={{uri: post.image}} />
          </TouchableHighlight>     
        );
      });
    }
  }

  render() {
    return (
      <ScrollView >
        <UserInfo />
        <View style={styles.posts}>
          {this.renderPosts()}
        </View>
      </ScrollView>
    );
  }

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
  posts: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center',
    marginTop: 15,
  }
});