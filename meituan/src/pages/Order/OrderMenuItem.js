import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import Heading3 from '../../components/Text/Heading3';
import Screen from '../../common/Screen';

class OrderMenuItem extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Image
          source={this.props.icon}
          resizeMode="contain"
          style={styles.icon}
        />
        <Heading3>{this.props.title}</Heading3>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Screen.width / 4,
    height: Screen.width / 5,
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
  },
});

export default OrderMenuItem;
