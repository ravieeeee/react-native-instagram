import React from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default ({purpose, post, idx, onPress, isColor}) => {
  return (
    <Card
      title={post.title}
      image={{uri: post.image}}>
        {(() => {
          if (purpose === 'list') {
            return (
              <TouchableHighlight onPress={() => {onPress(idx, post.id, post.image, post.user_id)}} underlayColor={'#fff'}>
                <Ionicons name={'md-heart'} color={isColor === true ? 'red' : 'black'} size={25} />
              </TouchableHighlight>
            );
          }
        })()}
        <Text style={{ fontWeight: 'bold' }}>
          좋아요 {post.heart}개
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold' }}>
            {post.user_name}&nbsp;
          </Text>
          <Text style={{ marginBottom: 10 }}>
            {post.content}
          </Text>
        </View>
    </Card>
  );
}