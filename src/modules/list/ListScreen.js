import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FlatList, Text} from 'react-native';

const ListScreen = ({stations}) => {
  const stationsList = stations.data;
  const renderItem = ({item}) => (
    <Text>{item.name}</Text>
  );
  const keyExtractor = item => item.stationId;
  return (
    <FlatList
      data={stationsList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  )
};

ListScreen.propTypes = {
  stations: PropTypes.object.isRequired,
}

export default connect(state => ({
  stations: state.app.stations,
}))(ListScreen);