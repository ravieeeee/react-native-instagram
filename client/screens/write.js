import React, { Component } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  Alert, 
  Button,
  ActivityIndicator
} from 'react-native';
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
      content: '',
      isLoading: false,
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
          this.setState({isLoading: true});
        }},
      ],
      { cancelable: false }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.posts != nextProps.posts) {
      this.setState({isLoading: false});
    }
  }

  render() {
    return (
      <View 
        style={styles.root}
        pointerEvents={this.state.isLoading ? 'none' : 'auto'}>
        
        {
          this.state.isLoading ? (
            <ActivityIndicator
              size="large" 
              color="#0000ff"
              style={{alignItems: 'center', justifyContent: 'center'}}>
            </ActivityIndicator>
          ) : null
        }

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
            onChangeText={(content) => this.setState({content})} />
        </View>

        <Button
          style={styles.button}
          title="Submit" 
          onPress={() => {this.onKeyPress()}} 
          disabled={!this.state.title || !this.state.content} />
      </View>
    );
  }
}

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

function mapStateToProps(state) {
  return { posts: state.myPosts };
}

export default connect(mapStateToProps, {addPost})(WriteScreen);
