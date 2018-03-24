import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import ListItem from "./ListItem"
import ListItemSeparator from "./ListItemSeparator"
import {toggleFavorite} from "../AppState"
import {getDistanceFromLatLonInKm} from "../../utils/locationUtils";

const isFavorite = (favorites, station) => favorites.includes(station.stationId);

const getDistance = (coords, station) => {
  return getDistanceFromLatLonInKm(coords.latitude, coords.longitude, station.lat, station.lon);
}

const sortByDistance = (coords, stationsList) => {
  return stationsList.sort((left, right) => {
    return getDistance(coords, left) > getDistance(coords, right) ? 1 : -1;
  });
}

const sortedStations = (coords, stationsList, favorites) => {
  const favoriteStations = sortByDistance(coords, stationsList.filter(s => isFavorite(favorites, s)));
  const otherStations = sortByDistance(coords, stationsList.filter(s => !isFavorite(favorites, s)));
  return [...favoriteStations, ...otherStations];
}

class ListScreen extends React.PureComponent {
  render() {
    const {dispatch, stations: {data, favorites}, location: {position}} = this.props;
    const sorted = sortedStations(position.coords, data, favorites);
    const renderItem = ({item}) => (
      <ListItem
        item={item}
        handlePress={() => dispatch(toggleFavorite({stationId: item.stationId}))}
        isFavorite={isFavorite(favorites, item)}
        distance={getDistance(position.coords, item)}
      />
    );
    const keyExtractor = item => item.stationId;
    return (
      <FlatList
        data={sorted}
        extraData={[favorites]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ListItemSeparator}
      />
    )
  }
}

ListScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  stations: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default connect(state => ({
  stations: state.app.stations,
  location: state.app.location,
}))(ListScreen);