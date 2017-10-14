import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Services from './binanceSDK/Services';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }

    
  }
  componentDidMount() {
    this.testConnectivity();
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


  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text> Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text> testing </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
