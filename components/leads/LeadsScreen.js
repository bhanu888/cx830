import React, {Component} from 'react';
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import {GlobalStyles} from '../layout/GlobalStyles';
import {Api} from '../data/Api';
import LeadsList from './LeadsList';
import LeadsMap from './LeadsMap';

export default class LeadsScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {data: [], markers: [], isList: false};
    this.mapRef = null;
  }

  passMapRef(ref) {
    this.mapRef = ref;
  }

  setIsList(b) {
    this.setState({ isList: b });
    this.fetchData();
  }

  componentDidMount() {
    var that = this;
    this.props.navigation.setParams({ setIsList: this.setIsList.bind(this) });
    this.props.navigation.addListener('didFocus', this.authThenFetch.bind(this));
  }

  authThenFetch() {
    var that = this;
    Api.getAuthCredentials()
      .then((credentials) => {
        that.fetchData();
      })
      .catch((error) => {
        console.log('Failed to authenticate:' + error)
      });
  }

  fetchData() {
    var that = this;
    this.props.leadApiFn()
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
          title: `${r.FirstName} ${r.LastName} - ${r.Company}`,
          description: `${r.Address.street},
            ${r.Address.city}
            ${r.Address.country}`,
          item: r,
        }));
        markerIds = markers.map(r => r.id);

        that.setState({data: filtered, markers})
        if (this.mapRef) {
          this.mapRef.fitToSuppliedMarkers(markerIds, true);
        }
      });
  }

  render() {
    const listView = <LeadsList {...this.props}
      fetchDataFn={this.fetchData.bind(this)}
      data={this.state.data}
    />;
    const mapView = <LeadsMap {...this.props}
      fetchDataFn={this.fetchData.bind(this)}
      passMapRef={this.passMapRef.bind(this)}
      style={styles.mapView}
      data={this.state.data}
      markers={this.state.markers}
    />;
    let view;
    if (this.state.isList) {
      view = listView;
    } else {
      view = mapView;
    }

    return (
      <View style={GlobalStyles.container}>{view}</View>
    );
  }
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  }
});
