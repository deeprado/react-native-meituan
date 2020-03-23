import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

import Api from '../../common/Api';
import DetailCell from '../../components/DetailCell';
import SpacingView from '../../components/SpacingView';
import RefreshListView, {RefreshState} from '../../components/RefreshListView';

import OrderMenuItem from './OrderMenuItem';
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell';

import RecommendData from '../../data/recommend.json';

class OrderScene extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '订单',
    headerStyle: {backgroundColor: 'white'},
  });

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refreshState: RefreshState.Idle,
    };
  }

  componentDidMount() {
    this.requestData();
  }

  requestData = async () => {
    try {
      this.setState({refreshState: RefreshState.HeaderRefreshing});

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

      // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
      dataList.sort(() => {
        return 0.5 - Math.random();
      });

      this.setState({
        data: dataList,
        refreshState: RefreshState.NoMoreData,
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
        refreshState: RefreshState.Failure,
      });
      // this.setState({
      //   refreshState: RefreshState.Failure,
      // });
    }
  };

  keyExtractor = (item, index) => {
    return item.id.toString();
  };

  renderHeader = () => {
    return (
      <View style={styles.container}>
        <DetailCell title="我的订单" subtitle="全部订单" style={{height: 38}} />

        <View style={styles.itemContainer}>
          <OrderMenuItem
            title="待付款"
            icon={require('../../assets/images/order/order_tab_need_pay.png')}
          />
          <OrderMenuItem
            title="待使用"
            icon={require('../../assets/images/order/order_tab_need_use.png')}
          />
          <OrderMenuItem
            title="待评价"
            icon={require('../../assets/images/order/order_tab_need_review.png')}
          />
          <OrderMenuItem
            title="退款/售后"
            icon={require('../../assets/images/order/order_tab_needoffer_aftersale.png')}
          />
        </View>

        <SpacingView />

        <DetailCell title="我的收藏" subtitle="查看全部" style={{height: 38}} />
      </View>
    );
  };

  renderCell = rowData => {
    return (
      <GroupPurchaseCell
        info={rowData.item}
        onPress={() => {
          this.props.navigation.navigate('GroupPurchase', {info: rowData.item});
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />

        <RefreshListView
          data={this.state.dataList}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderCell}
          keyExtractor={this.keyExtractor}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.requestData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
  },
});

export default OrderScene;
