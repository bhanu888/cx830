import React from 'react';
import {StackNavigator} from 'react-navigation';
import {Button} from 'react-native';

export const ChildStackNavigator = ({rootName, rootScreen, navigationOptions}) => {
  const options = {};
  options[rootName] = {
    screen: rootScreen,
    navigationOptions: navigationOptions
  };
  return StackNavigator(options, {
    initialRouteName: rootName
  });
}
