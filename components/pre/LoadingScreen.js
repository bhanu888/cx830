import React, {Component} from 'react';
import {
  Button,
  View
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Api} from '../data/Api';
import {GlobalStyles} from '../layout/GlobalStyles';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {showLogin: false};
  }

  componentDidMount() {
    Api.getSfdcCredentials()
      .then((credentials) => {
        if (credentials === null) {
          this.setState({showLogin: true});
          this.onPressLogin();
        } else {
          this.props.navigation.dispatch(NavigationActions.reset(
            {
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Root'})
              ]
            }));
        }
      })
      .catch((error) => {
        this.setState({showLogin: true});
        console.log(error);
      })
  }

  onPressLogin() {
    var that = this;
    Api.authenticate()
      .then((credentials) => {
        this.props.navigation.dispatch(NavigationActions.reset(
          {
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Root'})
            ]
          }));
      })
      .catch(console.log);
  }

  render() {
    if (!this.state.showLogin) {
      return null;
    } else {
      return (
        <View style={[GlobalStyles.container, {justifyContent: 'center'}]}>
          <Button
            onPress={this.onPressLogin.bind(this)}
            title="Login"
          />
        </View>
      );
    }
  }
}
