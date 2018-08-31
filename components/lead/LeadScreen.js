import React, {Component} from 'react';

import {
  Button,
  Linking,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
    this.state = {data: {Address: {}}, selectedStatus: '', notes: ''};
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

  onPressEmail() {
    const url = `mailto:${this.state.data.Email}`;
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
      <ScrollView style={GlobalStyles.container}>
        <View style={[GlobalStyles.container, styles.container]}>
          <Text style={GlobalStyles.header}>{this.state.data.FirstName} {this.state.data.LastName}</Text>
          <Text style={GlobalStyles.subheader}>{this.state.data.Address.street}, {this.state.data.Address.city} {this.state.data.Address.country}</Text>
          <View style={styles.buttons}>
            <Icon.Button
              backgroundColor="transparent"
              underlayColor="transparent"
              color="#2e77bb"
              name="ios-call"
              size={35}
              onPress={this.onPressCall.bind(this)} />
            <Icon.Button
              backgroundColor="transparent"
              underlayColor="transparent"
              color="#2e77bb"
              name="ios-mail"
              size={35}
              onPress={this.onPressEmail.bind(this)} />
            <Icon.Button
              backgroundColor="transparent"
              underlayColor="transparent"
              color="#2e77bb"
              name="ios-calendar"
              size={35} />
          </View>

          <Text style={[GlobalStyles.subheader, {paddingTop: 16}]}>Remarks</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              numberOfLines={4}
              onChangeText={(notes) => this.setState({notes})}
              value={this.state.notes}/>
          </View>

          <Text style={[GlobalStyles.subheader, {paddingTop: 16}]}>Update Status</Text>
          <Picker
            itemStyle={{height: 122}}
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  buttons: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    borderRadius: 2,
    padding: 4,
  },
  textInput: {
    height: 100,
    justifyContent: "flex-start"
  },
});
