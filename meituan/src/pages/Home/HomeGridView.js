import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import Screen from '../../common/Screen';
import Color from '../../common/Color';

import HomeGridItem from './HomeGridItem';

class HomeGridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: props.infos ? props.infos : [],
    };
  }

  render() {
    let {infos} = this.state;
    return (
      <View style={styles.container}>
        {infos.map((info, index) => (
          <HomeGridItem
            info={info}
            key={index}
            onPress={() => {
              this.props.onGridSelected(index);
            }}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopWidth: Screen.onePixel,
    borderLeftWidth: Screen.onePixel,
    borderColor: Color.border,
  },
});

export default HomeGridView;
