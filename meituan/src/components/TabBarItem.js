import React, {Component} from 'react';
import {Image} from 'react-native';

class TabBarItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let selectedImage = this.props.selectedImage
      ? this.props.selectedImage
      : this.props.normalImage;

    return (
      <Image
        source={this.props.focused ? selectedImage : this.props.normalImage}
        style={{tintColor: this.props.tintColor, width: 21, height: 21}}
      />
    );
  }
}

export default TabBarItem;
