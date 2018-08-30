import React from 'react';
import {StackNavigator} from 'react-navigation';

export const ChildStackNavigator = ({rootName, rootScreen}) => {
  const options = {};
  options[rootName] = rootScreen;
  return StackNavigator(options, {
    initialRouteName: rootName,
  });
}
