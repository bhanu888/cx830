import React from 'react';
import {TabNavigator} from 'react-navigation';
import {ChildStackNavigator} from './ChildStackNavigator';
import AgendaScreen from '../agenda/AgendaScreen';
import MyLeadsScreen from '../leads/MyLeadsScreen';
import OpenLeadsScreen from '../leads/OpenLeadsScreen';
import LeadScreen from '../lead/LeadScreen';
import SettingsScreen from '../settings/SettingsScreen';
import {Api} from '../data/Api';
import {Button} from 'react-native';


export const RootTabNavigator = TabNavigator({
  Agenda: {
    screen: ChildStackNavigator({
      screens: [{
        name: 'Agenda',
        screen: AgendaScreen,
      }]
    }),
  },
  MyLeads: {
    screen: ChildStackNavigator({
      screens: [{
        name: 'My Leads',
        screen: MyLeadsScreen,
      }, {
        name: 'Lead',
        screen: LeadScreen,
      }]
    }),
  },
  OpenLeads: {
    screen: ChildStackNavigator({
      screens: [{
        name: 'Open Leads',
        screen: OpenLeadsScreen,
      }, {
        name: 'Lead',
        screen: LeadScreen,
      }]
    }),
  },
  Settings: {
    screen: ChildStackNavigator({
      screens: [{
        name: 'Settings',
        screen: SettingsScreen,
      }]
    }),
  },
});
