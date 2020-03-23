import React, {Component} from 'react';
import {View, StyleSheet, Image, InteractionManager} from 'react-native';

import Button from '../../components/Button';
import NavigationItem from '../../components/NavigationItem';
import Separator from '../../components/Separator';
import SpacingView from '../../components/SpacingView';
import RefreshListView, {RefreshState} from '../../components/RefreshListView';

import Heading1 from '../../components/Text/Paragraph';
import Heading2 from '../../components/Text/Heading2';
import Heading3 from '../../components/Text/Heading3';
import Paragraph from '../../components/Text/Paragraph';

import Screen from '../../common/Screen';
import Color from '../../common/Color';
import Api from '../../common/Api';

import GroupPurchaseCell from './GroupPurchaseCell';

import RecommendData from '../../data/recommend.json';

class GroupPurchaseScene extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: '团购详情',
    headerStyle: {backgroundColor: 'white'},
    headerRight: () => {
      return (
        <NavigationItem
          icon={require('../../assets/images/public/icon_navigation_item_share.png')}
          onPress={() => {}}
        />
      );
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refreshState: RefreshState.Idle,
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.requestData();
    });
  }

  requestData = () => {
    this.requestRecommend();
  };

  requestRecommend = async () => {
    try {
      this.setState({refreshState: RefreshState.HeaderRefreshing});

      let info = this.props.navigation.state.params.info;
      let response = await fetch(Api.recommendUrlWithId(info.id));
      let json = await response.json();

      if (json.status !== 200) {
        throw '接口错误';
      }

      let dataList = json.data.deals.map(info => {
        return {
          id: info.id,
          imageUrl: info.imgurl,
          title: info.brandname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price,
        };
      });

      this.setState({
        data: dataList,
        refreshState: RefreshState.NoMoreData,
      });
    } catch (error) {
      let dataList = RecommendData.data.map(info => {
        return {
          id: info.id,
          imageUrl: info.imgurl,
          title: info.brandname,
          subtitle: `[${info.range}]${info.title}`,
          price: info.price,
        };
      });
      this.setState({
        data: dataList,
        refreshState: RefreshState.NoMoreData,
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
    let info = this.props.navigation.state.params.info;

    return (
      <View>
        <View>
          <Image
            style={styles.banner}
            source={{uri: info.imageUrl.replace('w.h', '480.0')}}
          />

          <View style={styles.topContainer}>
            <Heading2 style={{color: Color.primary}}>￥</Heading2>
            <Heading1 style={{marginBottom: 0}}>{info.price}</Heading1>
            <Paragraph style={{marginLeft: 10}}>
              门市价：￥{(info.price * 1.1).toFixed(0)}
            </Paragraph>
            <View style={{flex: 1}} />
            <Button
              title="立即抢购"
              titleStyle={{color: 'white', fontSize: 18}}
              style={styles.buyButton}
            />
          </View>
        </View>

        <Separator />

        <View>
          <View style={styles.tagContainer}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../assets/images/home/icon_deal_anytime_refund.png')}
            />
            <Paragraph style={{color: '#89B24F'}}> 随时退</Paragraph>
            <View style={{flex: 1}} />
            <Paragraph>已售{1234}</Paragraph>
          </View>
        </View>

        <SpacingView />

        <View style={styles.tipHeader}>
          <Heading3>看了本团购的用户还看了</Heading3>
        </View>
      </View>
    );
  };

  renderCell = rowData => {
    return (
      <GroupPurchaseCell
        info={rowData.item}
        onPress={() =>
          this.props.navigation.navigate('GroupPurchase', {info: rowData.item})
        }
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
  banner: {
    width: Screen.width,
    height: Screen.width * 0.5,
  },
  topContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: '#fc9e28',
    width: 94,
    height: 36,
    borderRadius: 7,
  },
  tagContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  tipHeader: {
    height: 35,
    justifyContent: 'center',
    borderWidth: Screen.onePixel,
    borderColor: Color.border,
    paddingVertical: 8,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
});

export default GroupPurchaseScene;
