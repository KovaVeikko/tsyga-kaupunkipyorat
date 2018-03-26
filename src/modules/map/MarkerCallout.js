import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {LIGHT_PRIMARY_COLOR} from "../../styles/colors"

const MarkerCallout = ({station}) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.nameContainer}>
          <Text>{station.name}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text>{station.bikesAvailable}/{station.spacesAvailable + station.bikesAvailable}</Text>
        </View>
      </View>
      <View style={styles.arrowContainer}>
        <View style={styles.arrow}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  body: {
    backgroundColor: LIGHT_PRIMARY_COLOR,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    alignItems: 'center',
  },
  statusContainer: {
    alignItems: 'center',
  },
  arrowContainer: {
    alignItems: 'center',
  },
  arrow: {
    borderTopColor: LIGHT_PRIMARY_COLOR,
    borderRightColor: 'transparent',
    borderBottomColor: LIGHT_PRIMARY_COLOR,
    borderLeftColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 20,
    borderRightWidth: 13,
    borderBottomWidth: 0,
    borderLeftWidth: 13,
  },
});

MarkerCallout.propTypes = {
  station: PropTypes.object.isRequired,
}

export default MarkerCallout;