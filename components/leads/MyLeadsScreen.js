import React, {Component} from 'react';
import {Button} from 'react-native'
import LeadsScreen from './LeadsScreen';
import {Api} from '../data/Api';

const HeaderButton = ({setIsList}) => {
  return (
    <Button
      onPress={() => {
        setIsList();
      }}
      title="Toggle Map"
    />
  );
};

export default class MyLeadsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'My Leads',
      headerRight: (
        <HeaderButton setIsList={navigation.getParam('setIsList')} />
      ),
    };
  }

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <LeadsScreen {...this.props} leadApiFn={Api.sfdcMyLeads} />
    );
  }
}
