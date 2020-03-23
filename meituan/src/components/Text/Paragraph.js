import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Color from '../../common/Color';

class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Text style={[styles.p, this.props.style]}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  p: {
    fontSize: 13,
    color: '#777777',
  },
});

export default Paragraph;
