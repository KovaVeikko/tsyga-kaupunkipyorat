import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatList, View} from 'react-native';
import ListItem from "./ListItem"
import ListItemSeparator from './ListItemSeparator';
import ListErrorMessage from './ListErrorMessage';
import ScrollUpButton from './ScrollUpButton';
import {toggleFavorite} from '../AppState';
import {sortStationsByDistance, isFavorite, getStationDistance, sortStationsByName} from '../../utils/stationUtils';


const sortStations = (coords, stationsList, favorites, orderByName) => {
  let favoriteStations = [];
  let otherStations = stationsList;
  if (orderByName) {
    favoriteStations = sortStationsByName(stationsList.filter(s => isFavorite(favorites, s)));
    otherStations = sortStationsByName(stationsList.filter(s => !isFavorite(favorites, s)));
  } else {
    favoriteStations = sortStationsByDistance(coords, stationsList.filter(s => isFavorite(favorites, s)));
    otherStations = sortStationsByDistance(coords, stationsList.filter(s => !isFavorite(favorites, s)));
  }
  return [...favoriteStations, ...otherStations];
}

class ListScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadedStations: 20,
      showScrollButton: false,
    }
  }

  loadMore = () => {
    if (this.state.loadedStations < this.props.stations.data.length) {
      this.setState({loadedStations: this.state.loadedStations + 20})
    }
  }

  scrollUp = () => {
    this.list.scrollToIndex({index: 0});
  }

  handleScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y > 500 && !this.state.showScrollButton) {
      this.setState({showScrollButton: true});
    } else if (y <= 500 && this.state.showScrollButton) {
      this.setState({showScrollButton: false});
    }
  }

  render() {
    const {
      dispatch,
      stations: {
        data,
        favorites,
        error: stationsError,
        sorted: orderByName,
      },
      location: {
        position,
        error: locationError,
      }
    } = this.props;
    const sortedStations = sortStations(position.coords, data, favorites, orderByName);
    const visibleStations = sortedStations.slice(0, this.state.loadedStations);
    const renderItem = ({item}) => (
      <ListItem
        item={item}
        handlePress={() => dispatch(toggleFavorite({stationId: item.stationId}))}
        isFavorite={isFavorite(favorites, item)}
        distance={locationError ? undefined : getStationDistance(position.coords, item)}
      />
    );
    const keyExtractor = item => item.stationId;
    return (
      <View>
        {stationsError && <ListErrorMessage/>}
        <FlatList
          ref={node => this.list = node}
          onScroll={this.handleScroll}
          data={visibleStations}
          extraData={[favorites]}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ListItemSeparator}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.05}
        />
        {this.state.showScrollButton &&
        <ScrollUpButton onPress={this.scrollUp}/>
        }
      </View>
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