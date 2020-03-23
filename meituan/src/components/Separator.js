import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Screen from '../common/Screen';
import Color from '../common/Color';

class Separator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={[styles.line, this.props.style]} />;
  }
}

const styles = StyleSheet.create({
  line: {
    width: Screen.width,
    height: Screen.onePixel,
    backgroundColor: Color.border,
  },
});

export default Separator;
