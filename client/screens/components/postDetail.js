import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Text } from 'react-native-elements';
import moment from 'moment';

export default class PostDetail extends Component {
  constructor(props){
    super(props);
    console.log(this.props.navigation.state.params.post);

    this.state = {
      title: this.props.navigation.state.params.post.title,
      image: this.props.navigation.state.params.post.image,
      createdAt: moment(this.props.navigation.state.params.post.createdAt).format('YYYY-MM-DD'),
      heart: this.props.navigation.state.params.post.heart,
      user_name: this.props.navigation.state.params.post.user_name,
      content: this.props.navigation.state.params.post.content,
    }
  }

  render() {
    return (
      <View>
        <Text h4 style={styles.title}>{this.state.title}</Text>
        <Image
          source={{uri: this.state.image}}
          style={styles.img} />
        <Text style={styles.date}>{this.state.createdAt}</Text>
        <Text style={styles.heart}>좋아요 {this.state.heart}개</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>
            {this.state.user_name}&nbsp;
          </Text>
          <Text>{this.state.content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    marginTop: 10,
  },
  img: {
    marginTop: 10,
    marginBottom: 10,
    width: 400, 
    height: 200
  },
  date: {
    marginLeft: 10,
  },
  heart: {
    marginLeft: 10,
  }
});