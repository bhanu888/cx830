import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {Api} from '../data/Api';
import {oauth, net} from 'react-native-force';
import MapView from 'react-native-maps';

export default class LeadsMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    var that = this;
    Api.getAuthCredentials()
      .then((credentials) => {
        that.fetchData()
      })
      .catch((error) => {
        console.log('Failed to authenticate:' + error)
      })
    }

    fetchData() {
      var that = this;
      Api.sdfcOpenLeads()
        .then((response) => that.setState({data: response.records}));
  }

  render() {
    return (
      <View style={styles.container}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
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
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});
