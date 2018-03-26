import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MapView from './MapView';
import {toggleFavorite} from '../AppState';

const MapScreen = ({dispatch, stations, location}) => {
  return (
    <MapView
      stations={stations}
      coords={location.position.coords}
      toggleFavorite={(stationId) => dispatch(toggleFavorite({stationId}))}
    />
  )
};

MapScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stations: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(state => ({
  stations: state.app.stations,
  location: state.app.location,
}))(MapScreen);