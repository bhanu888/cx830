import React from 'react';
import {TabNavigator} from 'react-navigation';
import {ChildStackNavigator} from './ChildStackNavigator';
import AgendaScreen from '../agenda/AgendaScreen';
import LeadsScreen from '../leads/LeadsScreen';
import SettingsScreen from '../settings/SettingsScreen';
import {Api} from '../data/Api';
import {Button} from 'react-native';

const HeaderButton = ({setIsList}) => {
  return (
    <Button
      onPress={() => {
        setIsList();
      }}
      title="Toggle Map"
    />
  );
};

export const RootTabNavigator = TabNavigator({
  Agenda: {
    screen: ChildStackNavigator({
      rootName: 'Agenda',
      rootScreen: AgendaScreen,
    }),
  },
  MyLeads: {
    screen: ChildStackNavigator({
      rootName: 'My Leads',
      rootScreen: (props) => <LeadsScreen {...props} leadApiFn={Api.sfdcMyLeads} />,
      navigationOptions: ({navigation}) => {
        return {
          title: 'My Leads',
          headerRight: (
            <HeaderButton setIsList={navigation.getParam('setIsList')} />
          ),
        };
      }
    }),
  },
  OpenLeads: {
    screen: ChildStackNavigator({
      rootName: 'Open Leads',
      rootScreen: (props) => <LeadsScreen {...props} leadApiFn={Api.sfdcOpenLeads} />,
      navigationOptions: ({navigation}) => {
        return {
          title: 'Open Leads',
          headerRight: (
            <HeaderButton setIsList={navigation.getParam('setIsList')} />
          ),
        };
      }
    }),
  },
  Settings: {
    screen: ChildStackNavigator({
      rootName: 'Settings',
      rootScreen: SettingsScreen,
    }),
  },
});
