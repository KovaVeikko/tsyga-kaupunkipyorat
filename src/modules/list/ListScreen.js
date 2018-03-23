import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import ListItem from "./ListItem"
import ListItemSeparator from "./ListItemSeparator"
import {toggleFavorite} from "../AppState"

const isFavorite = (favorites, stationId) => favorites.includes(stationId);

const sortByFavorite = (data, favorites) => {
  return data.sort((left, right) => {
    if (isFavorite(favorites, left.stationId) > isFavorite(favorites, right.stationId)) {
      return -1;
    }
    if (isFavorite(favorites, left.stationId) < isFavorite(favorites, right.stationId)) {
      return 1;
    }
    return 0;
  });
}

class ListScreen extends React.PureComponent {
  render() {
    const {dispatch, stations: {data, favorites}} = this.props;
    const sortedStations = sortByFavorite(data, favorites);
    const renderItem = ({item}) => (
      <ListItem
        item={item}
        handlePress={() => dispatch(toggleFavorite({stationId: item.stationId}))}
        isFavorite={isFavorite(favorites, item.stationId)}
      />
    );
    const keyExtractor = item => item.stationId;
    return (
      <FlatList
        data={sortedStations}
        extraData={favorites}
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
}

export default connect(state => ({
  stations: state.app.stations,
}))(ListScreen);