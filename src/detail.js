import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';

class DetailScreen extends Component {
  render() {
    const picture = this.props.navigation.state.params;

    return (
         <View>
          <Image
          style={{width: 350, height: 350}}
          source={{uri: picture}}
        />
        </View>
    );
  }
}

export default DetailScreen;