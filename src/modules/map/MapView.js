import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Platform} from 'react-native';
import GoogleMapsView from 'react-native-maps/lib/components/MapView';
import MarkerCallout from './MarkerCallout';
import {getStationStatus, isFavorite, STATION_EMPTY, STATION_FULL, STATION_OK} from '../../utils/stationUtils';
import {toggleFavorite} from '../AppState';

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

  const pressCallout = (stationId) => {
    toggleFavorite(stationId);
  }

  return (
    <View style={styles.container}>
      <GoogleMapsView
        ref={node => this.map = node}
        style={styles.map}
        //provider={GoogleMapsView.PROVIDER_GOOGLE} // TODO: initialRegion not working on ios with Google maps
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.0225,
        }}
        showsUserLocation={true}
        loadingEnabled={true}
        showsPointsOfInterest={false}
        showsCompass={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
        toolbarEnabled={false}
        zoomEnabled={true}
        showsScale={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
      >
        {stations.data.map(station => (
          <GoogleMapsView.Marker
            ref={node => this["marker" + station.stationId] = node}
            key={station.stationId}
            coordinate={{latitude: station.lat, longitude: station.lon}}
            title={station.name + " " + station.bikesAvailable + "/" + station.spacesAvailable}
            image={getMapPinImage(station)}
            onCalloutPress={() => pressCallout(station.stationId)}
          >
            {Platform.OS !== 'ios' &&
              <GoogleMapsView.Callout
                tooltip={true}
              >
                <MarkerCallout station={station}/>
              </GoogleMapsView.Callout>
            }
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