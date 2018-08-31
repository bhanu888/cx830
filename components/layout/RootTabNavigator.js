import React from 'react';
import {TabNavigator} from 'react-navigation';
import {ChildStackNavigator} from './ChildStackNavigator';
import AgendaScreen from '../agenda/AgendaScreen';
import MyLeadsScreen from '../leads/MyLeadsScreen';
import OpenLeadsScreen from '../leads/OpenLeadsScreen';
import LeadScreen from '../lead/LeadScreen';
import SettingsScreen from '../settings/SettingsScreen';
import DigitalForm from '../digital_form/DigitalForm';
import {Api} from '../data/Api';
import {Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
      }, {
        name: 'Digital Form',
        screen: DigitalForm,
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
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Agenda':
          iconName = 'ios-calendar';
          break;
        case 'MyLeads':
          iconName = 'ios-list-box';
          break;
        case 'OpenLeads':
          iconName = 'ios-folder-open';
          break;
        case 'Settings':
          iconName = 'ios-cog';
          break;
      }

      return <Icon name={iconName} size={28} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#2e77bb',
    inactiveTintColor: 'gray',
  },
});
