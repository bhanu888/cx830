import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {GlobalStyles} from '../layout/GlobalStyles';
import {Api} from '../data/Api';

export default class SettingsScreen extends Component {
  onPressLogout() {
    Api.logout()
    this.props.screenProps.rootNavigation.dispatch(NavigationActions.reset(
      {
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Loading'})
        ]
      }));
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Button
          onPress={this.onPressLogout.bind(this)}
          title="Logout"
        />
      </View>
    );
  }
}
