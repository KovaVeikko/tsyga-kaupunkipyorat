import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  DEFAULT_PRIMARY_COLOR, EMPTY_COLOR, FULL_COLOR, OK_COLOR, TEXT_PRIMARY_COLOR,
  TEXT_SECONDARY_COLOR
} from "../../styles/colors"

const ListItem = ({item, handlePress, isFavorite, distance}) => {
  const getStatusColor = () => {
    if (item.bikesAvailable === 0) {
      return EMPTY_COLOR;
    }
    if (item.spacesAvailable === 0) {
      return FULL_COLOR;
    }
    return OK_COLOR;
  }
  return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableOpacity onPress={handlePress}>
            <Icon name={isFavorite ? 'star' : 'star-o'} size={20} color={DEFAULT_PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>
        <View style={styles.middle}>
          {distance &&
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>{distance.toFixed(1)} km</Text>
          </View>
          }
          <View>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={[styles.statusContainer, {borderRightColor: getStatusColor()}]}>
            <Text style={styles.statusText}>{item.bikesAvailable + '/' + (item.bikesAvailable + item.spacesAvailable)}</Text>
          </View>
        </View>
      </View>
  )
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handlePress: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  distance: PropTypes.number,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 23,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  left: {
    marginRight: 20,
    justifyContent: 'center',
  },
  middle: {
    flex: 1,
    marginRight: 20,
  },
  right: {
    justifyContent: 'center',
  },
  distanceContainer: {
    position: 'absolute',
    top: -15,
  },
  distanceText: {
    color: TEXT_SECONDARY_COLOR,
  },
  nameText: {
    color: TEXT_PRIMARY_COLOR,
    fontSize: 18,
  },
  statusContainer: {
    borderRightWidth: 10,
    paddingRight: 10,
  },
  statusText: {
    color: TEXT_PRIMARY_COLOR,
    fontSize: 18,
  },
});

export default ListItem;