import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';
import {Api} from '../data/Api';

export default class SettingsScreen extends Component {
  onPressLogout() {
    Api.logout();
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Button
          style={styles.item}
          onPress={this.onPressLogout}
          title="Logout"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
