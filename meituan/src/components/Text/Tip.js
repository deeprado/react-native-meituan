import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Color from '../../common/Color';

class Tip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Text style={[styles.tip, this.props.style]}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  tip: {
    fontSize: 13,
    color: '#999999',
  },
});

export default Tip;
