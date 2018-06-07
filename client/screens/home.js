import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Instagram',
      headerRight: (
        <Button
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate('Auth');
          }} 
          title="Signout"
          color="red"
        />
      ),
    };
  };

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
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView>
            {this.renderPosts()}
          </ScrollView>
        </View>
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
  console.log('스토어의 state',state.posts);
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  }
});
