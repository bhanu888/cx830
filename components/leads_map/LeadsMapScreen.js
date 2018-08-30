import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {Api} from '../data/Api';
import {oauth, net} from 'react-native-force';

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
      <FlatList
        data={this.state.data}
        renderItem={({item}) => <Text style={styles.item}>{item.FirstName}</Text>}
        keyExtractor={(item, index) => 'key_' + index}
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
