import React from 'react';
import {TabNavigator} from 'react-navigation';
import {ChildStackNavigator} from './ChildStackNavigator';
import AgendaScreen from '../agenda/AgendaScreen';
import LeadsMapScreen from '../leads_map/LeadsMapScreen';
import SettingsScreen from '../settings/SettingsScreen';

export const RootTabNavigator = TabNavigator({
  Agenda: {
    screen: ChildStackNavigator({
      rootName: 'Agenda',
      rootScreen: AgendaScreen,
    }),
  },
  Leads: {
    screen: ChildStackNavigator({
      rootName: 'Leads',
      rootScreen: LeadsMapScreen,
    }),
  },
  Settings: {
    screen: ChildStackNavigator({
      rootName: 'Settings',
      rootScreen: SettingsScreen,
    }),
  },
});
