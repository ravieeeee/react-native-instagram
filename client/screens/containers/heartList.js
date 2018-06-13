import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { fetchLikeLogs } from '../../actions/posts';
import HeartCard from '../components/heartCard';


class HeartList extends Component {
  componentWillMount() {
    this.props.fetchLikeLogs();
  }

  renderLogs() {
    if (this.props.likelogs) {
      return this.props.likelogs.map((likelog, idx) => {
        return (
          <HeartCard
            key={idx}
            likelog={likelog} />
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

function mapStateToProps(state) {
  return { likelogs: state.likelogs };
}

export default connect(mapStateToProps, { fetchLikeLogs })(HeartList);