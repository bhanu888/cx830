import React, {Component} from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';
import {Api} from '../data/Api';

export default class LeadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    var that = this;
    Api.getAuthCredentials()
      .then((credentials) => {
        that.fetchData();
      })
      .catch((error) => {
        console.log('Failed to authenticate:' + error)
      });
  }

  fetchData() {
    Api.sdfcRetrieveLead(id)
      .then((response) => {
        console.log(response);
        that.setState({data: response})
      });
  }
}
