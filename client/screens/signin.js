import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Platform, 
  StatusBar,
  Text
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
      <View style={styles.container}>
        { 
          this.state.fontLoaded ? (
            <Text style = {styles.titleText}>
              Instagram
            </Text>
          ) : null
        }
        
        <TextInput 
          placeholder="Username" 
          style={styles.input}
          onChangeText={(username) => this.setState({ username })}
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize='none'
          value={this.state.username} />
          
        <TextInput 
          placeholder="Password" 
          style={styles.input}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true} />

        <View style={{ flexDirection: 'row' }}>
          <Button 
            title="Sign in" 
            onPress={() => {
              this.props.signin(this.state.username, this.state.password);
            }} 
            disabled={!this.state.username || !this.state.password }
            style={styles.button} />
          <View style={{ margin: 5}} />
          <Button 
            title="Sign up" 
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }} 
            style={styles.button} />
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
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  },
  titleText: {
    fontFamily: 'pacifico-regular',
    fontSize: 60,
    marginTop: 50, 
    marginBottom: 30,
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
