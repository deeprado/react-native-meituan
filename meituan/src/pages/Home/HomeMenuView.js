import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Screen from '../../common/Screen';
import Color from '../../common/Color';

import PageControl from '../../components/PageControl';

import HomeMenuItem from './HomeMenuItem';

class HomeMenuView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
    };
  }

  render() {
    let {menuInfos, onMenuSelected} = this.props;

    let menuItems = menuInfos.map((info, i) => {
      return (
        <HomeMenuItem
          key={info.title}
          title={info.title}
          icon={info.icon}
          onPress={() => {
            onMenuSelected && onMenuSelected(i);
          }}
        />
      );
    });

    let menuViews = [];
    let pageCount = Math.ceil(menuItems.length / 10);

    for (let i = 0; i < pageCount; i++) {
      let items = menuItems.slice(i * 10, i * 10 + 10);

      let menuView = (
        <View style={styles.itemsView} key={i}>
          {items}
        </View>
      );
      menuViews.push(menuView);
    }
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => this.onScroll(e)}>
          <View style={styles.menuContainer}>{menuViews}</View>
        </ScrollView>

        <PageControl
          style={styles.pageControl}
          numberOfPages={pageCount}
          currentPage={this.state.currentPage}
          hidesForSinglePage
          pageIndicatorTintColor="gray"
          currentPageIndicatorTintColor={Color.primary}
          indicatorSize={{width: 8, height: 8}}
        />
      </View>
    );
  }

  onScroll(e) {
    let x = e.nativeEvent.contentOffset.x;
    let currentPage = Math.round(x / Screen.width);

    console.log(
      'onScroll  ' +
        e.nativeEvent.contentOffset.x +
        '  page ' +
        currentPage +
        '  current ' +
        this.state.currentPage,
    );
    if (this.state.currentPage !== currentPage) {
      this.setState({
        currentPage: currentPage,
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  menuContainer: {
    flexDirection: 'row',
  },
  itemsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Screen.width,
  },
  pageControl: {
    margin: 10,
  },
});

export default HomeMenuView;
