import React, {Component} from 'react';

import {
  Button,
  Linking,
  Picker,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';
import {Api} from '../data/Api';

const SDFC_LEAD_STATUS_CLOSED_CONVERTED = "Closed - Converted";
const SDFC_LEAD_STATUS_CLOSED_NOT_CONVERTED = "Closed - Not Converted";

export default class LeadScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
  });

  constructor(props) {
    super(props);
    this.state = {data: {Address: {}}, selectedStatus: ''};
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

  onPressCall() {
    const url = `tel:${this.state.data.Phone}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  onPickerValueChange(v, i) {
    this.setState({selectedStatus: v});
  }

  onPressSave() {
    var that = this;
    Api.sfdcUpdateLead(this.id, this.state.selectedStatus)
      .then((response) => {
        if (this.state.selectedStatus === SDFC_LEAD_STATUS_CLOSED_CONVERTED) {
          this.props.navigation.navigate('Digital Form', {
            data: this.state.data,
          });
        } else {
          this.props.navigation.goBack();
        }
      });
  }

  fetchData() {
    var that = this;
    Api.sfdcRetrieveLead(this.id)
      .then((response) => {
        that.setState({data: response})
      });
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Text>{this.state.data.FirstName} {this.state.data.LastName}</Text>
        <Text>{this.state.data.Address.street}, {this.state.data.Address.city} {this.state.data.Address.country}</Text>
        <Button title="Call" onPress={this.onPressCall.bind(this)} />
        <Picker
          selectedValue={this.state.selectedStatus}
          onValueChange={this.onPickerValueChange.bind(this)}>
          <Picker.Item
            label={SDFC_LEAD_STATUS_CLOSED_CONVERTED}
            value={SDFC_LEAD_STATUS_CLOSED_CONVERTED} />
          <Picker.Item
            label={SDFC_LEAD_STATUS_CLOSED_NOT_CONVERTED}
            value={SDFC_LEAD_STATUS_CLOSED_NOT_CONVERTED} />
        </Picker>
        <Button title="Save" onPress={this.onPressSave.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
