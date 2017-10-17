import React from 'react';
import { StyleSheet,ListView, Text, View,ActivityIndicator } from 'react-native';
import Services from './binanceSDK/Services';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }

    
  }
  componentDidMount() {
   // this.testConnectivity();
    this.loadAccountInfo();
  }

  testConnectivity() {
    let services = new Services();
    let test = services.test();

    test.then((responseJson) => {
    
        if (responseJson) {
          this.setState({
            isLoading: false,
            dataSource: responseJson,
          }, function () {
            // do something with new state
          });
        } else {
          this.setState({
            isLoading: true
          }, function () {
            // do something with new state
          });
        }

      })
      .catch((error) => {
        console.error(error);
      });
  }

  loadAccountInfo() {
    let services = new Services();
    let accountInfo = services.accountInfo();

    accountInfo.then((responseJson) => {
    
        if (responseJson) {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson.balances),
          }, function () {
            // do something with new state
          });
        } else {
          this.setState({
            isLoading: true
          }, function () {
            // do something with new state
          });
        }

      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text> testing </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.asset}, {rowData.free}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});
