import React from 'react';
import {StackNavigator} from 'react-navigation';
import {RootTabNavigator} from './RootTabNavigator';
import LoadingScreen from '../pre/LoadingScreen';

export const RootStackNavigator = StackNavigator({
  Loading: LoadingScreen,
  Root: {
    screen: ({navigation}) => (
      <RootTabNavigator screenProps={{rootNavigation: navigation}} />
    ),
  }
}, {
  initialRouteName: 'Loading',
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
});
