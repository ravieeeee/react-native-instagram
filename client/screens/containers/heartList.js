import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements';

import { fetchLikeLogs } from '../../actions/posts';


class HeartList extends Component {
  componentWillMount() {
    this.props.fetchLikeLogs();
  }

  renderLogs() {
    if (this.props.likelogs) {
      return this.props.likelogs.map((likelog, idx) => {
        return (
          <View key={idx} style={styles.root}>
            <Text style={styles.txts}>
              <Text style={styles.tb}>
                {likelog.like_name}
              </Text>
              <Text>
                님이 회원님의 게시물을 좋아합니다.
              </Text>
            </Text>
            <Avatar
              large
              source={{uri: likelog.img}} />
          </View>
        );
      });
    }
  }

  render() {
    return (
      <ScrollView>
        {this.renderLogs()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginTop: 15,
    backgroundColor: '#ededed',
  },
  txts: {
    marginTop: 30,
  },
  tb: {
    fontWeight: 'bold',
  }
});

function mapStateToProps(state) {
  return { likelogs: state.likelogs };
}

export default connect(mapStateToProps, {fetchLikeLogs})(HeartList);

