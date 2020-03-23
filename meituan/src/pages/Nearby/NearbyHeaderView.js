import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import Paragraph from '../../components/Text/Paragraph';

import Screen from '../../common/Screen';
import Color from '../../common/Color';

class NearbyHeaderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelected: props.onSelected ? props.onSelected : () => {},
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.titles.map((title, i) => (
          <TouchableOpacity
            key={i}
            style={[
              {
                backgroundColor:
                  this.props.selectedIndex == i ? '#FE566D' : 'white',
              },
              styles.item,
            ]}
            onPress={() => this.state.onSelected(i)}>
            <Paragraph
              style={{
                color: this.props.selectedIndex == i ? 'white' : '#555555',
              }}>
              {title}
            </Paragraph>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: Screen.width / 4 - 10,
    marginLeft: 8,
    marginTop: 5,
    marginBottom: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: Screen.onePixel,
    borderColor: Color.border,
  },
});

export default NearbyHeaderView;
