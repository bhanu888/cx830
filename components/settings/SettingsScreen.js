import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import {oauth, net} from 'react-native-force';

export default class SettingsScreen extends Component {
  onPressLogout() {
    oauth.logout();
  }

  render() {
    return (
      <View style={styles.container}>
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
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});
