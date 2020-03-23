import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Api from '../../common/Api';
import RefreshListView, {RefreshState} from '../../components/RefreshListView';

import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell';
import NearbyHeaderView from './NearbyHeaderView';

import RecommendData from '../../data/recommend.json';

class NearbyListScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeIndex: 0,
      data: [],
      refreshState: RefreshState.Idle,
    };
  }

  componentDidMount() {
    this.requestFirstPage();
  }

  requestData = async () => {
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

      // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
      dataList.sort(() => {
        return 0.5 - Math.random();
      });

      return dataList;
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
      return dataList;
      // this.setState({refreshing: false});
    }
  };

  requestFirstPage = async () => {
    try {
      this.setState({refreshState: RefreshState.HeaderRefreshing});
      let dataList = await this.requestData();

      this.setState({
        data: dataList,
        refreshState: RefreshState.Idle,
      });
    } catch (error) {
      this.setState({
        refreshState: RefreshState.Failure,
      });
    }
  };

  requestNextPage = async () => {
    try {
      this.setState({refreshState: RefreshState.FooterRefreshing});
      let dataList = await this.requestData();

      this.setState({
        data: [...this.state.data, ...dataList],
        refreshState:
          this.state.data.length > 30
            ? RefreshState.NoMoreData
            : RefreshState.Idle,
      });
    } catch (error) {
      this.setState({
        refreshState: RefreshState.Failure,
      });
    }
  };

  renderHeader = () => {
    return (
      <NearbyHeaderView
        titles={this.props.types}
        selectedIndex={this.state.typeIndex}
        onSelected={index => {
          if (index !== this.state.typeIndex) {
            this.setState({typeIndex: index});
            this.requestData();
          }
        }}
      />
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
        <RefreshListView
          data={this.state.data}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderCell}
          keyExtractor={(item, index) => index.toString()}
          refreshState={this.state.refreshState}
          onHeaderRefresh={this.requestFirstPage}
          onFooterRefresh={this.requestNextPage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NearbyListScene;
