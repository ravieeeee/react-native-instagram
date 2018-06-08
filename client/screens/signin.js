import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';

import { signin } from '../actions/users';


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text h1 style={{marginBottom: 30}}>Instagram</Text>

        <TextInput placeholder="Username" style={styles.input}
          onChangeText={(username) => this.setState({ username })}
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize='none'
          value={this.state.username} />
        <TextInput placeholder="Password" style={styles.input}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true} />
        <View style={{ flexDirection: 'row' }}>
          <Button title="Sign in" onPress={() => {
            this.props.signin(this.state.username, this.state.password);
          }} disabled={!this.state.username || !this.state.password }
            style={styles.button} />
          <View style={{ margin: 5}} />
          <Button title="Sign up" onPress={() => {
            this.props.navigation.navigate('SignUp');
          }} style={styles.button} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginRight: 20,
  },
  input: {
    alignSelf: "stretch",
    height: 40,
    margin: 20,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'royalblue',
    padding: 5
  }
});

export default connect(null, { signin })(SignInScreen);
