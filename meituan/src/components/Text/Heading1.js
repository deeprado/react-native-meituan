import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Color from '../../common/Color';

class Heading1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Text style={[styles.h1, this.props.style]}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    color: Color.primary,
  },
});

export default Heading1;
