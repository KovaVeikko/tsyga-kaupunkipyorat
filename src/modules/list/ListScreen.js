import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import ListItem from "./ListItem"
import ListItemSeparator from "./ListItemSeparator"
import {toggleFavorite} from "../AppState"
import {sortStationsByDistance, isFavorite, getStationDistance} from "../../utils/stationUtils";

const sortdStations = (coords, stationsList, favorites) => {
  const favoriteStations = sortStationsByDistance(coords, stationsList.filter(s => isFavorite(favorites, s)));
  const otherStations = sortStationsByDistance(coords, stationsList.filter(s => !isFavorite(favorites, s)));
  return [...favoriteStations, ...otherStations];
}

class ListScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadedStations: 20,
    }
  }

  loadMore = () => {
    if (this.state.loadedStations < this.props.stations.data.length) {
      this.setState({loadedStations: this.state.loadedStations + 20})
    }
  }

  render() {
    const {dispatch, stations: {data, favorites}, location: {position}} = this.props;
    const sortedStations = sortdStations(position.coords, data, favorites);
    const visibleStations = sortedStations.slice(0, this.state.loadedStations);
    const renderItem = ({item}) => (
      <ListItem
        item={item}
        handlePress={() => dispatch(toggleFavorite({stationId: item.stationId}))}
        isFavorite={isFavorite(favorites, item)}
        distance={getStationDistance(position.coords, item)}
      />
    );
    const keyExtractor = item => item.stationId;
    return (
      <FlatList
        data={visibleStations}
        extraData={[favorites]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ListItemSeparator}
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.05}
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