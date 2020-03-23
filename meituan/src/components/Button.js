import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onPress: () => {},
      disabled: false,
      activeOpacity: 0.8,
    };
  }

  render() {
    let {style, titleStyle, title} = this.props;
    let {onPress, disabled, activeOpacity} = this.state;
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={activeOpacity}>
        <Text style={titleStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
