import React from 'react';

import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';

class PageControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPages: props.numberOfPages ? props.numberOfPages : 0,
      currentPage: props.currentPage ? props.currentPage : 0,
      hidesForSinglePage: props.hidesForSinglePage
        ? props.hidesForSinglePage
        : false,
      pageIndicatorTintColor: props.pageIndicatorTintColor
        ? props.pageIndicatorTintColor
        : 'gray',
      currentPageIndicatorTintColor: props.currentPageIndicatorTintColor
        ? props.currentPageIndicatorTintColor
        : 'white',
      indicatorSize: props.indicatorSize
        ? props.indicatorSize
        : {width: 8, height: 8},
      indicatorStyle: props.indicatorStyle ? props.indicatorStyle : {},
      currentIndicatorStyle: props.currentIndicatorStyle
        ? props.currentIndicatorStyle
        : {},
      onPageIndicatorPress: props.onPageIndicatorPress
        ? props.onPageIndicatorPress
        : function() {},
    };
  }

  onPageIndicatorPress(idx) {
    this.state.onPageIndicatorPress(idx);
  }

  render() {
    let {style} = this.props;
    let {
      indicatorStyle,
      indicatorSize,
      currentIndicatorStyle,
      currentPageIndicatorTintColor,
      pageIndicatorTintColor,
    } = this.state;

    const defaultStyle = {
      height: indicatorSize.height,
    };

    const indicatorItemStyle = {
      width: indicatorSize.width,
      height: indicatorSize.height,
      borderRadius: indicatorSize.height / 2,
      marginLeft: 5,
      marginRight: 5,
    };

    let newIndicatorStyle = {
      ...indicatorItemStyle,
      ...indicatorStyle,
      ...{
        backgroundColor: pageIndicatorTintColor,
      },
    };

    let newCurrentIndicatorStyle = {
      ...indicatorItemStyle,
      ...currentIndicatorStyle,
      ...{
        backgroundColor: currentPageIndicatorTintColor,
      },
    };

    let pages = [];
    for (let i = 0; i < this.props.numberOfPages; i++) {
      pages.push(i);
    }

    return this.props.hidesForSinglePage && pages.length <= 1 ? null : (
      <View style={[styles.container, defaultStyle, style]}>
        {pages.map((el, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={this.onPageIndicatorPress.bind(this, i)}>
            <View
              style={
                i === this.props.currentPage
                  ? newCurrentIndicatorStyle
                  : newIndicatorStyle
              }
            />
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default PageControl;
