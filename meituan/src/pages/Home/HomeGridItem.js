import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Heading2 from '../../components/Text/Heading2';
import Heading3 from '../../components/Text/Heading3';

import Screen from '../../common/Screen';
import Color from '../../common/Color';

class HomeGridItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let info = this.props.info;

    let title = info.maintitle;
    let color = info.typeface_Color;
    let subtitle = info.deputytitle;
    let imageUrl = info.imageurl.replace('w.h', '120.0');

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.onPress();
        }}>
        <View>
          <Heading2 style={{color: color, marginBottom: 10}}>{title}</Heading2>
          <Heading3>{subtitle}</Heading3>
        </View>

        <Image style={styles.icon} source={{uri: imageUrl}} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Screen.width / 2 - Screen.onePixel,
    height: Screen.width / 4,
    backgroundColor: 'white',
    borderBottomWidth: Screen.onePixel,
    borderRightWidth: Screen.onePixel,
    borderColor: Color.border,
  },
  icon: {
    width: Screen.width / 5,
    height: Screen.width / 5,
  },
});

export default HomeGridItem;
