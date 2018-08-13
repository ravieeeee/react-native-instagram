import React, { Component } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View,
  Alert,
  Button,
  ActivityIndicator,
  Image,
  Text
} from 'react-native';
import { FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import { ImagePicker, Permissions } from 'expo';

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
      image: null,
      imageUploaded: false,
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
          this.props.addPost(this.state.title, this.state.content, this.state.image);
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

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    console.log("pickerResult.uri : " + pickerResult.uri);
    console.log("pickerResult.cancelled : " + pickerResult.cancelled);
    let uploadResponse, uploadResult;

    try {
      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        this.setState({
          image: uploadResult.location,
          imageUploaded: true
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('업로드 실패 :(');
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View>
        <View>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text>
          {image}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View 
        style={styles.root}
        pointerEvents={this.state.isLoading ? 'none' : 'auto'}>
        
        {
          this.state.isLoading ? 
          (
            <ActivityIndicator
              size="large" 
              color="#0000ff"
              style={{alignItems: 'center', justifyContent: 'center'}}>
            </ActivityIndicator>
          ) : null
        }
        
        <Button
          onPress={this._pickImage}
          title="Pick an image" />
        {this._maybeRenderImage()}

        <View>
          <FormLabel>Title</FormLabel>
          <TextInput
            style={styles.titleInputStyle}
            onChangeText={(title) => this.setState({title})} />
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

async function uploadImageAsync(uri) {
  let apiUrl = 'http://10.0.2.2:3000/posts/';

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
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
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
});

function mapStateToProps(state) {
  return { posts: state.myPosts };
}

export default connect(mapStateToProps, {addPost})(WriteScreen);
