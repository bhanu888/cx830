import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';
import {Api} from '../data/Api';
import {oauth, net} from 'react-native-force';
import MapView, {Marker} from 'react-native-maps';

export default class LeadsMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [], markers: []};
    this.mapRef = null;
  }

  componentDidMount() {
    var that = this;
    Api.getAuthCredentials()
      .then((credentials) => {
        that.fetchData();
      })
      .catch((error) => {
        console.log('Failed to authenticate:' + error)
      })
    }

    fetchData() {
      var that = this;
      Api.sdfcOpenLeads()
        .then((response) => {
          const filtered = response.records.filter(r => {
            return r.Address != null
              && r.Address.latitude != null
              && r.Address.longitude != null;
          });

          markers = filtered.map(r => ({
            id: r.Id,
            latlng: {
              latitude: r.Address.latitude,
              longitude: r.Address.longitude
            },
            title: `${r.FirstName} ${r.LastName}`,
            description: `${r.Address.street},
              ${r.Address.city}
              ${r.Address.country}`,
          }));
          markerIds = markers.map(r => r.id);

          that.setState({data: filtered, markers})
          this.mapRef.fitToSuppliedMarkers(markerIds, true);
        });
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
      <MapView
        ref={(ref) => { this.mapRef = ref }}
        style={styles.mapView}
        showsUserLocation={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {this.state.markers.map(marker => (
        <Marker
          identifier={marker.id}
          key={marker.id}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))}
      </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  }
});
