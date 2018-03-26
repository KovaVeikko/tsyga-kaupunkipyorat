import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import GoogleMapsView from 'react-native-maps/lib/components/MapView';
import MarkerCallout from './MarkerCallout';
import {getStationStatus, isFavorite, STATION_EMPTY, STATION_FULL, STATION_OK} from "../../utils/stationUtils"
import {toggleFavorite} from "../AppState"

const EMPTY_PIN = require('../../assets/img/map/rgrey.png');
const OK_PIN = require('../../assets/img/map/rgreen.png');
const FULL_PIN = require('../../assets/img/map/rorange.png');
const EMPTY_PIN_S = require('../../assets/img/map/rgrey_s.png');
const OK_PIN_S = require('../../assets/img/map/rgreen_s.png');
const FULL_PIN_S = require('../../assets/img/map/rorange_s.png');


const MapView = ({stations, coords, toggleFavorite}) => {

  getMapPinImage = (station) => {
    const status = getStationStatus(station);
    const favorite = isFavorite(stations.favorites, station);
    if (favorite) {
      switch (status) {
        case STATION_EMPTY:
          return EMPTY_PIN_S;
        case STATION_OK:
          return OK_PIN_S;
        case STATION_FULL:
          return FULL_PIN_S;
        default:
          return EMPTY_PIN_S;
      }
    } else {
      switch (status) {
        case STATION_EMPTY:
          return EMPTY_PIN;
        case STATION_OK:
          return OK_PIN;
        case STATION_FULL:
          return FULL_PIN;
        default:
          return EMPTY_PIN;
      }
    }
  }

  return (
    <View style={styles.container}>
      <GoogleMapsView
        style={styles.map}
        provider={GoogleMapsView.PROVIDER_GOOGLE}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.045,
        }}
        showsUserLocation={true}
        loadingEnabled={true}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        toolbarEnabled={false}
      >
        {stations.data.map(station => (
          <GoogleMapsView.Marker
            key={station.stationId}
            coordinate={{latitude: station.lat, longitude: station.lon}}
            title={station.name}
            image={getMapPinImage(station)}
          >
            <GoogleMapsView.Callout
              tooltip={true}
              onPress={() => toggleFavorite(station.stationId)}>
              <MarkerCallout station={station}/>
            </GoogleMapsView.Callout>
          </GoogleMapsView.Marker>
        ))}
      </GoogleMapsView>
    </View>
  )
};

MapView.propTypes = {
  stations: PropTypes.object.isRequired,
  coords: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

export default MapView;