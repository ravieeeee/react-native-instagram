import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, Button } from 'react-native';
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
      <View style={styles.root}>
        <View>
          <FormLabel>Title</FormLabel>
          <TextInput
            style={styles.titleInputStyle}
            onChangeText={(title) => this.setState({title})}
          />
        </View>
        <View>
          <FormLabel>Content</FormLabel>
          <TextInput
            style={styles.contentInputStyle}
            multiline={true}
            onChangeText={(content) => this.setState({content})}
          />
        </View>
        <Button title="Submit" onPress={() => {
          this.onKeyPress()
        }} disabled={!this.state.title || !this.state.content }
          style={styles.button}/>
      </View>
    );
  }
}

export default connect(null, { addPost })(WriteScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 5,
  },
});
