import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GlobalStyles} from '../layout/GlobalStyles';

export default class LeadsMap extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <MapView
        ref={(ref) => { this.props.passMapRef(ref) }}
        style={styles.mapView}
        showsUserLocation={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
      {this.props.markers.map(marker => (
        <Marker
          identifier={marker.id}
          key={marker.id}
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  }
});
