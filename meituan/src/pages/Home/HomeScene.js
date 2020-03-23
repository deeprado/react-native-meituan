import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';

import NavigationItem from '../../components/NavigationItem';
import SpacingView from '../../components/SpacingView';

import Paragraph from '../../components/Text/Paragraph';
import Heading3 from '../../components/Text/Heading3';

import Screen from '../../common/Screen';
import Color from '../../common/Color';
import Api from '../../common/Api';

import RecommendData from '../../data/recommend.json';

import HomeMenuView from './HomeMenuView';
import HomeGridView from './HomeGridView';
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell';

class HomeScene extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: (
      <TouchableOpacity style={styles.searchBar}>
        <Image
          source={require('../../assets/images/home/search_icon.png')}
          style={styles.searchIcon}
        />
        <Paragraph>搜索</Paragraph>
      </TouchableOpacity>
    ),
    headerRight: (
      <NavigationItem
        icon={require('../../assets/images/mine/icon_navigation_item_message_white.png')}
        onPress={() => {}}
      />
    ),
    headerLeft: (
      <NavigationItem
        title="福州"
        titleStyle={{Color: 'white'}}
        onPress={() => {}}
      />
    ),
    headerStyle: {backgroundColor: Color.primary},
  });

  constructor(props) {
    super(props);

    this.state = {
      discounts: [],
      dataList: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  requestData = () => {
    this.setState({refreshing: true});

    this.requestDiscount();
    this.requestRecommend();
  };

  requestRecommend = async () => {
    try {
      let response = await fetch(Api.recommend);
      let json = await response.json();
      if (json.status !== 200) {
        throw '接口错误';
      }
      let dataList = json.data.map(info => {
        return {
          id: info.id,
          imageUrl: info.squareimgurl,
          title: info.mname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price,
        };
      });

      this.setState({
        dataList: dataList,
        refreshing: false,
      });
    } catch (error) {
      let dataList = RecommendData.data.map(info => {
        return {
          id: info.id,
          imageUrl: info.squareimgurl,
          title: info.mname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price,
        };
      });
      this.setState({
        dataList: dataList,
        refreshing: false,
      });
      // this.setState({refreshing: false});
    }
  };

  requestDiscount = async () => {
    try {
      let json = Api.discount;
      this.setState({discounts: json.data});
    } catch (error) {
      Alert.alert(error);
    }
  };

  renderCell = info => {
    return <GroupPurchaseCell info={info.item} onPress={this.onCellSelected} />;
  };

  onCellSelected = info => {
    // StatusBar.setBarStyle('default', false);
    this.props.navigation.navigate('GroupPurchase', {info: info});
  };

  keyExtractor = (item, index) => {
    return item.id.toString();
  };

  renderHeader = () => {
    return (
      <View>
        <HomeMenuView
          menuInfos={Api.menuInfo}
          onMenuSelected={this.onMenuSelected}
        />
        <SpacingView />
        <HomeGridView
          infos={Api.discount.data}
          onGridSelected={this.onGridSelected}
        />
        <SpacingView />
        <View style={styles.recommendHeader}>
          <Heading3>猜你喜欢</Heading3>
        </View>
      </View>
    );
  };

  onGridSelected = index => {
    let discount = Api.discount.data[index];

    // if (discount.type === 1) {
    // StatusBar.setBarStyle('default', false);

    let location = discount.tplurl.indexOf('http');
    let url = discount.tplurl.slice(location);
    this.props.navigation.navigate('Web', {url: url});
    // }
  };

  onMenuSelected = index => {
    Alert.alert(index);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        {/* 搜索框 */}

        {/* 推荐列表 */}
        <FlatList
          data={this.state.dataList}
          renderItem={this.renderCell}
          keyExtractor={this.keyExtractor}
          onRefresh={this.requestData}
          refreshing={this.state.refreshing}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.paper,
  },
  recommendHeader: {
    height: 35,
    justifyContent: 'center',
    borderWidth: Screen.onePixel,
    borderColor: Color.border,
    paddingVertical: 8,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  searchBar: {
    width: Screen.width * 0.7,
    height: 30,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 5,
  },
});

export default HomeScene;
