import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import ListItem from "./ListItem"
import ListItemSeparator from "./ListItemSeparator"
import {toggleFavorite} from "../AppState"

class ListScreen extends React.Component {
  render() {
    const {dispatch, stations} = this.props;
    const stationsList = stations.data;
    const renderItem = ({item}) => (
      <ListItem
        item={item}
        handlePress={() => dispatch(toggleFavorite({stationId: item.stationId}))}
        isFavorite={stations.favorites.includes(item.stationId)}
      />
    );
    const keyExtractor = item => item.stationId;
    return (
      <FlatList
        data={stationsList}
        extraData={stations.favorites}
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