import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-elements'
import { connect } from 'react-redux';
import moment from 'moment';


class UserInfo extends Component {
  render() {
    if (this.props.currentUser) {
      return (
        <View style={styles.root}>
          <Avatar
            large
            rounded
            icon={{name: 'md-person', type: 'ionicon'}}
            overlayContainerStyle={{marginLeft: 10, marginTop: 10}} />
          <View style={styles.info}>
            <Text h4>{this.props.currentUser.username}</Text>
            <Text>{moment(this.props.currentUser.createdAt).format('YYYY-MM-DD')} 가입</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, { })(UserInfo);