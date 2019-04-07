import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {DIVIDER_COLOR, LIGHT_PRIMARY_COLOR, TEXT_PRIMARY_COLOR} from "../../styles/colors"

const MarkerCallout = ({station}) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.nameContainer}>
          <Text style={styles.text}>{station.name}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.text}>{station.bikesAvailable}/{station.spacesAvailable + station.bikesAvailable}</Text>
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
    width: 160,
  },
  body: {
    backgroundColor: LIGHT_PRIMARY_COLOR,
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: DIVIDER_COLOR,
    borderRightColor: DIVIDER_COLOR,
    borderLeftColor: DIVIDER_COLOR,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    elevation: 3,
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
  text: {
    fontSize: 18,
    color: TEXT_PRIMARY_COLOR,
    textAlign: 'center',
  },
});

MarkerCallout.propTypes = {
  station: PropTypes.object.isRequired,
}

export default MarkerCallout;
