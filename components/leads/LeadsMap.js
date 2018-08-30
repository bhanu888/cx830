import React, {Component} from 'react';
import {
  Alert,
  StyleSheet
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Api} from '../data/Api';
import {GlobalStyles} from '../layout/GlobalStyles';

export default class LeadsMap extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onAcceptLead(id, userId) {
    return () => {
      Api.sfdcUpdateLead(id, 'Working - Contacted', userId)
        .then(() => {
          this.props.fetchDataFn();
        })
        .catch(console.log);
    }
  }

  navigateDetail(item) {
    return () => {
      this.props.navigation.navigate(
        'Lead',
        {
          id: item.Id,
          title: `${item.FirstName} ${item.LastName}`,
        }
      );
    }
  }

  onPressItem(item) {
    return () => {
      Api.getSfdcCredentials().then((credentials) => {
        const isOpenItem = item.Status === 'Open - Not Contacted';
        if (isOpenItem) {
          Alert.alert(
            'Accept Lead',
            'Are you sure you want to accept this lead?',
            [
              { 'text': 'Cancel', style: 'cancel' },
              { 'text': 'Accept', onPress: this.onAcceptLead.bind(this)(item.Id, credentials.userId) }
            ]
          )
        } else {
          this.navigateDetail(item)();
        }
      });
    }
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
          onCalloutPress={this.navigateDetail(marker.item).bind(this)}
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
