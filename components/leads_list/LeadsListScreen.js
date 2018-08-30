import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';
import {Api} from '../data/Api';
import {oauth, net} from 'react-native-force';

export default class LeadsListScreen extends Component {
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
      <View style={GlobalStyles.container}>
      <FlatList
        data={this.state.data}
        renderItem={({item}) => <Text style={GlobalStyles.flatListItem}>{item.FirstName}</Text>}
        keyExtractor={(item, index) => 'key_' + index}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
