import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';
import {Api} from '../data/Api';

export default class LeadsList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onAcceptLead(id, userId) {
    return () => {
      Api.sfdcUpdateLead(id, 'Working - Contacted', userId)
        .then(() => {
          this.props.fetchDataFn();
        })
        .catch(console.log);
    }
  }

  navigateDetail(id) {
    return () => {
      this.props.navigation.navigate(
        'Lead',
        { id: id }
      );
    }
  }

  onPressItem(item) {
    return () => {
      Api.getSfdcCredentials().then((credentials) => {
        const isOpenItem = item.Status === 'Open - Not Contacted';
        if (isOpenItem) {
          Alert.alert(
            'Accept Lead',
            'Are you sure you want to accept this lead?',
            [
              { 'text': 'Cancel', style: 'cancel' },
              { 'text': 'Accept', onPress: this.onAcceptLead.bind(this)(item.Id, credentials.userId) }
            ]
          )
        } else {
          this.navigateDetail(item.Id)();
        }
      });
    }
  }

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({item}) => (
          <TouchableWithoutFeedback onPress={this.onPressItem.bind(this)(item)}>
            <View>
              <Text style={GlobalStyles.flatListItem}>{item.FirstName}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item, index) => 'key_' + index}
      />
    );
  }
}
