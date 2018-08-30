import React, {Component} from 'react';
import {
  FlatList,
  Text
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';

export default class LeadsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({item}) => <Text style={GlobalStyles.flatListItem}>{item.FirstName}</Text>}
        keyExtractor={(item, index) => 'key_' + index}
      />
    );
  }
}
