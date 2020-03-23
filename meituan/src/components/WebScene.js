import React, {Component} from 'react';
import {View, StyleSheet, InteractionManager} from 'react-native';

import {WebView} from 'react-native-webview';

class WebScene extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {backgroundColor: 'white'},
    title: navigation.state.params.title,
  });

  constructor(props) {
    super(props);
    this.state = {
      source: {},
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.setParams({title: '加载中'});
      this.setState({source: {uri: this.props.navigation.state.params.url}});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={this.state.source}
          onLoadEnd={e => this.onLoadEnd(e)}
          scalesPageToFit
        />
      </View>
    );
  }

  onLoadEnd(e) {
    if (e.nativeEvent.title.length > 0) {
      this.props.navigation.setParams({title: e.nativeEvent.title});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  webView: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default WebScene;
