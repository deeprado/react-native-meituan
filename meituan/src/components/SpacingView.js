import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Color from '../common/Color';

class SpacingView extends Component {
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    height: 14,
    backgroundColor: Color.paper,
  },
});

export default SpacingView;
