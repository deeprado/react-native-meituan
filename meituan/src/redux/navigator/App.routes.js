import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

// 引导页面
import WelcomePage from '../../pages/WelcomePage';
import HomeScene from '../../pages/Home/HomeScene';
import NearbyScene from '../../pages/Nearby/NearbyScene';
import OrderScene from '../../pages/Order/OrderScene';
import MineScene from '../../pages/Mine/MineScene';

import GroupPurchase from '../../pages/GroupPurchase/GroupPurchaseScene';
import WebScene from '../../components/WebScene';
import TabBarItem from '../../components/TabBarItem';

const switchNavigationOptions = {
  gesturesEnabled: true,
  headerTitle: null,
};

const commonNavigationOptions = {
  tabBarVisible: false,
  headerShown: true,
};

const bottomTabOptions = (
  tabBarTitle,
  {normalImage, selectedImage},
  navTitle = null,
) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    return (
      <TabBarItem
        tintColor={tintColor}
        focused={focused}
        normalImage={normalImage}
        selectedImage={selectedImage}
      />
    );
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    tabBarVisible,
    headerTitle,
    headerTitleStyle,
    headerStyle,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    HomeScene: {
      screen: HomeScene,
      navigationOptions: () =>
        bottomTabOptions('团购', {
          normalImage: require('../../assets/images/tabbar/tabbar_homepage.png'),
          selectedImage: require('../../assets/images/tabbar/tabbar_homepage_selected.png'),
        }),
    },
    NearbyScene: {
      screen: NearbyScene,
      navigationOptions: () =>
        bottomTabOptions('附近', {
          normalImage: require('../../assets/images/tabbar/tabbar_merchant.png'),
          selectedImage: require('../../assets/images/tabbar/tabbar_merchant_selected.png'),
        }),
    },
    OrderScene: {
      screen: OrderScene,
      navigationOptions: () =>
        bottomTabOptions('订单', {
          normalImage: require('../../assets/images/tabbar/tabbar_order.png'),
          selectedImage: require('../../assets/images/tabbar/tabbar_order_selected.png'),
        }),
    },
    MineScene: {
      screen: MineScene,
      navigationOptions: () =>
        bottomTabOptions('我的', {
          normalImage: require('../../assets/images/tabbar/tabbar_mine.png'),
          selectedImage: require('../../assets/images/tabbar/tabbar_mine_selected.png'),
        }),
    },
  },
  {
    initialRouteName: 'HomeScene',
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: 'gray',
      showIcon: true,
    },
    animationEnabled: true,
    // 是否懒加载
    lazy: true,
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: {
        ...commonNavigationOptions,
        headerShown: false,
      },
    },
    GroupPurchase: {
      screen: GroupPurchase,
      navigationOptions: commonNavigationOptions,
    },
    Web: {
      screen: WebScene,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    initialRouteName: 'TabNavigator',
    // headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      headerShown: false,
    },
  },
);

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: WelcomePage,
      navigationOptions: switchNavigationOptions,
    },
    AppPage: {
      screen: AppAllStack,
      navigationOptions: switchNavigationOptions,
    },
  },
  {
    // mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

// const prefix = 'qimao://';

export default SplashStack;
