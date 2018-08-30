import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {oauth, net} from 'react-native-force';
import {GlobalStyles} from '../layout/GlobalStyles';

export default class SettingsScreen extends Component {
  onPressLogout() {
    oauth.logout();
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
