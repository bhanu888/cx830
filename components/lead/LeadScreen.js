import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';
import {Api} from '../data/Api';

export default class LeadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this.id = null;
  }

  componentDidMount() {
    var that = this;
    this.id = this.props.navigation.state.params.id;
    Api.getAuthCredentials()
      .then((credentials) => {
        that.fetchData();
      })
      .catch((error) => {
        console.log('Failed to authenticate:' + error)
      });
  }

  fetchData() {
    var that = this;
    Api.sfdcRetrieveLead(this.id)
      .then((response) => {
        console.log(response);
        that.setState({data: response})
      });
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Text>{this.state.data.FirstName} {this.state.data.LastName}</Text>
      </View>
    );
  }
}
