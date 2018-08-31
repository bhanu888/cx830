import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';

export default class DigitalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {Address: {}}};
  }

  componentDidMount() {
    this.setState({data: this.props.navigation.state.params.data});
  }

  render() {
    return (
      <ScrollView style={GlobalStyles.container}>
        <View style={GlobalStyles.flatListSummaryItem}>
          <Text style={GlobalStyles.flatListTitle}>{this.state.data.FirstName} {this.state.data.LastName}</Text>
          <Text style={GlobalStyles.flatListDescription}>Name</Text>
        </View>

        <View style={GlobalStyles.flatListSummaryItem}>
          <Text style={GlobalStyles.flatListTitle}>{this.state.data.Address.street}, {this.state.data.Address.city} {this.state.data.Address.country}</Text>
          <Text style={GlobalStyles.flatListDescription}>Address</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
