import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  StatusBar,
} from 'react-native';

import Screen from '../../common/Screen';
import Color from '../../common/Color';

import DetailCell from '../../components/DetailCell';
import NavigationItem from '../../components/NavigationItem';
import SpacingView from '../../components/SpacingView';

import Paragraph from '../../components/Text/Paragraph';
import Heading2 from '../../components/Text/Heading2';

class MineScene extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <View style={{flexDirection: 'row'}}>
        <NavigationItem
          icon={require('../../assets/images/mine/icon_navigation_item_set_white.png')}
          onPress={() => {}}
        />
        <NavigationItem
          icon={require('../../assets/images/mine/icon_navigation_item_message_white.png')}
          onPress={() => {}}
        />
      </View>
    ),
    headerStyle: {
      backgroundColor: Color.primary,
      elevation: 0,
      borderBottomWidth: 0,
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    };
  }

  onHeaderRefresh() {
    this.setState({isRefreshing: true});

    setTimeout(() => {
      this.setState({isRefreshing: false});
    }, 2000);
  }

  renderCells() {
    let cells = [];
    let dataList = this.getDataList();
    for (let i = 0; i < dataList.length; i++) {
      let sublist = dataList[i];
      for (let j = 0; j < sublist.length; j++) {
        let data = sublist[j];
        let cell = (
          <DetailCell
            image={data.image}
            title={data.title}
            subtitle={data.subtitle}
            key={data.title}
          />
        );
        cells.push(cell);
      }
      cells.push(<SpacingView key={i} />);
    }

    return <View style={{flex: 1}}>{cells}</View>;
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/mine/avatar.png')}
        />
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Heading2 style={{color: 'white'}}>deeprado</Heading2>
            <Image
              style={{marginLeft: 4}}
              source={require('../../assets/images/mine/beauty_technician_v15.png')}
            />
          </View>
          <Paragraph style={{color: 'white', marginTop: 4}}>
            个人信息 >
          </Paragraph>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.paper}}>
        <StatusBar barStyle="dark-content" backgroundColor={Color.primary} />

        <View
          style={{
            position: 'absolute',
            width: Screen.width,
            height: Screen.height / 2,
            backgroundColor: Color.primary,
          }}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onHeaderRefresh()}
              tintColor="gray"
            />
          }>
          {this.renderHeader()}
          <SpacingView />
          {this.renderCells()}
        </ScrollView>
      </View>
    );
  }

  getDataList() {
    return [
      [
        {
          title: '我的钱包',
          subtitle: '办信用卡',
          image: require('../../assets/images/mine/icon_mine_wallet.png'),
        },
        {
          title: '余额',
          subtitle: '￥95872385',
          image: require('../../assets/images/mine/icon_mine_balance.png'),
        },
        {
          title: '抵用券',
          subtitle: '63',
          image: require('../../assets/images/mine/icon_mine_voucher.png'),
        },
        {
          title: '会员卡',
          subtitle: '2',
          image: require('../../assets/images/mine/icon_mine_membercard.png'),
        },
      ],
      [
        {
          title: '好友去哪',
          image: require('../../assets/images/mine/icon_mine_friends.png'),
        },
        {
          title: '我的评价',
          image: require('../../assets/images/mine/icon_mine_comment.png'),
        },
        {
          title: '我的收藏',
          image: require('../../assets/images/mine/icon_mine_collection.png'),
        },
        {
          title: '会员中心',
          subtitle: 'v15',
          image: require('../../assets/images/mine/icon_mine_membercenter.png'),
        },
        {
          title: '积分商城',
          subtitle: '好礼已上线',
          image: require('../../assets/images/mine/icon_mine_member.png'),
        },
      ],
      [
        {
          title: '客服中心',
          image: require('../../assets/images/mine/icon_mine_customerService.png'),
        },
        {
          title: '关于美团',
          subtitle: '我要合作',
          image: require('../../assets/images/mine/icon_mine_aboutmeituan.png'),
        },
      ],
    ];
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
  header: {
    backgroundColor: Color.primary,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#51D3C6',
  },
});

export default MineScene;
