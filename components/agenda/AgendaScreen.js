import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {oauth, net} from 'react-native-force';
import {GlobalStyles} from '../layout/GlobalStyles';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    var that = this;
    oauth.getAuthCredentials(
      () => that.fetchData(), // already logged in
      () => {
        oauth.authenticate(
          () => that.fetchData(),
          (error) => console.log('Failed to authenticate:' + error)
        );
      });
    }

    fetchData() {
      var that = this;
      net.query('SELECT Id, Name FROM User LIMIT 10',
      (response) => that.setState({data: response.records})
    );
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
      <FlatList
        data={this.state.data}
        renderItem={({item}) => <Text style={GlobalStyles.flatListItem}>{item.Name}</Text>}
        keyExtractor={(item, index) => 'key_' + index}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
