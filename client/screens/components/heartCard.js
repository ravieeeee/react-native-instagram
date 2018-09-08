import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

export default ({likelog}) => (
  <View style={styles.root}>
    <Text style={styles.txts}>
      <Text style={styles.tb}>
        {likelog.liker_name}
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

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginTop: 15,
  },
  txts: {
    marginTop: 30,
  },
  tb: {
    fontWeight: 'bold',
  }
});