import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';

import { signin } from '../actions/users';


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      username: '',
      password: ''
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'pacifico-regular': require('../assets/fonts/pacifico-regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        { 
          this.state.fontLoaded ? (
            <Text style = {styles.titleText}>
              Instagram
            </Text>
          ) : null
        }

        <TextInput
          style={styles.input}
          placeholder='Username'
          onChangeText={(username) => this.setState({ username })}
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='next'
          onSubmitEditing={() => { this.secondTextInput.focus(); }}
          blurOnSubmit={false}
          value={this.state.username} />
            
        <TextInput
          style={styles.input}
          ref={(input) => { this.secondTextInput = input; }}
          placeholder='Password'
          onChangeText={(password) => this.setState({ password })}
          autoCapitalize='none'
          secureTextEntry={true}
          value={this.state.password}
          returnKeyType='send'
          onSubmitEditing={() => {
            this.props.signin(this.state.username, this.state.password);
          }} />
      
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={styles.button}
            title="Sign in" 
            onPress={() => {
              this.props.signin(this.state.username, this.state.password);
            }} 
            disabled={!this.state.username || !this.state.password } />
          <View style={{ margin: 5}} />
          <Button
            style={styles.button}
            title="Sign up" 
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  titleText: {
    fontFamily: 'pacifico-regular',
    fontSize: 60,
  },
  button: {
    marginRight: 20,
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    margin: 20,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 15,
    borderWidth: 1,
    padding: 5,
  }
});

export default connect(null, { signin })(SignInScreen);
