import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {EMPTY_COLOR, OK_COLOR_MARKER, DARK_PRIMARY_COLOR, FULL_COLOR_MARKER} from "../../styles/colors";
import {getStationStatus, STATION_EMPTY, STATION_FULL, STATION_OK} from "../../utils/stationUtils";
import Icon from 'react-native-vector-icons/FontAwesome';

const getBgColor = (station) => {
  const status = getStationStatus(station);
  switch (status) {
    case STATION_EMPTY:
      return EMPTY_COLOR;
    case STATION_OK:
      return OK_COLOR_MARKER;
    case STATION_FULL:
      return FULL_COLOR_MARKER;
    default:
      return EMPTY_COLOR;
  }
};

const MapMarker = ({station, favorite}) => {
  const bikes = station.bikesAvailable;
  const disabled = station.spacesAvailable === 0 && station.bikesAvailable === 0;
  return (
    <View style={styles.container}>
      {favorite &&
        <View style={styles.star}>
          <Icon name={'star'} size={15} color={DARK_PRIMARY_COLOR} />
        </View>
      }
      <View style={[styles.content, {backgroundColor: getBgColor(station)}]}>
        {disabled
          ? <Icon name={'times'} size={15} color={DARK_PRIMARY_COLOR} />
          : <Text style={styles.text}>{bikes}</Text>
        }
      </View>
      <View style={styles.stick}/>
    </View>
  )
};

MapMarker.propTypes = {
  station: PropTypes.object.isRequired,
  favorite: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12.5,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftColor: DARK_PRIMARY_COLOR,
    borderRightColor: DARK_PRIMARY_COLOR,
    borderBottomColor: DARK_PRIMARY_COLOR,
    borderTopColor: DARK_PRIMARY_COLOR,
  },
  text: {
    color: DARK_PRIMARY_COLOR,
    fontWeight: "600",
  },
  stick: {
    height: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRightColor: DARK_PRIMARY_COLOR,
    borderLeftColor: DARK_PRIMARY_COLOR,
    width: 0,
  },
  star: {
    marginBottom: -7.5,
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 10,
  }
});

export default MapMarker;
