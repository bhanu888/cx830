import React, {Component} from 'react';
import {Button} from 'react-native'
import LeadsScreen from './LeadsScreen';
import {Api} from '../data/Api';
import Icon from 'react-native-vector-icons/Ionicons';

let isList = false;

const HeaderButton = ({setIsList}) => {
  return (
    <Icon.Button
      onPress={() => {
        isList = !isList;
        setIsList(isList);
      }}
      name="ios-eye"
      color="gray"
      underlayColor="transparent"
      backgroundColor="transparent"
    />
  );
};

export default class OpenLeadsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Open Leads',
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
      <LeadsScreen {...this.props} leadApiFn={Api.sfdcOpenLeads} />
    );
  }
}
