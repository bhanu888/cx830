import React from 'react';
import {StackNavigator} from 'react-navigation';
import {Button} from 'react-native';

export const ChildStackNavigator = ({screens, rootName}) => {
  const options = {};
  for (let i = 0; i < screens.length; i++) {
    const screen = screens[i];
    options[screen['name']] = {
      screen: screen['screen'],
      navigationOptions: screen['navigationOptions']
    };
  }
  return StackNavigator(options, {
    initialRouteName: rootName
  });
}
