import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {AnimatedGaugeProgress, GaugeProgress} from 'react-native-simple-gauge';
import {oauth, net} from 'react-native-force';
import {GlobalStyles} from '../layout/GlobalStyles';

export default class AgendaScreen extends Component {
  static navigationOptions = {
    title: 'Dashboard'
  };

  constructor(props) {
    super(props);
    this.state = {data: []};
    this.date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  componentDidMount() {
    var that = this;
  }

  render() {
    return (
      <ScrollView style={GlobalStyles.container}>
        <View style={styles.container}>
          <AnimatedGaugeProgress
            style={styles.gauge}
            size={150}
            width={15}
            fill={80}
            rotation={90}
            cropDegree={120}
            tintColor="#4682b4"
            delay={0}
            backgroundColor="#b0c4de"
            stroke={[2, 2]} //For a equaly dashed line
            strokeCap="circle" />

          <Text style={GlobalStyles.header}>{this.date}</Text>
          <Text style={GlobalStyles.subheader}>Today</Text>
        </View>
        <View style={GlobalStyles.flatListSummaryItem}>
          <Text style={GlobalStyles.flatListTitle}>Patricia Feager - Vogue Laundry</Text>
          <Text style={GlobalStyles.flatListDescription}>Meeting - 12:30 PM</Text>
        </View>
        <View style={GlobalStyles.flatListSummaryItem}>
          <Text style={GlobalStyles.flatListTitle}>Andy Chan - Oi Tung Shopping Centre</Text>
          <Text style={GlobalStyles.flatListDescription}>Call - 9:00 AM-10:00 AM</Text>
        </View>
        <View style={GlobalStyles.flatListSummaryItem}>
          <Text style={GlobalStyles.flatListTitle}>Sandra Eberhard - Ricacorp Properties</Text>
          <Text style={GlobalStyles.flatListDescription}>Call - 1:00 AM-2:00 PM</Text>
        </View>

        <View style={GlobalStyles.container}>
          <Text style={GlobalStyles.subheader}>Upcoming</Text>
        </View>

        <View style={GlobalStyles.flatListSummaryItem}>
          <Text style={GlobalStyles.flatListTitle}>Jeff Glimpse - Harbour Plaza North Point</Text>
          <Text style={GlobalStyles.flatListDescription}>Call - 02/09/18 2:00-3:00 PM</Text>
        </View>
        <View style={GlobalStyles.flatListSummaryItem}>
          <Text style={GlobalStyles.flatListTitle}>Kristen Akin - APITA</Text>
          <Text style={GlobalStyles.flatListDescription}>Meeting - 03/09/18 4:00 PM</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom:8,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  gauge: {
    padding: 4,
  },
});
