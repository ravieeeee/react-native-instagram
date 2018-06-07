import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import { addPost } from '../actions/posts';


class WriteScreen extends Component {
  static navigationOptions = {
    title: 'Write',
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
  }

  onKeyPress = () => {
    Alert.alert(
      '확인',
      '이 게시글을 등록하시겠습니까?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          console.log('OK Pressed');
          this.props.addPost(this.state.title, this.state.content);
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View>
        <FormLabel>Title</FormLabel>
        <TextInput
          style={ styles.titleInputStyle }
          placeholder="Type here to translate!"
          onChangeText={(title) => this.setState({title})}
        />
        <FormLabel>Content</FormLabel>
        <TextInput
          style={ styles.contentInputStyle }
          blurOnSubmit={true}
          multiline={true}
          placeholder="Type here to translate!"
          onChangeText={(content) => this.setState({content})}
          onSubmitEditing={this.onKeyPress}
        />
      </View>
    );
  }
}

export default connect(null, { addPost })(WriteScreen);

const styles = StyleSheet.create({
  titleInputStyle: {
    backgroundColor: "#fff",
    height: 40,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10
  },
  contentInputStyle: {
    backgroundColor: "#fff",
    height: 100,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10
  }
});
