import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Color from '../../common/Color';

class Heading2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Text style={[styles.h2, this.props.style]}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  h2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
  },
});

export default Heading2;
