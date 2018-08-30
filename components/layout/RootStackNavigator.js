import React from 'react';
import {StackNavigator} from 'react-navigation';
import {RootTabNavigator} from './RootTabNavigator';

export const RootStackNavigator = StackNavigator({
  Root: RootTabNavigator
}, {
  initialRouteName: 'Root',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
});
