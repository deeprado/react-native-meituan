import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Color from '../../common/Color';

class Heading3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Text style={[styles.h3, this.props.style]}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  h3: {
    fontSize: 14,
    color: '#222222',
  },
});

export default Heading3;
